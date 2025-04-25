import { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { RouterProvider } from 'react-router';

import { useAppSelector, useAppShallowEqual } from './store';
import router from './router';
import HigherConfigProvider from './components/HigherConfigProvider/HigherConfigProvider';
import HigherInitialLanguage from './components/HigherInitialLanguage/HigherInitialLanguage';
import HigherWatermark from './components/HigherWatermark/HigherWatermark';

interface IProps {
  children?: ReactNode;
}

const App: FC<IProps> = () => {
  const { themeDark, themeColor, language, userInfo } = useAppSelector((state) => state.user, useAppShallowEqual);

  return (
    <HigherInitialLanguage language={language}>
      <HigherConfigProvider themeDark={themeDark} themeColor={themeColor} language={language}>
        <HigherWatermark content={language === 'zhCN' ? userInfo?.cnName ?? '' : userInfo?.enName ?? ''}>
          <RouterProvider router={router} />
        </HigherWatermark>
      </HigherConfigProvider>
    </HigherInitialLanguage>
  );
};

export default memo(App);
