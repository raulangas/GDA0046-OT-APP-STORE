import { useState } from "react";
import { useNotification } from "../../../hooks/useNotification";
import { fetchUsers } from "../../../api/apiService";
import { useEffect } from "react";
import LoadingDialog from "../../../components/LoadingDialog";
import { Box, Button, Typography } from "@mui/material";
import UserTable from "./UserTable";
import AddIcon from '@mui/icons-material/Add';
import UserForm from "./UserForm";

const UserList = () => {

    const [users, setUsers] = useState([])
    const [openForm, setOpenForm] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const { showNotification } = useNotification();


    //Cargar los Usuarios

    const loadUsers = async () => {
        try {
            const response = await fetchUsers();
            const { data, success, message } = response.data

            if (!success) {
                throw new Error(message);
            }

            setUsers(data)
            setLoading(false)
        }
        catch (error) {
            console.log('Error cargando usuarios:', error);
            showNotification('Error al cargar los usuarios', 'error')
        }
    }


    //carga de usuarios al montar el componente
    useEffect(() => {
        loadUsers();
    }, []);


    const handleAdd = () => {
        setSelectedUser(null);
        setOpenForm(true);
    }

    const handleEdit = (user) => {
        setSelectedUser(user);
        setOpenForm(true);
    }

    const handleFormClose = (refresh = false) => {
        setOpenForm(false);
        setSelectedUser(null);
        if (refresh) {
            loadUsers();
        }
    }


    return (
        loading ?
            <LoadingDialog open={loading} />
            :

            <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                    <Typography variant="h4">Usuarios</Typography>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}
                    >
                        Nuevo Usuario
                    </Button>
                </Box>
                <UserTable users={users} onEdit={handleEdit} />
                <UserForm open={openForm} user={selectedUser} onClose={handleFormClose} />
            </Box>
    )


}
export default UserList;