import { useLocation, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import { MENU_ITEMS } from './config';

const SideBar = ({ drawerWidth = 240 }) => {
  const location = useLocation();

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
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'background.default',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <MenuItems items={MENU_ITEMS.OPERATOR} />
        </List>
        <Divider />
        <List>
          <MenuItems items={MENU_ITEMS.COMMON} />
        </List>
      </Box>
    </Drawer>
  );
};

export default SideBar;