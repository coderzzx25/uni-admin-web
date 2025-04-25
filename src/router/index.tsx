import { lazy } from 'react';
import { createBrowserRouter, redirect, RouteObject } from 'react-router';

import { loadLocalRouter } from '@/utils/router';
import { localCache } from '@/utils/cache';

const Main = lazy(() => import('@/views/main/main'));
const Login = lazy(() => import('@/views/login/login'));
const NotFound = lazy(() => import('@/views/notfound/notfound'));

const requireAuth = async () => {
  const token = localCache.getCache('token');

  // 如果token不存在，跳转到登录页
  if (!token) return redirect('/login');

  // 如果token存在，继续访问页面
  return null;
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Main />,
    loader: requireAuth,
    children: loadLocalRouter()
  },
  {
    path: '/login',
    element: <Login />,
    handle: {
      title: 'router.handle.login.title'
    }
  },
  {
    path: '/notfound/:code',
    element: <NotFound />,
    handle: {
      title: 'router.handle.notfound.title'
    }
  },
  {
    path: '*',
    element: <NotFound />,
    handle: {
      title: 'router.handle.notfound.title'
    }
  }
];

const router = createBrowserRouter(routes);

export default router;
