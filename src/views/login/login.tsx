import { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

import { IUserAccountLoginRequest, userAccountLoginAPI } from '@/service/modules/auth';

import { useAppDispatch } from '@/store';
import { setTokenReducer } from '@/store/modules/user';

interface IProps {
  children?: ReactNode;
}

const login: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onClickUserAccountLogin = async () => {
    // 信息校验
    const loginInfo: IUserAccountLoginRequest = {
      username: 'coderzzx',
      password: '123456',
      verifyCode: ''
    };
    // 发送网络请求
    const userInfo = await userAccountLoginAPI(loginInfo);

    // 将token存储到redux中
    dispatch(setTokenReducer(userInfo));
    // 登录成功后跳转到首页
    navigate('/');
  };
  return (
    <div>
      <h1>login</h1>
      <Button type="primary" onClick={onClickUserAccountLogin}>
        一键登录
      </Button>
    </div>
  );
};

export default memo(login);
