import { memo, useEffect, useMemo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { Button, Layout, Result, Typography } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { RootLayoutWrapper } from './styled';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import { fetchUserInfo, fetchUserMenus, setCollapsedReducer } from '@/store/modules/user';
import { mapRouterToUrl, routerToMenu } from '@/utils/router';
import RootMenu from '../RootMenu/RootMenu';
import Collapsed from '../Collapsed/Collapsed';
import ThemeDark from '../ThemeDark/ThemeDark';
import Translation from '../Translation/Translation';
import ThemeColor from '../ThemeColor/ThemeColor';
import UserInfo from '../UserInfo/UserInfo';
import useDocumentTitle from '@/hooks/useDocumentTitle/useDocumentTitle';

interface IProps {
  children?: ReactNode;
}

const { Sider, Header, Content } = Layout;
const { Text } = Typography;

const RootLayout: FC<IProps> = () => {
  useDocumentTitle();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const { collapsed, userMenus, userInfo, language } = useAppSelector((state) => state.user, useAppShallowEqual);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchUserInfo());
        await dispatch(fetchUserMenus());
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 将菜单转成一维数组用于判断是否拥有目标路由权限
  const router = useMemo(() => mapRouterToUrl(userMenus), [userMenus, i18n.language]);
  const items = useMemo(() => routerToMenu(userMenus, t, ''), [userMenus, i18n.language]);

  useEffect(() => {
    if (router.length && !router.includes(pathname)) {
      navigate('/not-found/404');
    }
  }, [pathname, router]);

  /**
   * 切换路由
   */
  const onClickMenu = (path: string) => {
    navigate(path);
  };

  /**
   * 切换侧边栏
   */
  const onClickCollapsed = (isCollapsed: boolean) => {
    dispatch(setCollapsedReducer(isCollapsed));
  };

  const onClickReset = () => {
    // 重新加载页面
    window.location.reload();
  };

  if (loading) {
    return (
      <Result
        status="500"
        title="500"
        subTitle="网络错误"
        extra={
          <Button type="primary" onClick={onClickReset}>
            刷一下
          </Button>
        }
      />
    );
  }

  return (
    <RootLayoutWrapper>
      <Sider collapsed={collapsed}>
        <div className="logo">
          <img src="/logo.png" alt="logo" />
          <Text className={classNames({ hidden: collapsed })}>Uni Admin</Text>
        </div>
        <RootMenu items={items} mode="inline" defaultSelectedKeys={pathname} handleMenu={onClickMenu} />
      </Sider>
      <Layout>
        <Header className="header">
          <div>
            <Collapsed isCollapsed={collapsed} handleCollapsed={onClickCollapsed} />
          </div>
          <div className="header-right">
            <Translation />
            <ThemeDark />
            <ThemeColor className="theme-color" />
            <span id="divider"></span>
            <UserInfo
              name={language === 'zhCN' ? userInfo?.cnName || '' : userInfo?.enName || ''}
              avatar={userInfo?.avatarUrl || ''}
            />
          </div>
        </Header>
        <Content className="content">
          <Outlet />
        </Content>
      </Layout>
    </RootLayoutWrapper>
  );
};

export default memo(RootLayout);
