
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

import ROL from '../constants/appRoles.js'


export const HomeRoleBase = () => {
    const { user } = useAuth()

    switch (user.rol) {
        case ROL.OPERADOR:
            return <Navigate to="/operator" replace />
        case ROL.CLIENTE:
            return <Navigate to="/customer" replace />
        default:
            return <Navigate to="/notfound" replace />
    }
}
