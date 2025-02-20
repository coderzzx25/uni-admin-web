import { IUserMenuListResponse } from '@/service/modules/auth';
import * as Icons from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { createElement } from 'react';
import { RouteObject } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number] & {
  children?: MenuItem[];
};

const customIcons: { [key: string]: any } = Icons;

const mapIcon = (icon: string) => {
  if (!icon) return '';
  return createElement(customIcons[icon]);
};

/**
 * 路由转Antd menu数据
 * @param router 路由数据
 * @returns Antd menu数据
 */
export const routerToMenu = (router: IUserMenuListResponse[]): MenuItem[] => {
  if (!router.length) return [];
  return router.map((item: IUserMenuListResponse) => {
    const menuItem: MenuItem = {
      key: item.path,
      icon: mapIcon(item.menuIcon),
      label: item.i18nName
    };

    if (item.children && item.children.length > 0) {
      menuItem.children = routerToMenu(item.children);
    }

    return menuItem;
  });
};

/**
 * 根据本地路由文件加载路由
 */
export const loadLocalRouter = (): RouteObject[] => {
  const modules = import.meta.glob('../router/modules/**/*.tsx', { eager: true });
  const routes: RouteObject[] = [];
  for (const key in modules) {
    const route = (modules[key] as { default: RouteObject }).default;
    routes.push(route);
  }
  return routes;
};

/**
 * 路由转URL
 * @param router 路由数据
 * @returns URL数据
 */
export const mapRouterToUrl = (router: IUserMenuListResponse[]): string[] => {
  if (!router.length) return [];
  return router.reduce((acc: string[], item: IUserMenuListResponse) => {
    if (item.children && item.children.length > 0) {
      return [...acc, ...mapRouterToUrl(item.children)];
    }
    return [...acc, item.path];
  }, []);
};
