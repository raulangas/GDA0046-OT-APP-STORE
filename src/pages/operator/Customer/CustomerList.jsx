import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useNotification } from "../../../hooks/useNotification";
import { fetchCustomers } from "../../../api/apiService";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CustomerForm from "./CustomerForm";
import LoadingDialog from "../../../components/LoadingDialog";


const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [loading, setLoading] = useState(true);


    const { showNotification } = useNotification();

    // Cargar los clientes
    const loadCustomers = async () => {
        try {
            const response = await fetchCustomers();
            const { data, success, message } = response.data;
            if (!success) {
                throw new Error(message);
            }
            setCustomers(data);
            setLoading(false);
        } catch (error) {
            console.error('Error cargando clientes:', error);
            showNotification('Error al cargar los clientes', 'error');
        }
    }

    // Cargar los clientes al montar el componente
    useEffect(() => {
        loadCustomers();
    }, []);


    const handleAdd = () => {
        setSelectedCustomer(null);
        setOpenForm(true);
    };

    const handleEdit = (customer) => {
        setSelectedCustomer(customer);
        setOpenForm(true);
    };

    const handleFormClose = (refresh = false) => {
        setOpenForm(false);
        setSelectedCustomer(null);
        if (refresh) {
            loadCustomers();
        }
    }



    return (
        //verificar si esta cargando
        loading ?
            //si esta cargando mostrar spinner
            <LoadingDialog open={loading} />
            :
            //renderizar la tabla
            <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                    <Typography variant="h4">Clientes</Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleAdd}
                    >
                        Nuevo Cliente
                    </Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Razón Social</TableCell>
                                <TableCell>Nombre Comercial</TableCell>
                                <TableCell>Dirección Entrega</TableCell>
                                <TableCell>Teléfono</TableCell>
                                <TableCell>Email Contacto</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No hay clientes registrados
                                    </TableCell>
                                </TableRow>
                            ) : (
                                customers.map((customer) => (
                                    <TableRow key={customer.id}>
                                        <TableCell>{customer.razon_social}</TableCell>
                                        <TableCell>{customer.nombre_comercial}</TableCell>
                                        <TableCell>{customer.direccion_entrega}</TableCell>
                                        <TableCell>{customer.telefono}</TableCell>
                                        <TableCell>{customer.email}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleEdit(customer)} color="primary">
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <CustomerForm
                    open={openForm}
                    customer={selectedCustomer}
                    onClose={handleFormClose}
                />
            </Box>



    )
}

export default CustomerList;