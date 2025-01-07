import OperatorLayout from '../components/Layout/Operator/OperatorLayout';
import CustomerLayout from '../components/Layout/Customer/CustomerLayout';
import ROL from '../constants/appRoles';

import { ProtectedRoute } from './route/ProtectedRoute';
import { HomeRoleBase } from '../pages/HomeRoleBase';
import { Logout } from '../pages/auth/Logout';
import { Products } from '../pages/customer/Product/Products';
import { Confirmation } from '../pages/customer/Order/Confirmation';
import { Orders } from '../pages/customer/Orders/Orders';
import { HomeCustomer } from '../pages/customer/HomeCustomer';

import { Home as HomeOperator } from '../pages/operator/Home';
import { Orders as OrdersOperator } from '../pages/operator/Orders/Orders';



import CategoryList from '../pages/operator/Category/CategoryList';
import ProductList from '../pages/operator/Product/ProductList';
import CustomerList from '../pages/operator/Customer/CustomerList';
import UserList from '../pages/operator/User/UserList';
import ApiInterceptor from '../components/ApiInterceptor';

export const privateRoutes = [
    {
        path: '/',
        element: <ProtectedRoute allowedRoles={[ROL.CLIENTE, ROL.OPERADOR]} />,
        children: [
            {
                index: true,
                element: <HomeRoleBase />
            },
            {
                path: 'logout',
                element: <Logout />
            }
        ]
    },
    {
        path: '/customer',
        element: (
            <ProtectedRoute allowedRoles={[ROL.CLIENTE]}>
                <ApiInterceptor >
                    <CustomerLayout />
                </ApiInterceptor>
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Products />
            },
            {
                path: 'home',
                element: <Products />
            },
            {
                path: 'confirmation',
                element: <Confirmation />
            },
            {
                path: 'orders',
                element: <Orders />
            },
            {
                path: 'account',
                element: <HomeCustomer />
            }
        ]
    },
    {
        path: '/operator',
        element: (
            <ProtectedRoute allowedRoles={[ROL.OPERADOR]}>
                <ApiInterceptor >
                    <OperatorLayout />
                </ApiInterceptor>
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                // element: <HomeOperator />
                element: <OrdersOperator />
            },
            {
                path: 'orders',
                element: <OrdersOperator />
            },
            {
                path: 'categories',
                element: <CategoryList />
            },
            {
                path: 'products',
                element: <ProductList />
            },
            {
                path: 'customers',
                element: <CustomerList />
            },
            {
                path: 'users',
                element: <UserList />
            }
        ]
    }
];
