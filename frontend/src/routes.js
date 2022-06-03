import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Products from './pages/Products';
import Blog from './pages/Blog';
import ChefRanking from './pages/ChefRanking';
import NotFound from './pages/Page404';
import SocialCallback from './components/authentication/login/SocialCallback';
import BlogSearch from './pages/BlogSearch';
import NewPost from './pages/NewPost';
import RecipeDetail from './pages/RecipeDetail';
import PostModify from './pages/PostModify';
import MyInformation from './pages/MyInformation';
import UserInformation from './pages/UserInformation';
import ChefRankingSearch from './pages/ChefRankingSearch';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/home',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/home/app" replace /> },
        { path: 'app', element: <Home /> },
        { path: 'recipe', element: <Navigate to="/home/recipe/전체" replace/>},
        { path: 'recipe/:search', element: <Blog /> },
        { path: 'recipe/search', element: <Navigate to="/home/recipe/전체" replace/>},
        { path: 'recipe/search/:search', element: <BlogSearch />},
        { path: 'recipe/board/:key', element: <RecipeDetail/>},
        { path: 'recipe/newpost', element : <NewPost/>},
        { path: 'rank', element: <ChefRanking /> },
        { path: 'rank/search/:search', element: <ChefRankingSearch /> },
        { path: 'qna', element: <Products />},
        { path: 'recipe/board/modify/:key', element:<PostModify />},
        { path: 'myinformation', element: <MyInformation/>},
        { path: 'userinformation/:email', element: <UserInformation/>}
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
