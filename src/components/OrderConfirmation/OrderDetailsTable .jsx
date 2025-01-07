import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import OrderRow from "./OrderRow";

export const OrderDetailsTable = ({ orders }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Orden #</TableCell>
                        <TableCell>Fecha Creación</TableCell>
                        <TableCell>Fecha Entrega</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell>Estado</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <OrderRow key={order.id} order={order} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};