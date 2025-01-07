import { Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material";

export const OrderSummary = ({ items, total }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Resumen de la Orden
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Producto</TableCell>
                            <TableCell>Código</TableCell>
                            <TableCell align="right">Cantidad</TableCell>
                            <TableCell align="right">Precio</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={`product-${item.producto}`}>
                                <TableCell>{item.nombre}</TableCell>
                                <TableCell>{item.codigo}</TableCell>
                                <TableCell align="right">{item.cantidad}</TableCell>
                                <TableCell align="right">
                                    Q {item.precio.toFixed(2)}
                                </TableCell>
                                <TableCell align="right">
                                    Q {(item.precio * item.cantidad).toFixed(2)}
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={4} align="right">
                                <Typography variant="subtitle1"><strong>Total</strong></Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle1">
                                    <strong>Q {total.toFixed(2)}</strong>
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};