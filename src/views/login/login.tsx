import { memo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Flex, Form, Image, Input, Layout, message, Typography } from 'antd';

import { userAccountLoginAPI } from '@/service/modules/auth';

import { useAppDispatch } from '@/store';
import { setTokenReducer } from '@/store/modules/user';
import LoginWrapper from './style';
import { useTranslation } from 'react-i18next';
import { localCache } from '@/utils/cache';
import ThemeDark from '@/components/ThemeDark/ThemeDark';
import Translation from '@/components/Translation/Translation';

interface IProps {
  children?: ReactNode;
}

const { Header, Content } = Layout;
const { Title } = Typography;
const login: FC<IProps> = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState(`${import.meta.env.VITE_BASE_URL}/auth/captcha`);
  const [form] = Form.useForm();
  const onClickUserAccountLogin = async () => {
    // 信息校验
    const loginInfo = await form.validateFields();

    const { username, remember } = loginInfo;

    if (remember) {
      localCache.setCache('remember', true);
      localCache.setCache('username', username);
    } else {
      localCache.deleteCache('remember');
      localCache.deleteCache('username');
    }

    try {
      // 发送网络请求
      const userInfo = await userAccountLoginAPI(loginInfo);
      // 将token存储到redux中
      dispatch(setTokenReducer(userInfo));
      // 登录成功后跳转到首页
      navigate('/');
    } catch (error: any) {
      message.error(error.message);
    }
  };

  // 刷新验证码
  const onClickRefreshCaptcha = () => {
    setCaptcha(`${import.meta.env.VITE_BASE_URL}/auth/captcha?${Date.now()}`);
  };

  return (
    <LoginWrapper>
      <Header className="login-header">
        <Translation />
        <ThemeDark />
      </Header>
      <Content className="login-container">
        <Title level={3}>{t('LOGIN.WELCOME')}</Title>
        <Form
          form={form}
          onFinish={onClickUserAccountLogin}
          autoComplete="off"
          size="large"
          initialValues={{ remember: localCache.getCache('remember'), username: localCache.getCache('username') }}
        >
          <Form.Item name="username" rules={[{ required: true, message: `${t('LOGIN.USERNAME_PLACEHOLDER')}` }]}>
            <Input placeholder={t('LOGIN.USERNAME_PLACEHOLDER')} />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: `${t('LOGIN.PASSWORD_PLACEHOLDER')}` }]}>
            <Input type="password" placeholder={t('LOGIN.PASSWORD_PLACEHOLDER')} />
          </Form.Item>
          <Form.Item noStyle>
            <Flex justify="space-between" align="center">
              <Form.Item name="verifyCode" rules={[{ required: true, message: `${t('LOGIN.CAPTCHA_PLACEHOLDER')}` }]}>
                <Input placeholder={t('LOGIN.CAPTCHA_PLACEHOLDER')} />
              </Form.Item>
              <Form.Item>
                <Image
                  src={captcha}
                  alt="图片验证码"
                  className="captcha"
                  preview={false}
                  onClick={onClickRefreshCaptcha}
                />
              </Form.Item>
            </Flex>
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>{t('LOGIN.REMEMBER_ME')}</Checkbox>
              </Form.Item>
              <a href="#">{t('LOGIN.FORGET_PASSWORD')}</a>
            </Flex>
          </Form.Item>
          <Form.Item>
            <Button type="primary" block htmlType="submit">
              {t('LOGIN.LOGIN_BUTTON')}
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </LoginWrapper>
  );
};

export default memo(login);
