import { memo, Suspense } from 'react';
import type { FC, ReactNode } from 'react';
import store from './store';
import { Spin } from 'antd';
import { Provider } from 'react-redux';
import App from './App';

interface IProps {
  children?: ReactNode;
}

const RootApp: FC<IProps> = () => {
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
        <App />
      </Provider>
    </Suspense>
  );
};

export default memo(RootApp);
