import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useNotification } from "../../../hooks/useNotification";
import { fetchPendingOrders, processOrder } from "../../../api/apiService";
import { formatDate } from "../../../utils/dateUtils";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { OrderTable } from "../../../components/Orders/OrderTable";
import LoadingDialog from "../../../components/LoadingDialog";
import ORDER_STATUS from "../../../constants/orderStatus";

export const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const { showNotification } = useNotification();

    const loadUserOrders = async () => {
        try {
            setLoading(true);
            const response = await fetchPendingOrders();
            const { data, success, message } = response.data;

            if (!success) {
                throw new Error(message);
            }

            const formattedOrders = data.map((order) => ({
                ...order,
                fecha_entrega: formatDate(order.fecha_entrega),
            }));

            setOrders(formattedOrders);
        } catch (error) {
            console.error("Error al cargar las órdenes:", error);
            showNotification("Error al cargar las órdenes del usuario", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUserOrders();
    }, []);




    const handleProcessOrder = async (order, order_process, onClose) => {
        try {
            // Llama a la API para procesar la orden
            const response = await processOrder(order.id, order_process);
            const { data, success, message } = response.data;


            if (!success) {
                throw new Error(message);
            }

            console.log("Enviando orden:", order.id);
            //cerrar OrderTable
            onClose();
            //recargar OrderTable
            loadUserOrders();
            showNotification("Orden procesada exitosamente", "success");
        } catch (error) {
            console.error("Error al procesar la orden:", error);
            showNotification("Error al procesar la orden", "error");
        }

    };


    const actions = [
        { label: "Enviar", color: "success", order_process: ORDER_STATUS.ENVIADO, onClick: handleProcessOrder },
        { label: "Rechazar", color: "error", order_process: ORDER_STATUS.RECHAZADO, onClick: handleProcessOrder },
    ];


    if (loading) {
        return <LoadingDialog open={loading} />;
    }

    if (orders.length === 0) {
        return (
            <Box sx={{ textAlign: "center", mt: 4 }}>
                <Typography variant="h6">No hay ordenes pendientes</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 1200, mx: "auto", py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Órdenes Pendientes
            </Typography>
            <OrderTable orders={orders} actions={actions} />
        </Box>
    );
};
