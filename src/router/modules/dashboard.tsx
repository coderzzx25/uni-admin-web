import { lazy } from 'react';

const Dashboard = lazy(() => import('@/views/dashboard/dashboard'));

export default {
  path: '/',
  element: <Dashboard />
};
