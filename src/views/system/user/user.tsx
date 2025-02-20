import { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const user: FC<IProps> = () => {
  return <div>user</div>;
};

export default memo(user);
