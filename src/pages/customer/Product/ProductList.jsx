import { Container, Typography, Box, Grid2 } from '@mui/material';
import ProductCard from './ProductCard';
import LoadingDialog from '../../../components/LoadingDialog';

const ProductList = ({ products, loading }) => {
    if (loading) {
        return (
            <LoadingDialog open={loading} />
        );
    }

    if (!products.length) {
        return (
            <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h5">
                    No hay productos disponibles
                </Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="xl">
            <Grid2 container spacing={3} sx={{ py: 4 }}>
                {products.map((product) => (
                    <Grid2
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={product.id}
                    >
                        <ProductCard product={product} />
                    </Grid2>
                ))}
            </Grid2>
        </Container>
    );
};

export default ProductList;