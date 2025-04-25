import { lazy } from 'react';

const International = lazy(() => import('@/views/main/system/international/international'));

export default {
  path: '/system/international',
  element: <International />,
  handle: {
    title: 'router.handle.system.international.title'
  }
};
