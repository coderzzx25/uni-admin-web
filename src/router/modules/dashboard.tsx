import { lazy } from 'react';

const Dashboard = lazy(() => import('@/views/main/dashboard/dashboard'));

export default {
  path: '/',
  element: <Dashboard />,
  handle: {
    title: 'router.handle.dashboard.title'
  }
};
