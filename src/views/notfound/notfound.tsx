import { Button, Result } from 'antd';
import { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  children?: ReactNode;
}

const notfound: FC<IProps> = () => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate('/');
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="页面不存在"
      extra={
        <Button type="primary" onClick={navigateToHome}>
          回到首页
        </Button>
      }
    />
  );
};

export default memo(notfound);
