import { HomeMaxOutlined } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';

export const MENU_ITEMS = {
    CUSTOMERS: [
        {
            id: 'home',
            name: 'Home',
            icon: HomeMaxOutlined,
            path: '/customer',
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
}