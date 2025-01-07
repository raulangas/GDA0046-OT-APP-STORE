import React from "react"
import { useState, useEffect, createContext } from "react"
import { login } from '../api/apiService.js'

//Creando el contexto para el manejo de la autenticación
export const AuthContext = createContext(null)

//Definiendo el proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    //carga de usuario desde localStorage
    const loadUser = () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                //actualizar el estado global del usuario
                setUser(user);
            }
        } catch (e) {
            //si hay un error al parsear el usuario, eliminarlo del localStorage
            console.error("Error parsing user from localStorage", e);
            localStorage.removeItem("user");
        }
    }


    //intenta cargar el usuario al montar el componente
    useEffect(() => {
        //cargar el usuario desde localStorage si ya ha iniciado sesión
        loadUser()
        setLoading(false)
    }, [])


    const handleLogin = async (userData) => {
        setLoading(true)
        setError(null)

        try {

            const response = await login(userData)

            const { data, success, message } = response.data;
            const { token, user } = data;

            console.log(response.data)
            console.log(token, user, success, message)


            //verificar el estado de la respuesta
            if (!success) {
                throw new Error(message)
            }

            if (user.activo !== 1) {
                throw new Error("El usuario no está activo")
            }

            console.log("Loged user")
            console.log(user)

            setUser(user)
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem("token", token)

        }
        catch (error) {
            setError(error)
            console.log("Error en login")
            console.log(error)
        } finally {
            console.log("Finally")
            setLoading(false)
        }


    }

    const handleLogout = () => {

        //Eliminar el usuario del localStorage y estado global
        setUser(null)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
    }

    return (
        <AuthContext.Provider value={{ user, loading, error, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}


