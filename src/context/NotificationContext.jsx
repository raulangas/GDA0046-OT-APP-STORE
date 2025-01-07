import { Alert, Snackbar } from "@mui/material";
import { useCallback } from "react";
import { useState } from "react";
import { createContext } from "react";

//Creando el contexto para el manejo de las notificaciones
export const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {

    //estado de la notificación
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success',
        duration: 6000
    });

    //función para mostrar notificaciones
    const showNotification = useCallback((message, severity = 'success', duration = 6000) => {
        setNotification({
            open: true,
            message,
            severity,
            duration
        });
    }, []);

    //función para ocultar notificaciones
    const hideNotification = useCallback(() => {
        setNotification(prev => ({
            ...prev,
            open: false
        }));
    }, []);

    return (
        <NotificationContext.Provider value={{ showNotification, hideNotification }}>
            {children}
            <Snackbar
                open={notification.open}
                autoHideDuration={notification.duration}
                onClose={hideNotification}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={hideNotification}
                    severity={notification.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    )
}
