import StorefrontIcon from '@mui/icons-material/Storefront';
import CategoryIcon from '@mui/icons-material/Category';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';

export const MENU_ITEMS = {
    OPERATOR: [
        {
            id: 'dashboard',
            name: 'Dashboard',
            icon: DashboardIcon,
            path: '/operator',
        },
        {
            id: 'orders',
            name: 'Ordenes',
            icon: ListAltIcon,
            path: '/operator/orders',
        },
        {
            id: 'categories',
            name: 'Categorías',
            icon: CategoryIcon,
            path: '/operator/categories',
        },
        {
            id: 'products',
            name: 'Productos',
            icon: StorefrontIcon,
            path: '/operator/products',
        },
        {
            id: 'customers',
            name: 'Clientes',
            icon: PermContactCalendarIcon,
            path: '/operator/customers',
        },
        {
            id: 'users',
            name: 'Usuarios',
            icon: PermIdentityIcon,
            path: '/operator/users',
        },
    ],
    COMMON: [
        {
            id: 'logout',
            name: 'Cerrar sesión',
            icon: LogoutIcon,
            path: '/logout',
        },
    ],
};