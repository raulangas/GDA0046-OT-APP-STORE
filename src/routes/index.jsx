import { createBrowserRouter } from 'react-router-dom';
import { privateRoutes } from './private.routes';
import { publicRoutes } from './public.routes';
import { errorRoutes } from './error.routes';

export const router = createBrowserRouter([
  ...publicRoutes,
  ...privateRoutes,
  ...errorRoutes
]);