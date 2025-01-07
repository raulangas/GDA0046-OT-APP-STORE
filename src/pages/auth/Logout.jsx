import { useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"

export const Logout = () => {
    const { handleLogout } = useAuth()

    useEffect(() => {
        handleLogout()
        console.log("Logout!")
    }, [])



    return (
        <div> cerrando sesion...  </div>
    )
}