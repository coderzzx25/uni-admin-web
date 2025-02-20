import { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const role: FC<IProps> = () => {
  return <div>role</div>;
};

export default memo(role);
