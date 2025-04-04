import { lazy } from 'react';

const Permission = lazy(() => import('@/views/system/permission/permission'));

export default {
  path: '/system/permission',
  element: <Permission />,
  handle: {
    title: 'router.handle.system.permission.title'
  }
};
