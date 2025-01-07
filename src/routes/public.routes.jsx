import { AuthLayout } from '../components/Layout/Auth/AuthLayout';
import { Login } from '../pages/auth/Login';
import { NotFound } from '../pages/NotFound';
import { PublicRoute } from './route/PublicRoute';

export const publicRoutes = [
    {
        path: '/auth',
        element: (
            <PublicRoute>
                <AuthLayout />
            </PublicRoute>
        ),
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: '*',
                element: <NotFound />
            }
        ]
    },
];