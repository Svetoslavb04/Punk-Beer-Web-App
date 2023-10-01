import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from '../components/App';

import { withConnectedWallet } from '../hoc/withConnectedWallet';

import Index from './Index';
import Favourites from './Favourites';

const IndexWithConnectedWallet = withConnectedWallet(Index);
const FavouritesWithConnectedWallet = withConnectedWallet(Favourites);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <IndexWithConnectedWallet /> },
      { path: 'favourites', element: <FavouritesWithConnectedWallet /> },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
