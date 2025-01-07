
import api from "./api.js";
import { AUTH, ORDERS, USERS } from "./endpoints.js";
import { CATEGORIES, PRODUCTS, CUSTOMERS } from "./endpoints.js";

// Authenticación
export const login = (userData) => api.post(AUTH.LOGIN, { email: userData.email, password: userData.password });


//Categories
export const fetchCategories = () => api.get(CATEGORIES.FETCH);
export const createCategory = (category) => api.post(CATEGORIES.CREATE, category);
export const updateCategory = (id, category) => api.put(`${CATEGORIES.UPDATE}/${id}`, category);

//Products
export const fetchProducts = () => api.get(PRODUCTS.FETCH);
export const createProduct = (product) => api.post(PRODUCTS.CREATE, product,
    { headers: { 'Content-Type': 'multipart/form-data' } }
);

export const updateProduct = (id, product) => api.put(`${PRODUCTS.UPDATE}/${id}`, product,
    { headers: { 'Content-Type': 'multipart/form-data' } }
);

//Customers
export const fetchCustomers = () => api.get(CUSTOMERS.FETCH);
export const fetchCustomer = (id) => api.get(`${CUSTOMERS.FETCH}/${id}`);
export const createCustomer = (customer) => api.post(CUSTOMERS.CREATE, customer);
export const updateCustomer = (id, customer) => api.put(`${CUSTOMERS.UPDATE}/${id}`, customer);


//Users
export const fetchUsers = () => api.get(USERS.FETCH);
export const createUser = (user) => api.post(USERS.CREATE, user);
export const updateUser = (id, user) => api.put(`${USERS.UPDATE}/${id}`, user);

//Ordenes
//enviar en el body el id del usuario en json
export const fetchPendingOrders = () => api.get(ORDERS.FETCH, { params: { estado: 0 } });
export const fetchUserOrders = (id) => api.get(ORDERS.FETCH, { params: { usuario: id } });
export const createOrder = (order) => api.post(ORDERS.CREATE, order);
export const updateOrder = (id, order) => api.put(`${ORDERS.UPDATE}/${id}`, order);

export const processOrder = (id, estado) => api.put(`${ORDERS.PROCESS}/${id}`, { estado });
