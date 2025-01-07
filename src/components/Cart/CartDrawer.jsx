import { Box, Button, Drawer, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CartItem from './CartItem';
import { useCart } from '../../hooks/useCart';

const CartDrawer = ({ open, onClose }) => {
  const {
    items,
    total,
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart
  } = useCart();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 400 },
          px: 2,
        },
      }}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 2,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}>
          <Typography variant="h6">
            Carrito ({items.length} {items.length === 1 ? 'producto' : 'productos'})
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {items.length === 0 ? (
          <Box sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Tu carrito está vacío
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Agrega productos para comenzar tu compra
              </Typography>
            </Box>
          </Box>
        ) : (
          <>
            <Box sx={{
              flexGrow: 1,
              overflowY: 'auto',
              py: 2
            }}>
              {items.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onAdd={addItem}
                  onRemove={removeItem}
                  onUpdateQuantity={updateItemQuantity}
                />
              ))}
            </Box>

            <Box sx={{
              py: 2,
              borderTop: '1px solid',
              borderColor: 'divider'
            }}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 2
              }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">
                  Q {total.toFixed(2)}
                </Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                LinkComponent={Button}
                href="/customer/confirmation"
                sx={{ mb: 1 }}
                onClick={() => {
                  // Aquí iría la lógica para proceder al checkout
                  console.log('Procesar Orden');
                }}
              >
                Procesar Orden
              </Button>

              <Button
                variant="outlined"
                fullWidth
                onClick={clearCart}
                color="error"
              >
                Vaciar carrito
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;