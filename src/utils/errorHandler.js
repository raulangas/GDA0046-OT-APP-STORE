export const handleError = (error) => {
    if (error && error.status) {
        switch (error.status) {
            case 401:
                return 'Sin autorización: Por favor inicie sesión.';
            case 403:
                return 'Prohibido: No tiene permiso para acceder a este recurso.';
            case 404:
                return 'No encontrado: El recurso solicitado no existe.';
            default:
                return 'Error desconocido. Por favor intente de nuevo.';
        }
    }
    return 'Error de conexión. Por favor verifique su conexión de red.';
};
