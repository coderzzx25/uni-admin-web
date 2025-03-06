import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

interface IProps {
  children?: ReactNode;
  isCollapsed: boolean;
  handleCollapsed?: (isCollapsed: boolean) => void;
}

const Collapsed: FC<IProps> = ({ isCollapsed, handleCollapsed }) => {
  const onClickCollapsed = () => {
    handleCollapsed && handleCollapsed(!isCollapsed);
  };
  return (
    <>
      {isCollapsed ? (
        <MenuUnfoldOutlined onClick={onClickCollapsed} />
      ) : (
        <MenuFoldOutlined onClick={onClickCollapsed} />
      )}
    </>
  );
};

export default memo(Collapsed);
