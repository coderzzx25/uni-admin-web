import { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { RouterProvider } from 'react-router';

import { useAppSelector, useAppShallowEqual } from './store';
import router from './router';
import HigherConfigProvider from './components/HigherConfigProvider/HigherConfigProvider';
import HigherInitialLanguage from './components/HigherInitialLanguage/HigherInitialLanguage';

interface IProps {
  children?: ReactNode;
}

const App: FC<IProps> = () => {
  const { themeDark, themeColor, language } = useAppSelector((state) => state.user, useAppShallowEqual);

  return (
    <HigherInitialLanguage language={language}>
      <HigherConfigProvider themeDark={themeDark} themeColor={themeColor} language={language}>
        <RouterProvider router={router} />
      </HigherConfigProvider>
    </HigherInitialLanguage>
  );
};

export default memo(App);
