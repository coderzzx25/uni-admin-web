import { Typography } from 'antd';
import Sider from 'antd/es/layout/Sider';
import classNames from 'classnames';
import { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  collapsed: boolean;
  children?: ReactNode;
}

const { Text } = Typography;

const MainSider: FC<IProps> = ({ collapsed, children }) => {
  return (
    <Sider collapsed={collapsed}>
      <div className="logo">
        <img src="/logo.png" alt="logo" />
        <Text className={classNames({ hidden: collapsed })}>Uni Admin</Text>
      </div>
      {children}
    </Sider>
  );
};

export default memo(MainSider);
