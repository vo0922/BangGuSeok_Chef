import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import SocialCallback from './components/authentication/login/SocialCallback';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/home',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/home/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'recipe', element: <Blog /> },
        { path: 'rank', element: <User /> },
        { path: 'qna', element: <Products />,
      }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login />},
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/home" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> },
    { path:'/auth/callback', element: <SocialCallback />}
  ]);
}
