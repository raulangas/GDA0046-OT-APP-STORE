import { useState, useEffect } from "react";
import { Box, Button, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit'

import { fetchProducts, createProduct, updateProduct } from "../../../api/apiService.js";
import { useNotification } from "../../../hooks/useNotification.js";
import { useAuth } from "../../../hooks/useAuth.js";
import ProductForm from "./ProductForm.jsx";
import LoadingDialog from "../../../components/LoadingDialog.jsx";


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const { showNotification } = useNotification();
    const { user } = useAuth()


    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const response = await fetchProducts();
            const { data, success, message } = response.data;
            if (!success) {
                throw new Error(message);
            }
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error('Error cargando productos:', error);
            showNotification('Error al cargar los productos', 'error');
        }
    };


    const handleCreate = () => {
        setSelectedProduct(null);
        setOpenForm(true);
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setOpenForm(true);
    };

    const handleFormClose = () => {
        setOpenForm(false);
        setSelectedProduct(null);
    };


    const handleFormSubmit = async (formData) => {
        try {
            if (selectedProduct) {
                console.log(selectedProduct.id, formData)
                await updateProduct(selectedProduct.id, formData);
                showNotification('Producto actualizado exitosamente');

            } else {

                if (!user.id) {
                    console.error('El usuario no tiene un ID válido');
                    showNotification('Error: Usuario no encontrado', 'error');
                    return;
                }

                formData.append('usuario', user.id);

                for (let pair of formData.entries()) {
                    console.log(pair[0] + ': ' + pair[1]);
                }

                await createProduct(formData);
                showNotification('Producto creado exitosamente');
            }
            loadProducts();
            handleFormClose();
        } catch (error) {
            console.error('Error saving product:', error);
            showNotification(
                `Error al ${selectedProduct ? 'actualizar' : 'crear'} el producto`,
                'error'
            );
        }
    };

    return (
        loading ?
            <LoadingDialog open={loading} />
            :
            <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                    <Typography variant="h4">Productos</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleCreate}
                    >
                        Nuevo Producto
                    </Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Código</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Marca</TableCell>
                                <TableCell>Categoría</TableCell>
                                <TableCell>Stock</TableCell>
                                <TableCell>Precio</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Imagen</TableCell>
                                <TableCell align="right">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.codigo}</TableCell>
                                    <TableCell>{product.nombre}</TableCell>
                                    <TableCell>{product.marca}</TableCell>
                                    <TableCell>{product.categoria}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>{product.precio}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={product.activo ? "Activo" : "Inactivo"}
                                            color={product.activo ? "success" : "default"}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {product.imagen ? (
                                            <img
                                                src={`data:image/jpeg;base64,${product.imagen}`}
                                                alt={product.nombre}
                                                style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                                            />
                                        ) : (
                                            <Typography variant="body2" color="textSecondary">
                                                Sin imagen
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => handleEdit(product)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <ProductForm
                    open={openForm}
                    product={selectedProduct}
                    onClose={handleFormClose}
                    onSubmit={handleFormSubmit}
                />
            </Box>
    )

}

export default ProductList;