import { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { Watermark } from 'antd';

interface IProps {
  children: ReactNode;
  content: string;
}

const HigherWatermark: FC<IProps> = ({ children, content = '水印' }) => {
  return (
    <Watermark style={{ height: '100vh' }} content={content}>
      {children}
    </Watermark>
  );
};

export default memo(HigherWatermark);
