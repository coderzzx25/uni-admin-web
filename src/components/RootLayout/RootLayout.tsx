import { memo, useEffect, useMemo } from 'react';
import type { FC, ReactNode } from 'react';
import { Layout } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { TranslationOutlined } from '@ant-design/icons';

import { RootLayoutWrapper } from './styled';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import {
  fetchUserInfo,
  fetchUserMenus,
  setCollapsedReducer,
  setLanguageReducer,
  setThemeDarkReducer
} from '@/store/modules/user';
import { mapRouterToUrl, routerToMenu } from '@/utils/router';
import RootMenu from '../RootMenu/RootMenu';
import Collapsed from '../Collapsed/Collapsed';
import ThemeDark from '../ThemeDark/ThemeDark';

interface IProps {
  children?: ReactNode;
}

const { Sider, Header, Content } = Layout;

const RootLayout: FC<IProps> = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const { collapsed, userMenus, language, themeDark } = useAppSelector((state) => state.user, useAppShallowEqual);

  useEffect(() => {
    dispatch(fetchUserInfo());
    dispatch(fetchUserMenus());
  }, []);

  // 将菜单转成一维数组用于判断是否拥有目标路由权限
  const router = useMemo(() => mapRouterToUrl(userMenus), [userMenus, i18n.language]);
  const items = useMemo(() => routerToMenu(userMenus, t, ''), [userMenus, i18n.language]);

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

  /**
   * 切换侧边栏
   */
  const onClickCollapsed = (isCollapsed: boolean) => {
    dispatch(setCollapsedReducer(isCollapsed));
  };

  /**
   * 切换语言
   */
  const onClickLanguage = (language: string) => {
    i18n.changeLanguage(language);
    dispatch(setLanguageReducer(language));
  };

  /**
   * 切换主题
   */
  const onClickThemeDark = (isDark: boolean) => {
    dispatch(setThemeDarkReducer(isDark));
  };

  return (
    <RootLayoutWrapper>
      <Sider collapsed={collapsed}>
        <RootMenu items={items} mode="inline" defaultSelectedKeys={pathname} handleMenu={onClickMenu} />
      </Sider>
      <Layout>
        <Header className="header">
          <div>
            <Collapsed isCollapsed={collapsed} handleCollapsed={onClickCollapsed} />
          </div>
          <div>
            <TranslationOutlined onClick={() => onClickLanguage(language === 'cn' ? 'en' : 'cn')} />
            <ThemeDark isDark={themeDark} handleThemeDark={onClickThemeDark} />
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
