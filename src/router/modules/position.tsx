import { lazy } from 'react';

const Position = lazy(() => import('@/views/system/position/position'));

export default {
  path: '/system/position',
  element: <Position />,
  handle: {
    title: 'router.handle.system.position.title'
  }
};
