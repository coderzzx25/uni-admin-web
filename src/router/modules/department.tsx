import { lazy } from 'react';

const Department = lazy(() => import('@/views/system/department/department'));

export default {
  path: '/system/department',
  element: <Department />,
  handle: {
    title: 'router.handle.system.department.title'
  }
};
