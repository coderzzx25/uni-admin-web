import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import { Layout } from 'antd';
import ThemeDark from '@/components/ThemeDark/ThemeDark';
import Translation from '@/components/Translation/Translation';

interface IProps {
  children?: ReactNode;
}

const { Header } = Layout;

const LoginHeader: FC<IProps> = () => {
  return (
    <Header className="login-header">
      <Translation />
      <ThemeDark />
    </Header>
  );
};

export default memo(LoginHeader);
