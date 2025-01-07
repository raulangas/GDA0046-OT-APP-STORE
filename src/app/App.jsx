
import './App.css'

import { AuthProvider } from '../context/AuthContext'
import AppTheme from '../theme/AppTheme'
import { RouterProvider } from 'react-router-dom';
import { router } from '../routes/index';
import { NotificationProvider } from '../context/NotificationContext';
import ApiInterceptor from '../components/ApiInterceptor';
import { CartProvider } from '../context/CartContext';

function App() {

  return (
    <AppTheme>
      <NotificationProvider>
        <AuthProvider>
          <CartProvider >
            <RouterProvider router={router} >
            </RouterProvider>
          </CartProvider>
        </AuthProvider>
      </NotificationProvider>
    </AppTheme >
  )
}

export default App
