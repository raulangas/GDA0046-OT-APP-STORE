import { Box, IconButton, Typography } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';


const CartItem = ({ item, onAdd, onRemove, onUpdateQuantity }) => {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            py: 2,
            borderBottom: '1px solid',
            borderColor: 'divider'
        }}>
            <Box sx={{
                width: 60,
                height: 60,
                mr: 2,
                '& img': {
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                }
            }}>
                <img src={`data:image/webp;base64,${item.imagen}`} alt={item.nombre} />
            </Box>

            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1" noWrap>{item.nombre}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {item.marca} - {item.codigo}
                </Typography>
                <Typography variant="body2" color="primary">
                    Q {(item.precio * item.cantidad).toFixed(2)}
                </Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
            }}>
                <IconButton
                    size="small"
                    onClick={() => onRemove(item)}
                    disabled={item.cantidad <= 1}
                >
                    <RemoveIcon />
                </IconButton>
                <Typography>{item.cantidad}</Typography>
                <IconButton
                    size="small"
                    onClick={() => onAdd(item)}
                    disabled={item.cantidad >= item.stock}
                >
                    <AddIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default CartItem;