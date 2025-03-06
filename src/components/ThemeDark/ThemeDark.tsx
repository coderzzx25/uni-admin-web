import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import { MoonOutlined, SunOutlined } from '@ant-design/icons';

interface IProps {
  children?: ReactNode;
  isDark: boolean;
  handleThemeDark?: (isDark: boolean) => void;
}

const ThemeDark: FC<IProps> = ({ isDark, handleThemeDark }) => {
  const onClickThemeDark = () => {
    handleThemeDark && handleThemeDark(!isDark);
  };
  return <>{isDark ? <SunOutlined onClick={onClickThemeDark} /> : <MoonOutlined onClick={onClickThemeDark} />}</>;
};

export default memo(ThemeDark);
