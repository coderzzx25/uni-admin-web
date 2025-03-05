import { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const department: FC<IProps> = () => {
  return <div>department</div>;
};

export default memo(department);
