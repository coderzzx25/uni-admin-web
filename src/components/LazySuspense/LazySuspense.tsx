import { Spin } from 'antd';
import { memo, Suspense } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const LazySuspense: FC<IProps> = ({ children }) => {
  return (
    <Suspense
      fallback={
        <Spin
          size="large"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
          }}
        />
      }
    >
      {children}
    </Suspense>
  );
};

export default memo(LazySuspense);
