import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home.tsx';
import Favorite from './pages/Favorite/Favorite.tsx';
import Watchlist from './pages/Watchlist/Watchlist.tsx';
import DetailMovie from './pages/DetailMovie/DetailMovie.tsx';
import Search from './pages/Search/Search.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/watchlist',
    element: <Watchlist />,
  },
  {
    path: '/favorite',
    element: <Favorite />,
  },
  {
    path: '/movie/:movieId',
    element: <DetailMovie />,
  },
  {
    path: '/search',
    element: <Search />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
