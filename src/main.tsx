import React from 'react';
import ReactDOM from 'react-dom/client';

import Router from './pages/Router.tsx';

import './style/style.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
);
