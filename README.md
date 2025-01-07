
# Desafio WEB 360 - Proyecto APP-REACT

Clave de aspirante GDA0046-OT Raúl Orozco


# Mi Tiendita Online

Un sistema web para la gestión y compra de productos para la empresa **Mi Tiendita Online**. Este sistema permite a los clientes registrar sus pedidos y a los operadores gestionar productos, pedidos y usuarios.

## Características

### Cliente:
- Registro mediante correo electrónico.
- Visualización del catálogo de productos con precios.
- Gestión del carrito de compras:
  - Agregar, modificar o eliminar productos.
  - Confirmar pedidos con datos de entrega.
- Historial de pedidos con estado.
- Cancelación de pedidos no confirmados por el operador.

### Operador:
- Gestión de productos:
  - Agregar, editar, inactivar y gestionar stock.
- Gestión de clientes:
  - Alta, edición e inactivación de clientes.
- Gestión de usuarios:
  - Crear o inactivar usuarios (clientes y operadores).
- Gestión de pedidos:
  - Visualizar pedidos confirmados y marcar como entregados.
- Gestión de categorías:
  - Agregar, editar e inactivar categorías y productos asociados.

---

## Requisitos
- npm o pnpm

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/raulangas/GDA0046-OT-APP-STORE.git
   cd tienda-app-project

   git clone https://github.com/raulangas/GDA0046-OT-API-REST.git
   cd tienda-api-project

   Base de datos de la API
   cd tienda-api-project/db/GDA0046-OT-RaulOrozco.sql

   
2. Instala las dependencias:
    ```bash
    npm install
    pnpm install
    ```
3. Configura las variables de entorno:
    Utiliza el archivo `.env` como ejemplo

## Scripts

- Iniciar el servidor en modo producción:
    ```bash
    npm start
    pnpm start
    ```

- Iniciar el servidor en modo desarrollo:
    ```bash
    npm dev
    pnpm dev
    ```

## Datos de Prueba

1. Usuario Cliente: cliente@test.com  123456
2. Usuario Operador operador@test.com  123456

