import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from '../components/App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
