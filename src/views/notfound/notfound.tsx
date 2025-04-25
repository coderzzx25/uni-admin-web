import { Button, Result } from 'antd';
import { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

interface IProps {
  children?: ReactNode;
}

type ValidStatus = 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';

const notfound: FC<IProps> = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { t } = useTranslation();
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
          {t('pages.notfound.back')}
        </Button>
      }
    />
  );
};

export default memo(notfound);
