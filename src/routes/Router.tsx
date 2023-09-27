import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from '../components/App';

import Index from './Index';
import Favourites from './Favourites';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Index /> },
      { path: 'favourites', element: <Favourites /> },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
