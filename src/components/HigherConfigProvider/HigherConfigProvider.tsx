import { memo, useMemo } from 'react';
import type { FC, ReactNode } from 'react';

import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import { Language } from '@/global.types';

interface IProps {
  children: ReactNode;
  themeDark: boolean;
  themeColor: string;
  language: Language;
  darkColor?: string;
  lightColor?: string;
}

const HigherConfigProvider: FC<IProps> = ({ children, themeDark, themeColor, language, darkColor = '#141414', lightColor = '#fafafa' }) => {
  const themeConfig = useMemo(
    () => ({
      algorithm: themeDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: {
        colorPrimary: themeColor
      },
      components: {
        Layout: {
          headerPadding: '0 1.25rem',
          headerBg: themeDark ? darkColor : lightColor,
          siderBg: themeDark ? darkColor : '#ffffff',
          bodyBg: themeDark ? darkColor : lightColor
        },
        Menu: {
          activeBarBorderWidth: 0 // 指示条边框宽度
        }
      }
    }),
    [themeDark, themeColor]
  );
  return (
    <ConfigProvider theme={themeConfig} locale={language === 'zhCN' ? zhCN : enUS}>
      {children}
    </ConfigProvider>
  );
};

export default memo(HigherConfigProvider);
