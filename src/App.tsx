import { memo, useMemo } from 'react';
import type { FC, ReactNode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';

import { useAppSelector, useAppShallowEqual } from './store';
import router from './router';

interface IProps {
  children?: ReactNode;
}

const App: FC<IProps> = () => {
  const { themeDark, themeColor, language } = useAppSelector((state) => state.user, useAppShallowEqual);

  const darkColor = '#141414';
  const lightColor = '#fafafa';

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
          siderBg: themeDark ? darkColor : lightColor
        }
      }
    }),
    [themeDark, themeColor]
  );

  return (
    <ConfigProvider theme={themeConfig} locale={language === 'cn' ? zhCN : enUS}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default memo(App);
