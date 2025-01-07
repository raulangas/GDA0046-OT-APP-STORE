import { Button, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { OrderDetailsDialog } from "./OrderDetailsDialog";

export const OrderTable = ({ orders, actions = [] }) => {
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleOpen = (order) => {
        const parsedDetails = JSON.parse(order.detalle_json);
        setSelectedOrder({ ...order, items: parsedDetails });

        //setSelectedOrder(order);
        setOpen(true);
    }

    const handleClose = () => {
        setSelectedOrder(null);
        setOpen(false);
    }


    return (

        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre Completo</TableCell>
                            <TableCell>Dirección</TableCell>
                            <TableCell>Teléfono</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Fecha de Entrega</TableCell>
                            <TableCell>Total Orden</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={`orden-${order.id}`}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.nombre_completo}</TableCell>
                                <TableCell>{order.direccion}</TableCell>
                                <TableCell>{order.telefono}</TableCell>
                                <TableCell>{order.email}</TableCell>
                                <TableCell>{order.fecha_entrega}</TableCell>
                                <TableCell>Q {order.total_orden.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={order.estado_nombre ? order.estado_nombre : 'Pendiente'}
                                        color="default"
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleOpen(order)}
                                    >
                                        Ver Detalles
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <OrderDetailsDialog open={open} order={selectedOrder} onClose={handleClose} actions={actions} />
        </>


    )
};