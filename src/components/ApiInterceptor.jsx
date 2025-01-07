import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../hooks/useNotification';
import { useAuth } from '../hooks/useAuth';
import api from '../api/api';

// Interceptor para manejar respuestas de la API
const ApiInterceptor = ({ children }) => {

    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const { handleLogout } = useAuth();

    useEffect(() => {
        // Interceptor para respuestas
        const responseInterceptor = api.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                // Manejar error 401 (Unauthorized)
                if (error.response?.status === 401) {
                    const isTokenExpired = error.response.data?.message?.includes('expirado');
                    const isNotAuthenticated = error.response.data?.message?.includes('No autenticado');

                    if (isTokenExpired || isNotAuthenticated) {
                        // Limpiar datos de autenticación
                        handleLogout();

                        const message = isTokenExpired ?
                            'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.'
                            :
                            'No autenticado';
                        // Mostrar mensaje al usuario
                        showNotification(message, 'error');

                        // Redireccionar al login
                        navigate('/auth/login', { replace: true });

                        return Promise.reject(error);
                    }
                }

                // Mostrar mensaje de error
                const message = error.response?.data?.message || 'Error en la solicitud';
                showNotification(message, 'error');

                return Promise.reject(error);
            }
        );

        // Cleanup: remover interceptor cuando el componente se desmonte
        return () => {
            api.interceptors.response.eject(responseInterceptor);
        };
    }, [navigate, showNotification, handleLogout]);

    return children
        ;
};

export default ApiInterceptor;