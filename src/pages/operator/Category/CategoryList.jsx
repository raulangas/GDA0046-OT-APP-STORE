import { useState, useEffect } from "react";
import { Box, Button, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { fetchCategories, createCategory, updateCategory } from "../../../api/apiService";
import CategoryForm from "./CategoryForm";
import { useAuth } from "../../../hooks/useAuth";
import { useNotification } from "../../../hooks/useNotification";
import LoadingDialog from "../../../components/LoadingDialog";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    const { showNotification } = useNotification();
    const { user } = useAuth()

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {

        try {
            const response = await fetchCategories();
            const { data, success, message } = response.data;
            if (!success) {
                throw new Error(message);
            }
            setCategories(data);
            setLoading(false);
        }
        catch (error) {
            console.error('Error al intentar cargar las categorias', error);
        }
    }


    const handleCreate = () => {
        setSelectedCategory(null);
        setOpenForm(true);
    };

    const handleEdit = (category) => {
        setSelectedCategory(category);
        setOpenForm(true);
    };

    const handleFormClose = () => {
        setOpenForm(false);
        setSelectedCategory(null);
    };

    const handleFormSubmit = async (formData) => {

        try {
            if (selectedCategory) {

                await updateCategory(selectedCategory.id, formData);
                showNotification('Categoría actualizada exitosamente');

            } else {
                const data = { ...formData, usuario: user.id }
                await createCategory(data);
                showNotification('Categoría creada exitosamente');

            }
            loadCategories();
            handleFormClose();
        } catch (error) {
            const operation = selectedCategory ? 'actualizar' : 'crear';
            console.error(`Error al ${operation} categoria:`, error);
            showNotification(
                `Error al ${operation} categoría`,
                'error'
            );
        }



        console.log('Form Submit', formData);
        setOpenForm(false);
        setSelectedCategory(null);
        await loadCategories();
    }





    return (
        loading ?
            <LoadingDialog open={loading} />
            :
            <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                    <Typography variant="h4">Categorías</Typography>
                    <Button variant="contained" color="primary"
                        startIcon={<AddIcon />} onClick={handleCreate}
                    >Nueva Categoría</Button>

                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead >
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell >Activo</TableCell>
                                <TableCell align="right">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell>{category.nombre}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={category.activo ? 'Activo' : 'Inactivo'}
                                            color={category.activo ? 'success' : 'default'}
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button variant="contained" color="primary" onClick={() => handleEdit(category)} startIcon={<EditIcon />}>
                                            Editar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <CategoryForm
                    open={openForm}
                    category={selectedCategory}
                    onClose={handleFormClose}
                    onSubmit={handleFormSubmit}
                />
            </Box>
    )

}

export default CategoryList