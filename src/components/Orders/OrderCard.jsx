import { Card, CardContent, CardHeader, Chip, Divider, Grid2, Typography } from "@mui/material";

const OrderCard = ({ order }) => {
    return (
        <Card elevation={3}>
            <CardHeader
                title={`Orden #${order.id}`}
                subheader={`Fecha de Entrega: ${order.fecha_entrega}`}
            />
            <Divider />
            <CardContent sx={{ py: 2 }}>
                <Grid2 container spacing={2}>
                    <Grid2  xs={12} sm={6}>
                        <Typography variant="subtitle1">
                            <strong>Nombre Completo:</strong>
                        </Typography>
                        <Typography variant="body2">{order.nombre_completo}</Typography>
                    </Grid2>
                    <Grid2  xs={12} sm={6}>
                        <Typography variant="subtitle1">
                            <strong>Dirección:</strong>
                        </Typography>
                        <Typography variant="body2">{order.direccion}</Typography>
                    </Grid2>
                    <Grid2  xs={12} sm={6}>
                        <Typography variant="subtitle1">
                            <strong>Teléfono:</strong>
                        </Typography>
                        <Typography variant="body2">{order.telefono}</Typography>
                    </Grid2>
                    <Grid2  xs={12} sm={6}>
                        <Typography variant="subtitle1">
                            <strong>Email:</strong>
                        </Typography>
                        <Typography variant="body2">{order.email}</Typography>
                    </Grid2>
                    <Grid2  xs={12} sm={6}>
                        <Typography variant="subtitle1">
                            <strong>Total de la Orden:</strong>
                        </Typography>
                        <Typography variant="body2">
                            Q {order.total_orden.toFixed(2)}
                        </Typography>
                    </Grid2>
                    <Grid2  xs={12} sm={6}>
                        <Typography variant="subtitle1">
                            <strong>Estado:</strong>
                        </Typography>
                        <Chip
                            label={order.estado_nombre ? order.estado_nombre : "Pendiente"}
                            color="default"
                            size="small"
                        />
                    </Grid2>
                </Grid2>
            </CardContent>
        </Card>
    );
};

export default OrderCard;