import { lazy } from 'react';

const User = lazy(() => import('@/views/system/user/user'));

export default {
  path: '/system/user',
  element: <User />
};
