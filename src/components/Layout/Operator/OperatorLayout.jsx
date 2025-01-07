import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

import { AppBar, CssBaseline, Toolbar, Typography } from '@mui/material';
import SideBar from './SideBar/SideBar';
import { APP_NAME } from '../../../config/app';
import { useAuth } from '../../../hooks/useAuth.js';

const OperatorLayout = () => {
  const { user } = useAuth();

  const drawerWidth = 240;

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h5" noWrap component="div" >{APP_NAME}</Typography>
            {user?.email && (
              <Typography variant="body1" noWrap component="div">
                {user.email}
              </Typography>
            )}
          </Toolbar>
        </AppBar>
        <SideBar drawerWidth={drawerWidth} />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet />
        </Box>

      </Box>
    </>
  );
}

export default OperatorLayout;