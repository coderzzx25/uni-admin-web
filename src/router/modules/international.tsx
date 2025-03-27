import { lazy } from 'react';

const International = lazy(() => import('@/views/system/international/international'));

export default {
  path: '/system/international',
  element: <International />
};
