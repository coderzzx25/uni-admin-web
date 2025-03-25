import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import { Skeleton, type MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

import { RootMenuWrapper } from './style';

export interface IMenuConfig {}

interface IProps {
  children?: ReactNode;
  items: MenuItem[];
  mode?: 'inline' | 'horizontal' | 'vertical';
  defaultSelectedKeys?: string;
  handleMenu?: (path: string) => void;
}

const RootMenu: FC<IProps> = ({ items, defaultSelectedKeys, mode, handleMenu }) => {
  const formatPath = (path: string) => {
    const paths = path.split('/').filter(Boolean); // 分割路径并去掉空元素
    const result = [];
    for (let i = 1; i <= paths.length; i++) {
      result.push('/' + paths.slice(0, i).join('/')); // 拼接路径
    }
    return result;
  };

  return (
    <>
      {!items.length ? (
        <Skeleton active paragraph={{ rows: items.length }}></Skeleton>
      ) : (
        <RootMenuWrapper
          defaultOpenKeys={formatPath(defaultSelectedKeys || '')}
          defaultSelectedKeys={[defaultSelectedKeys || '']}
          mode={mode}
          theme="dark"
          items={items}
          onClick={({ key }) => handleMenu && handleMenu(key)}
        />
      )}
    </>
  );
};

export default memo(RootMenu);
