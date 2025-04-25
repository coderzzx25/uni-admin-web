import Collapsed from '@/components/Collapsed/Collapsed';
import ThemeColor from '@/components/ThemeColor/ThemeColor';
import ThemeDark from '@/components/ThemeDark/ThemeDark';
import Translation from '@/components/Translation/Translation';
import { Layout } from 'antd';
import { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  children?: ReactNode;
}

const { Header } = Layout;

const MainHeader: FC<IProps> = ({ collapsed, setCollapsed, children }) => {
  return (
    <Header className="header">
      <div>
        <Collapsed isCollapsed={collapsed} handleCollapsed={setCollapsed} />
      </div>
      <div className="header-right">
        <Translation />
        <ThemeDark />
        <ThemeColor className="theme-color" />
        <span id="divider"></span>
        {children}
      </div>
    </Header>
  );
};

export default memo(MainHeader);
