import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, CircularProgress, Typography, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { FormContainer, TextFieldElement, CheckboxElement } from 'react-hook-form-mui';
import { useNotification } from '../../../hooks/useNotification';
import { fetchCategories } from '../../../api/apiService';
import { SelectElement } from 'react-hook-form-mui';

const defaultValues = {
    categoria: '',
    nombre: '',
    marca: '',
    codigo: '',
    stock: '',
    precio: '',
    activo: true,
    imagen: null
};

const ProductForm = ({ open, product, onClose, onSubmit }) => {

    const [categories, setCategories] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const { showNotification } = useNotification();



    const loadCategories = async () => {
        try {
            const response = await fetchCategories();
            const { data, success, message } = response.data;
            if (!success) {
                throw new Error(message);
            }

            setCategories(data);

        } catch (error) {
            console.error('Error loading categories:', error);
            showNotification('Error al cargar las categorías', 'error');
        }
    };

    // Cargar las categorías al montar el componente
    useEffect(() => {
        loadCategories();
    }, []);

    // Limpiar la imagen seleccionada cuando se cierra el formulario
    useEffect(() => {
        if (!open) {
            setSelectedImage(null);
        }
    }, [open]);


    // Manejar el cambio de la imagen seleccionada
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                showNotification('La imagen no debe superar los 5MB', 'error');
                event.target.value = '';
                return;
            }
            setSelectedImage(file);
        }
    };

    // Limpiar la imagen seleccionada
    const clearImage = () => {
        setSelectedImage(null);
    };

    // Enviar el formulario
    const handleSubmit = async (formData) => {
        try {
            const submitData = new FormData();

            // Agregar todos los campos del formulario al FormData
            Object.keys(formData).forEach(key => {
                //si imagen es el campo, no lo agregamos al FormData
                if (key === 'imagen') {
                    return;
                }
                submitData.append(key, formData[key]);
            });

            // Agregar la imagen si existe
            if (selectedImage) {
                submitData.append('imagen', selectedImage);
            }


            // Inspeccionar el FormData (para depuración)
            for (let pair of submitData.entries()) {
                if (pair[1] instanceof File) {
                    console.log(`${pair[0]}: ${pair[1].name}, Tipo: ${pair[1].type}, Tamaño: ${pair[1].size}`);
                } else {
                    console.log(`${pair[0]}: ${pair[1]}`);
                }
            }

            // Llamar al onSubmit con el FormData
            await onSubmit(submitData);
        } catch (error) {
            console.error('Error submitting form:', error);
            showNotification('Error al enviar el formulario', 'error');
        }
    };


    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {product ? 'Editar Producto' : 'Nuevo Producto'}
            </DialogTitle>
            <FormContainer
                onSuccess={handleSubmit}
                defaultValues={product || defaultValues}
            >
                <DialogContent>
                    <SelectElement
                        name="categoria"
                        label="Categoría"
                        required
                        fullWidth
                        validation={{
                            required: 'Debe seleccionar una categoría'
                        }}
                        options={categories.map(category => ({
                            id: category.id,
                            label: category.nombre
                        }))}
                    />
                    <TextFieldElement
                        name="nombre"
                        label="Nombre"
                        required
                        validation={{
                            required: 'El nombre es requerido'
                        }}
                        fullWidth
                        margin='normal'
                    />
                    <TextFieldElement
                        name="marca"
                        label="Marca"
                        required
                        validation={{
                            required: 'La marca es requerida'
                        }}
                        fullWidth
                        margin="normal"
                    />
                    <TextFieldElement
                        name="codigo"
                        label="Código"
                        required
                        validation={{
                            required: 'El código es requerido'
                        }}
                        fullWidth
                        margin="normal"
                    />
                    <TextFieldElement
                        name="stock"
                        label="Stock"
                        type="number"
                        required
                        validation={{
                            required: 'El stock es requerido',
                            min: {
                                value: 0,
                                message: 'El stock no puede ser negativo'
                            }
                        }}
                        fullWidth
                        margin="normal"
                    />
                    <TextFieldElement
                        name="precio"
                        label="Precio"
                        type="number"
                        required
                        validation={{
                            required: 'El precio es requerido',
                            min: {
                                value: 0,
                                message: 'El precio no puede ser negativo'
                            }
                        }}
                        fullWidth
                        margin="normal"
                    />
                    <Box mt={2}>
                        <CheckboxElement
                            name="activo"
                            label="Activo"
                        />
                    </Box>

                    <Box mt={2}>
                        <Typography variant="subtitle1" gutterBottom>
                            Imagen del producto
                        </Typography>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Button
                                variant="outlined"
                                component="label"
                            >
                                Seleccionar Imagen
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleImageChange}
                                />
                            </Button>
                            {selectedImage && (
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Typography variant="body2" color="textSecondary">
                                        {selectedImage.name}
                                    </Typography>
                                    <IconButton size="small" onClick={clearImage}>
                                        <ClearIcon />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                        {selectedImage && (
                            <Box mt={2}>
                                <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Preview"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '200px',
                                        objectFit: 'contain'
                                    }}
                                />
                            </Box>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button type="submit" variant="contained" color="primary">
                        {product ? 'Actualizar' : 'Crear'}
                    </Button>
                </DialogActions>
            </FormContainer>
        </Dialog>
    );
};

export default ProductForm;