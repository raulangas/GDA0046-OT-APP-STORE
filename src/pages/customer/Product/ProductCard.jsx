import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { useCart } from '../../../hooks/useCart';


const ProductCard = ({ product }) => {
    const { addItem } = useCart();
    const { nombre, marca, precio, imagen, stock } = product;

    const handleAddToCart = () => {
        addItem(product);
    };

    return (
        <Card sx={{
            width: '100%',
            height: 450,
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s',
            '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: 3
            }
        }}>
            <Box sx={{
                width: '100%',
                height: 250, // Altura fija para el contenedor de la imagen
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                padding: 2,
                flexShrink: 0 // Evita que la imagen se encoja
            }}>
                <CardMedia
                    component="img"
                    image={`data:image/webp;base64,${imagen}`}
                    alt={nombre}
                    sx={{
                        width: 200,
                        height: 200,
                        objectFit: 'contain',
                    }}
                />
            </Box>
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 2,
                flexGrow: 1,
                '&:last-child': { pb: 2 }
            }}>
                <Box sx={{
                    height: 50,
                    mb: 1,
                    flexShrink: 0
                }}>
                    <Typography
                        variant="div"
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {nombre}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {marca}
                    </Typography>
                </Box>

                <Box sx={{
                    mt: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    flexShrink: 0 // Evita que la sección inferior se encoja
                }}>
                    <Typography
                        variant="h6"
                        color="primary"
                        sx={{
                            fontSize: '1.1rem'
                        }}
                    >
                        Q {precio.toFixed(2)}
                    </Typography>
                    <Typography
                        variant="body2"
                        color={stock > 0 ? 'success.main' : 'error.main'}
                    >
                        {stock > 0 ? 'En Stock' : 'Agotado'}
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddShoppingCart />}
                        fullWidth
                        disabled={stock === 0}
                        onClick={handleAddToCart}
                        sx={{
                            textTransform: 'none',
                            fontSize: '0.9rem'
                        }}
                    >
                        Agregar al carrito
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCard;