import { lazy } from 'react';

const User = lazy(() => import('@/views/main/system/user/user'));

export default {
  path: '/system/user',
  element: <User />,
  handle: {
    title: 'router.handle.system.user.title'
  }
};
