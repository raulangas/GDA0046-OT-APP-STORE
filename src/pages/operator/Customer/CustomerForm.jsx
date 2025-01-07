
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';

import { createCustomer, updateCustomer } from "../../../api/apiService";
import { useNotification } from "../../../hooks/useNotification";



const defaultValues = {
    razon_social: '',
    nombre_comercial: '',
    direccion_entrega: '',
    telefono: '',
    email: ''
};


const CustomerForm = ({ open, customer, onClose }) => {
    const { showNotification } = useNotification();


    const onSubmit = async (formData) => {
        try {
            if (customer) {
                await updateCustomer(customer.id, formData);
                showNotification('Cliente actualizado exitosamente');
            } else {
                await createCustomer(formData);
                showNotification('Cliente creado exitosamente');
            }
            onClose(true);
        } catch (error) {
            const operation = customer ? 'actualizar' : 'crear';
            console.error(`Error al ${operation} Cliente:`, error);
            showNotification(
                `Error al ${operation} Cliente`,
                'error'
            );
        }
    };

    return (
        <Dialog open={open} maxWidth="sm" fullWidth>
            <DialogTitle>
                {customer ? 'Editar Cliente' : 'Nuevo Cliente'}
            </DialogTitle>
            <FormContainer
                defaultValues={customer || defaultValues}
                onSuccess={onSubmit}
            >
                <DialogContent>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextFieldElement
                            name="razon_social"
                            label="Razón Social"
                            fullWidth
                            validation={{
                                required: 'Este campo es requerido'
                            }}
                        />
                        <TextFieldElement
                            name="nombre_comercial"
                            label="Nombre Comercial"
                            fullWidth
                        />
                        <TextFieldElement
                            name="direccion_entrega"
                            label="Dirección de Entrega"
                            fullWidth
                        />
                        <TextFieldElement
                            name="telefono"
                            label="Teléfono"
                            fullWidth
                            validation={{
                                required: 'Este campo es requerido'
                            }}
                        />
                        <TextFieldElement
                            name="email"
                            label="Email"
                            type="email"
                            fullWidth
                            validation={{
                                required: 'Este campo es requerido',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: 'Email inválido'
                                }
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onClose(false)}>Cancelar</Button>
                    <Button type="submit" variant="contained">
                        {customer ? 'Actualizar' : 'Crear'}
                    </Button>
                </DialogActions>
            </FormContainer>
        </Dialog>
    );
};


export default CustomerForm;