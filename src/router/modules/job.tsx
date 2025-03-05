import { lazy } from 'react';

const Job = lazy(() => import('@/views/system/job/job'));

export default {
  path: '/system/job',
  element: <Job />
};
