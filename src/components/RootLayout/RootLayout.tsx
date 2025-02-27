import { memo, useEffect, useMemo } from 'react';
import type { FC, ReactNode } from 'react';
import { Layout } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { RootLayoutWrapper } from './styled';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import { fetchUserInfo, fetchUserMenus } from '@/store/modules/user';
import { mapRouterToUrl, routerToMenu } from '@/utils/router';
import RootMenu from '../RootMenu/RootMenu';

interface IProps {
  children?: ReactNode;
}

const { Sider, Header, Content } = Layout;

const RootLayout: FC<IProps> = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { collapsed, userMenus } = useAppSelector((state) => state.user, useAppShallowEqual);

  useEffect(() => {
    dispatch(fetchUserInfo());
    dispatch(fetchUserMenus());
  }, []);

  // 将菜单转成一维数组用于判断是否拥有目标路由权限
  const router = useMemo(() => mapRouterToUrl(userMenus), [userMenus]);
  const items = useMemo(() => routerToMenu(userMenus), [userMenus]);

  useEffect(() => {
    if (router.length && !router.includes(pathname)) {
      navigate('/not-found');
    }
  }, [pathname, router]);

  /**
   * 切换路由
   */
  const onClickMenu = (path: string) => {
    navigate(path);
  };

  return (
    <RootLayoutWrapper>
      <Sider collapsed={collapsed}>
        <RootMenu items={items} mode="inline" defaultSelectedKeys={pathname} handleMenu={onClickMenu} />
      </Sider>
      <Layout>
        <Header>header</Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </RootLayoutWrapper>
  );
};

export default memo(RootLayout);
