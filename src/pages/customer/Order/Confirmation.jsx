import { useAuth } from "../../../hooks/useAuth";
import { useCart } from "../../../hooks/useCart";
import { useNotification } from "../../../hooks/useNotification";
import { fetchCustomer } from "../../../api/apiService";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Grid2, Typography } from "@mui/material";
import { CustomerInfoCard } from "../../../components/OrderConfirmation/CustomerInfoCard";
import { OrderSummary } from "../../../components/OrderConfirmation/OrderSummary";
import { TextFieldElement } from "react-hook-form-mui";
import { FormContainer } from "react-hook-form-mui";
import { createOrder } from "../../../api/apiService";

const defaultValues = {
    nombre_completo: '',
    direccion: '',
    telefono: '',
    email: '',
    fecha_entrega: '',
};

export const Confirmation = () => {
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deliveryDate, setDeliveryDate] = useState(null);
    const { items, total, clearCart } = useCart();
    const { user } = useAuth();

    const { showNotification } = useNotification();
    const navigate = useNavigate();

    const loadCustomerInfo = async () => {
        try {
            const response = await fetchCustomer(user.cliente);
            const { data, success, message } = response.data;

            if (!success) {
                throw new Error(message);
            }

            setCustomer(data);
            setLoading(false);

            defaultValues.nombre_completo = user.nombre_completo;
            defaultValues.telefono = user.telefono;
            defaultValues.email = user.email;
            defaultValues.direccion = data.direccion_entrega;

        } catch (error) {
            console.log('Error cargando la información del cliente:', error);
            showNotification('Error al cargar la información del cliente', 'error');
        }
    }

    useEffect(() => {
        loadCustomerInfo();
    }, [])


    const handleCancelOrder = () => {
        // Lógica para cancelar la orden
        console.log('Orden cancelada');
        clearCart();
        //redirigir a la página de inicio
        navigate('/');
    }


    const validateDeliveryDate = (date) => {
        const today = new Date();
        const selectedDate = new Date(date);

        if (selectedDate < today) {
            showNotification("La fecha de entrega debe ser desde hoy en adelante.", "error");
            setDeliveryDate(null); // Reset the value if invalid
        } else {
            setDeliveryDate(date);
        }
    };


    const onSubmit = async (data) => {
        try {
            const orderData = {
                ...data,
                usuario: user.id,
                json_detalle_orden: JSON.stringify(items.map(item => ({
                    producto: item.id,
                    cantidad: item.cantidad,
                    precio: item.precio,
                    subtotal: item.cantidad * item.precio
                }))),
            }
            console.log('Datos del formulario:', data);
            console.log('Datos de la orden:', orderData);

            await createOrder(orderData);
            showNotification('Orden creada exitosamente', 'success');
            clearCart();
            navigate('/customer/orders');
        } catch (error) {
            console.log('Error al crear la orden:', error);
            showNotification('Error al crear la orden', 'error');

        }

    }

    if (loading) {
        return <p>Cargando...</p>
    }
    return (

        <Box sx={{ maxWidth: 1200, mx: 'auto', py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Confirmación de Pedido
            </Typography>

            <Grid2 container spacing={3}>
                <Grid2 xs={12} md={6}>
                    <CustomerInfoCard customer={customer} />
                </Grid2>

                <Grid2 xs={12} md={6}>
                    <FormContainer

                        defaultValues={defaultValues}

                        onSuccess={(data) => {
                            onSubmit(data)
                        }}
                    >
                        <Box display="flex" flexDirection="column" gap={2}>
                            <TextFieldElement
                                name="nombre_completo"
                                label="Nombre Completo"
                                required
                                fullWidth

                            />
                            <TextFieldElement
                                name="direccion"
                                label="Dirección"
                                required
                                fullWidth
                            />
                            <TextFieldElement
                                name="telefono"
                                label="Teléfono"
                                type="tel"
                                required
                                fullWidth
                            />
                            <TextFieldElement
                                name="email"
                                label="Correo Electrónico"
                                type="email"
                                required
                                fullWidth
                            />
                            <TextFieldElement
                                name="fecha_entrega"
                                label="Fecha de Entrega"
                                type="date"
                                required
                                onChange={(e) => validateDeliveryDate(e.target.value)}
                                fullWidth
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />
                        </Box>
                        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                            <Button
                                variant="contained"
                                type="submit"
                                disabled={!deliveryDate || loading}
                            >
                                Confirmar Orden
                            </Button>
                            <Button
                                component={Link}
                                to="/customer"
                                variant="outlined"
                            >
                                Continuar Comprando
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={handleCancelOrder}
                            >
                                Cancelar
                            </Button>

                        </Box>
                        <Grid2 xs={12}>
                            <OrderSummary items={items} total={total} />
                        </Grid2>
                    </FormContainer>
                </Grid2>



            </Grid2>


        </Box>

    )
}