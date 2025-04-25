import { memo, useEffect, useMemo } from 'react';
import type { FC, ReactNode } from 'react';
import { MainWrapper } from './style';
import MainHeader from './c-cpn/MainHeader';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import { fetchUserInfo, fetchUserMenus, setCollapsedReducer } from '@/store/modules/user';
import UserInfo from '@/components/UserInfo/UserInfo';
import HigherDocumentTitle from '@/components/HigherDocumentTitle/HigherDocumentTitle';
import MainSider from './c-cpn/MainSider';
import RootMenu from '@/components/RootMenu/RootMenu';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { mapRouterToUrl, routerToMenu } from '@/utils/router';
import { useTranslation } from 'react-i18next';
import { Layout } from 'antd';

interface IProps {
  children?: ReactNode;
}

const { Content } = Layout;

const main: FC<IProps> = () => {
  const { language, collapsed, userInfo, userMenus } = useAppSelector((state) => state.user, useAppShallowEqual);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const router = useMemo(() => mapRouterToUrl(userMenus), [userMenus, i18n.language]);
  const items = useMemo(() => routerToMenu(userMenus, t, ''), [userMenus, i18n.language]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUserInfo());
      await dispatch(fetchUserMenus());
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (router.length && !router.includes(pathname)) {
      navigate('/not-found/404');
    }
  }, [pathname, router]);
  /**
   * 切换侧边栏
   */
  const onClickCollapsed = (isCollapsed: boolean) => {
    dispatch(setCollapsedReducer(isCollapsed));
  };
  /**
   * 切换路由
   */
  const onClickMenu = (path: string) => {
    navigate(path);
  };
  return (
    <HigherDocumentTitle>
      <MainWrapper>
        <MainSider collapsed={collapsed}>
          <RootMenu items={items} mode="inline" defaultSelectedKeys={pathname} handleMenu={onClickMenu} />
        </MainSider>
        <Layout>
          <MainHeader collapsed={collapsed} setCollapsed={onClickCollapsed}>
            <UserInfo name={language === 'zhCN' ? userInfo?.cnName || '' : userInfo?.enName || ''} avatar={userInfo?.avatarUrl || ''} />
          </MainHeader>
          <Content className="content">
            <Outlet />
          </Content>
        </Layout>
      </MainWrapper>
    </HigherDocumentTitle>
  );
};

export default memo(main);
