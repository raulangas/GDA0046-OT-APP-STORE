import { AppBar, Box, Toolbar, Typography, IconButton, Badge, Container, CssBaseline, Drawer } from '@mui/material';
import { ShoppingCart as CartIcon, Person as PersonIcon } from '@mui/icons-material';
import { Link, Outlet } from 'react-router-dom';
import { APP_NAME } from '../../../config/app';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from '../../../hooks/useCart';
import CartDrawer from '../../Cart/CartDrawer';
import { useAuth } from '../../../hooks/useAuth.js';

const CustomerLayout = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { total, cantidad } = useCart();
    const { user } = useAuth();

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (

        <Box sx={{ flexGrow: 1 }}>
            <CssBaseline />
            <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
                <Container>

                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography variant="h5" component="div">
                                {APP_NAME}
                            </Typography>
                        </Link>


                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <IconButton color="inherit">
                                <PersonIcon />
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                    {user?.email}
                                </Typography>
                            </IconButton>

                            <Link to="/customer/orders" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <IconButton color="inherit">
                                    <Typography variant="body2">
                                        Mis Ordenes
                                    </Typography>
                                </IconButton>
                            </Link>

                            <IconButton color="inherit" onClick={toggleCart}>
                                <Badge badgeContent={cantidad} color="error">
                                    <CartIcon />
                                </Badge>
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                    {total.toFixed(2)}
                                </Typography>
                            </IconButton>

                            <Link to="/logout" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <IconButton color="inherit">
                                    <Typography variant="body2">
                                        Cerrar Sesión
                                    </Typography>
                                </IconButton>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <CartDrawer open={isCartOpen} onClose={toggleCart} />
            <Container>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Outlet />
                </Box>
            </Container>
        </Box>
    );
};

export default CustomerLayout;