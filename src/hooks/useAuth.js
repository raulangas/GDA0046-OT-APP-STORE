import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

//Custome hook para obtener el contexto de autenticación
export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth debe estar dentro del proveedor AuthProvider")
    }


    return {
        ...context,
        isAuthenticated: !!context.user
    }

}