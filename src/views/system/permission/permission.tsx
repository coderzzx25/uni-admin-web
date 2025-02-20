import { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const permission: FC<IProps> = () => {
  return <div>permission</div>;
};

export default memo(permission);
