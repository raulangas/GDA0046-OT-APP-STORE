import { Forbidden } from '../pages/Forbidden';
import { NotFound } from '../pages/NotFound';

export const errorRoutes = [
  {
    path: '/forbidden',
    element: <Forbidden />
  },
  {
    path: '*',
    element: <NotFound />
  }
];