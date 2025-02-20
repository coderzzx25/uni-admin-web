import { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const menu: FC<IProps> = () => {
  return <div>menu</div>;
};

export default memo(menu);
