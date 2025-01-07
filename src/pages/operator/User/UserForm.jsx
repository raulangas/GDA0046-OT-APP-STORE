import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, InputLabel } from "@mui/material";
import { FormContainer, TextFieldElement, SelectElement, SwitchElement, useWatch } from "react-hook-form-mui";
import ROL from "../../../constants/appRoles.js";
import { useNotification } from "../../../hooks/useNotification.js";
import { fetchCustomers } from "../../../api/apiService.js";
import { createUser, updateUser } from "../../../api/apiService.js";

const defaultValues = {
    rol: "",
    email: "",
    nombre_completo: "",
    password: "",
    telefono: "",
    fecha_nacimiento: "",
    activo: true,
    cliente: null,
};

const UserForm = ({ open, user, onClose }) => {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showNotification } = useNotification();


    const loadCustomers = async () => {
        setLoading(true);
        try {
            const response = await fetchCustomers();
            const { data, success, message } = response.data;
            if (!success) {
                throw new Error(message);
            }
            setCustomers(data);
        } catch (error) {
            console.error("Error cargando clientes:", error);
            showNotification("Error al cargar los clientes", "error");
        }
        setLoading(false);
    }


    // Cargar los clientes al montar el componente
    useEffect(() => {
        loadCustomers();
    }, []);

    const onSubmit = async (formData) => {
        try {
            formData.activo = formData.activo ? 1 : 0;
            
            if (user) {
                console.log("formData", formData);
                await updateUser(user.id, formData);
                showNotification("Usuario actualizado exitosamente");
            } else {
                console.log("formData", formData);
                await createUser(formData);
                showNotification("Usuario creado exitosamente");
            }
            onClose(true);
        } catch (error) {
            const operation = user ? "actualizar" : "crear";
            console.error(`Error al ${operation} Usuario:`, error);
            showNotification(
                `Error al ${operation} Usuario`,
                "error"
            );
        }
    };

    return (
        <Dialog open={open} onClose={() => onClose(false)} fullWidth maxWidth="sm">
            <DialogTitle>
                {user ? 'Editar Usuario' : 'Nuevo Usuario'}
            </DialogTitle>
            <FormContainer
                defaultValues={user || defaultValues}
                onSuccess={onSubmit}
            >
                <DialogContent>
                    <Box display="flex" flexDirection="column" gap={2} mt={2}>
                        <SelectElement
                            name="rol"
                            label="Rol"
                            options={[
                                { id: ROL.OPERADOR, label: 'Operador' },
                                { id: ROL.CLIENTE, label: 'Cliente' },
                            ]}
                            disabled={!!user}
                            required={!user}
                        />

                        <TextFieldElement
                            name="email"
                            label="Correo Electrónico"
                            type="email"
                            required
                            validation={{
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Correo electrónico no válido',
                                },
                            }}
                        />

                        {!user && (
                            <TextFieldElement
                                name="password"
                                label="Contraseña"
                                type="password"
                                required
                                validation={{
                                    minLength: {
                                        value: 6,
                                        message: 'La contraseña debe tener al menos 6 caracteres',
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: 'La contraseña debe tener como máximo 20 caracteres',
                                    },
                                }}
                            />
                        )}

                        <TextFieldElement
                            name="nombre_completo"
                            label="Nombre Completo"
                            validation={{
                                maxLength: {
                                    value: 100,
                                    message: 'El nombre completo debe tener como máximo 100 caracteres',
                                },
                            }}
                            required
                        />

                        <TextFieldElement
                            name="telefono"
                            label="Teléfono"
                            type="text"
                            validation={{
                                maxLength: {
                                    value: 8,
                                    message: 'El teléfono debe tener como máximo 8 caracteres',
                                },
                            }}

                            required
                            fullWidth
                        />

                        <TextFieldElement
                            name="fecha_nacimiento"
                            label="Fecha de Nacimiento"
                            type="date"
                            required
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />

                        <WatchedClientSelect
                            customers={customers}
                            isLoading={loading}
                        />

                        <SwitchElement
                            name="activo"
                            label="Activo"
                            labelPlacement="end"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onClose(false)} color="secondary">
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        {user ? 'Actualizar' : 'Crear'}
                    </Button>
                </DialogActions>
            </FormContainer>
        </Dialog>
    );
};


const WatchedClientSelect = ({ customers, isLoading }) => {
    const selectedRol = useWatch({ name: 'rol' });

    if (selectedRol !== ROL.CLIENTE) {
        return null;
    }

    return (
        <SelectElement
            name="cliente"
            label="Cliente"
            options={customers?.map((customer) => ({
                id: customer.id,
                label: customer.razon_social,
            })) || []}
            required
            disabled={isLoading}
        />
    );
};
export default UserForm;


