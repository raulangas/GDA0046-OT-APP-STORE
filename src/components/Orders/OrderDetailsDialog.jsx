import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import OrderCard from "./OrderCard";
import { OrderSummary } from "../OrderConfirmation/OrderSummary";

export const OrderDetailsDialog = ({ open, order, onClose, actions = [] }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogContent sx={{ pb: 4, gap: 4, display: "flex", flexDirection: "column" }}>
                {order && (
                    <>
                        <OrderCard order={order} />
                        <OrderSummary items={order.items} total={order.total_orden} />
                    </>
                )}
            </DialogContent>
            <DialogActions sx={{ pr: 4 }}>
                {actions.map((action, index) => (
                    <Button
                        key={`action-${index}`}
                        onClick={() => action.onClick(order, action.order_process, onClose)}
                        color={action.color || "default"}
                        variant="contained"
                    >
                        {action.label}
                    </Button>
                ))}
                <Button onClick={onClose} color="primary">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};