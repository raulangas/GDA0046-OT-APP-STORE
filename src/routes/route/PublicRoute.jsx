import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import ROL from "../../constants/appRoles"
import LoadingDialog from "../../components/LoadingDialog"

export const PublicRoute = ({ children }) => {
    //Obteniendo el usuario autenticado
    const { user, loading } = useAuth()

    console.log("PublicRoute")

    //Si no se ha cargado el usuario, mostrar un mensaje de carga
    if (loading) {
        return <LoadingDialog open={loading} />
    }

    //Si hay un usuario autenticado, redirigir a la página de inicio
    if (user) {
        switch (user.rol) {
            case ROL.OPERADOR:
                return <Navigate to="/operator" replace />
            case ROL.CLIENTE:
                return <Navigate to="/customer" replace />
            default:
                return <Navigate to="/notfound" replace />
        }
    }

    //Si no hay usuario autenticado, mostrar el contenido de la ruta
    return children || <Outlet />
}