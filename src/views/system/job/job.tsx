import { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const job: FC<IProps> = () => {
  return <div>job</div>;
};

export default memo(job);
