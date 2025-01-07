import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth.js"
import LoadingDialog from "../../components/LoadingDialog.jsx"


export const ProtectedRoute = ({ allowedRoles, children }) => {

    //Obteniendo el usuario autenticado
    const { user, isAuthenticated, loading } = useAuth()

    //Si no se ha cargado el usuario, mostrar un mensaje de carga
    if (loading) {
        return <LoadingDialog open={loading} />
    }

    //Si no hay usuario autenticado, redirigir a la página de inicio de sesión
    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />
    }


    //Si el usuario autenticado no tiene el rol permitido, redirigir a la página de acceso denegado
    if (allowedRoles && !allowedRoles.includes(user.rol)) {
        return <Navigate to="/forbidden" replace />
    }


    return children || <Outlet />

}