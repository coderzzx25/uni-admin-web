import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import LoginWrapper from './style';
import HigherDocumentTitle from '@/components/HigherDocumentTitle/HigherDocumentTitle';
import LoginHeader from './c-cpn/LoginHeader';
import AccountLogin from './c-cpn/AccountLogin';

interface IProps {
  children?: ReactNode;
}

const login: FC<IProps> = () => {
  return (
    <HigherDocumentTitle>
      <LoginWrapper>
        <LoginHeader />
        <AccountLogin />
      </LoginWrapper>
    </HigherDocumentTitle>
  );
};

export default memo(login);
