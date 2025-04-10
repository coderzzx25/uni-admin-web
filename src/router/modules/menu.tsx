import { lazy } from 'react';

const Menu = lazy(() => import('@/views/system/menu/menu'));

export default {
  path: '/system/menu',
  element: <Menu />,
  handle: {
    title: 'router.handle.system.menu.title'
  }
};
