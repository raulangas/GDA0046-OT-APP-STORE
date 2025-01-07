
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { APP_NAME } from '../../../../config/app';
import { Button, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { MENU_ITEMS } from './config';


export default function SearchAppBar() {
    const isActiveRoute = (path) => {
        return location.pathname === path;
      };

    const MenuItems = ({ items }) => {
        return items.map((item) => {
            const Icon = item.icon;
            return (
                <ListItem key={item.id} disablePadding>
                    <ListItemButton
                        component={Link}
                        to={item.path}
                        selected={isActiveRoute(item.path)}
                        sx={{
                            '&.Mui-selected': {
                                backgroundColor: 'primary.light',
                                '&:hover': {
                                    backgroundColor: 'primary.light',
                                },
                            },
                        }}
                    >
                        <ListItemIcon>
                            <Icon color={isActiveRoute(item.path) ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText
                            primary={item.name}
                            color={isActiveRoute(item.path) ? 'primary' : 'inherit'}
                        />
                    </ListItemButton>
                </ListItem>
            );
        });
    };


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        {APP_NAME}
                    </Typography>
                    <List>
                        <MenuItems items={MENU_ITEMS.CUSTOMERS} />
                        <Divider />
                        <MenuItems items={MENU_ITEMS.COMMON} />
                    </List>

                </Toolbar>
            </AppBar>
        </Box>
    );
}





export const NavBar = ({ navItems }) => {

    return (
        <nav className="nav-bar">
            <ul className="nav-bar__list">
                {navItems.map((item, index) => (
                    <li key={index} className="nav-bar__item">
                        <NavLink
                            to={item.path}
                            exact={item.exact}
                            className="nav-bar__link"
                            activeClassName="nav-bar__link--active"
                        >
                            {item.icon}
                            <span className="nav-bar__text">{item.text}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
