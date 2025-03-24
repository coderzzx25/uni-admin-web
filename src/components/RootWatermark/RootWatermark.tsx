import { useAppSelector, useAppShallowEqual } from '@/store';
import { Watermark } from 'antd';
import { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const RootWatermark: FC<IProps> = ({ children }) => {
  const { userInfo, language } = useAppSelector((state) => state.user, useAppShallowEqual);
  return <Watermark content={language === 'zh' ? userInfo?.cnName : userInfo?.enName}>{children}</Watermark>;
};

export default memo(RootWatermark);
