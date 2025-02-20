import { memo, Suspense } from 'react';
import type { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider, Spin, theme } from 'antd';

import store from './store';
import router from './router';

interface IProps {
  children?: ReactNode;
}

const App: FC<IProps> = () => {
  const { themeState, themeColor } = store.getState().user;
  return (
    <Suspense
      fallback={
        <Spin
          size="large"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}
        />
      }
    >
      <Provider store={store}>
        <ConfigProvider
          theme={{
            algorithm: themeState ? theme.darkAlgorithm : theme.defaultAlgorithm,
            // token: {
            //   colorPrimary: themeColor
            // },
            components: {
              Layout: {
                siderBg: themeState ? themeColor : '#f0f2f5',
                headerBg: themeState ? themeColor : '#f0f2f5',
                headerPadding: 0
              },
              Menu: {
                itemBg: themeState ? themeColor : '#f0f2f5',
                subMenuItemBg: themeState ? themeColor : '#f0f2f5',
                itemSelectedBg: themeColor ? themeColor : '#409EFF',
                itemSelectedColor: themeState ? '#fff' : '#000'
              }
            }
          }}
        >
          <RouterProvider router={router} />
        </ConfigProvider>
      </Provider>
    </Suspense>
  );
};

export default memo(App);
