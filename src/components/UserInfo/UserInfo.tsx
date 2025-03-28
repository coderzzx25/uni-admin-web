import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import { Avatar } from 'antd';
import { MenuProps } from 'antd/lib';

import UserInfoWrapper from './style';
import { useAppDispatch } from '@/store';
import { loginOutReducer } from '@/store/modules/user';
import { useNavigate } from 'react-router-dom';

interface IProps {
  children?: ReactNode;
  name: string;
  avatar: string;
}

const UserInfo: FC<IProps> = ({ name, avatar }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const items: MenuProps['items'] = [
    {
      key: 1,
      label: '退出登录',
      onClick: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        dispatch(loginOutReducer());
        navigate('/login');
      }
    }
  ];
  return (
    <UserInfoWrapper menu={{ items }} placement="bottom">
      <div>
        <span>{name}</span>
        <Avatar size={{ sm: 32, md: 40, lg: 64 }} src={avatar} />
      </div>
    </UserInfoWrapper>
  );
};

export default memo(UserInfo);
