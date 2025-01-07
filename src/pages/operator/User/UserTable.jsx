import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Chip } from "@mui/material"
import { Paper } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import AdminIcon from '@mui/icons-material/AdminPanelSettings';
import MoodIcon from '@mui/icons-material/Mood';


import ROL from "../../../constants/appRoles.js";
import { SupportAgent } from "@mui/icons-material";


const UserTable = ({ users, onEdit }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Rol</TableCell>
                        <TableCell>Correo</TableCell>
                        <TableCell>Nombre Completo</TableCell>
                        <TableCell>Telefono</TableCell>
                        <TableCell>Fecha de Nacimiento</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                {(() => {
                                    switch (user.rol) {
                                        case ROL.ADMIN:
                                            return <Chip label={user.rol_name} color="primary" size="medium" icon={<AdminIcon />} />;
                                        case ROL.OPERADOR:
                                            return <Chip label={user.rol_name} size="medium" icon={<SupportAgent />} />;
                                        case ROL.CLIENTE:
                                            return <Chip label={user.rol_name} color="success" size="medium" icon={<MoodIcon />} />;
                                        default:
                                            return <Chip label={user.rol_name} color="default" size="medium" />;
                                    }
                                })()}


                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.nombre_completo}</TableCell>
                            <TableCell>{user.telefono}</TableCell>
                            <TableCell>{user.fecha_nacimiento}</TableCell>
                            <TableCell>
                                <Chip
                                    label={user.activo ? "Activo" : "Inactivo"}
                                    color={user.activo ? "success" : "default"}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={() => onEdit(user)}>
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default UserTable