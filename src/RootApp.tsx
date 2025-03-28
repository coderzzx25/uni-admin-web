import { memo } from 'react';
import type { FC, ReactNode } from 'react';
import store from './store';
import { Provider } from 'react-redux';
import App from './App';
import LazySuspense from './components/LazySuspense/LazySuspense';

interface IProps {
  children?: ReactNode;
}

const RootApp: FC<IProps> = () => {
  return (
    <LazySuspense>
      <Provider store={store}>
        <App />
      </Provider>
    </LazySuspense>
  );
};

export default memo(RootApp);
