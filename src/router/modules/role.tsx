import { lazy } from 'react';

const Role = lazy(() => import('@/views/system/role/role'));

export default {
  path: '/system/role',
  element: <Role />
};
