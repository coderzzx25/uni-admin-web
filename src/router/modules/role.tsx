import { lazy } from 'react';

const Role = lazy(() => import('@/views/main/system/role/role'));

export default {
  path: '/system/role',
  element: <Role />,
  handle: {
    title: 'router.handle.system.role.title'
  }
};
