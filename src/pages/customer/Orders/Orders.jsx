import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useNotification } from "../../../hooks/useNotification";
import { fetchUserOrders } from "../../../api/apiService";
import { formatDate } from "../../../utils/dateUtils";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { OrderTable } from "../../../components/Orders/OrderTable";
import LoadingDialog from "../../../components/LoadingDialog";

export const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const { showNotification } = useNotification();

    const loadUserOrders = async () => {
        try {
            setLoading(true);
            const response = await fetchUserOrders(user.id);
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



    if (loading) {
        return <LoadingDialog open={loading} />;
    }

    if (orders.length === 0) {
        return (
            <Box sx={{ textAlign: "center", mt: 4 }}>
                <Typography variant="h6">No tienes órdenes registradas.</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 1200, mx: "auto", py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Mis Órdenes
            </Typography>
            <OrderTable orders={orders} />
        </Box>
    );
};
