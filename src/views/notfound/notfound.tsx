import { Button, Result } from 'antd';
import { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface IProps {
  children?: ReactNode;
}

type ValidStatus = 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';

const notfound: FC<IProps> = () => {
  const navigate = useNavigate();
  const params = useParams();
  const navigateToHome = () => {
    navigate('/');
  };

  const status = params.code && ['404', '403', '500'].includes(params.code) ? (params.code as ValidStatus) : '404';
  return (
    <Result
      status={status}
      title={status}
      extra={
        <Button type="primary" onClick={navigateToHome}>
          回到首页
        </Button>
      }
    />
  );
};

export default memo(notfound);
