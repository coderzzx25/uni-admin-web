import store from '@/store';
import { lazy } from 'react';
import { createBrowserRouter, redirect, RouteObject } from 'react-router-dom';

import { loadLocalRouter } from '@/utils/router';

const RootLayout = lazy(() => import('@/components/RootLayout/RootLayout'));
const Login = lazy(() => import('@/views/login/login'));
const NotFound = lazy(() => import('@/views/notfound/notfound'));

const requireAuth = async () => {
  // 获取redux中的token
  const state = store.getState();

  const token = state.user.token;

  // 如果token不存在，跳转到登录页
  if (!token) return redirect('/login');

  // 如果token存在，继续访问页面
  return null;
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    loader: requireAuth,
    children: loadLocalRouter()
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

const router = createBrowserRouter(routes);

export default router;
