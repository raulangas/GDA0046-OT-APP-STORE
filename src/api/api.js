import axios from "axios"
import { BASE_API_URL } from '../config/app.js'

if (!BASE_API_URL) {
    throw new Error("API URL no esta definida")
}

//Creación de instancia de axios
const api = axios.create({
    baseURL: BASE_API_URL,
})

// Interceptor para solicitudes, agrega token si está presente en localStorage
api.interceptors.request.use(
    (req) => {
        const token = localStorage.getItem('token')
        if (token) {
            req.headers.Authorization = `Bearer ${token}`
        }
        return req
    },
    (error) => {
        return Promise.reject(error)
    }
)


// Interceptor para respuestas,manejo global de errores
api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        //verificar si la respuesta tiene campo data,
        //si es así, es un error de validación
        if (error.response?.data) {
            console.error('API Error:', error.response.data);
            return Promise.reject(error.response.data)
        }


        //si no, es un error de servidor
        console.error('API Error:', error.message);
        return Promise.reject(error.message);

    }
);


export default api