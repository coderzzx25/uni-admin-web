import { memo, useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Flex, Form, Input, Layout, message, Typography } from 'antd';

import { userAccountLoginAPI } from '@/service/modules/auth';

import { useAppDispatch } from '@/store';
import LoginWrapper from './style';
import { useTranslation } from 'react-i18next';
import { localCache } from '@/utils/cache';
import ThemeDark from '@/components/ThemeDark/ThemeDark';
import Translation from '@/components/Translation/Translation';
import { fetchAllLocales } from '@/store/modules/locales';
import { i18nPrefix } from '@/utils';
import useDocumentTitle from '@/hooks/useDocumentTitle/useDocumentTitle';

interface IProps {
  children?: ReactNode;
}

const { Header, Content } = Layout;
const { Title } = Typography;
const login: FC<IProps> = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { pathname } = useLocation();
  useDocumentTitle();

  useEffect(() => {
    dispatch(fetchAllLocales());
  }, []);
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
      // 将token存储到本地中
      localCache.setCache('token', userInfo.token);
      localCache.setCache('refreshToken', userInfo.refreshToken);
      // 登录成功后跳转到首页
      navigate('/');
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <LoginWrapper>
      <Header className="login-header">
        <Translation />
        <ThemeDark />
      </Header>
      <Content className="login-container">
        <Title level={3}>{t(i18nPrefix(pathname, 'welcome'))}</Title>
        <Form
          form={form}
          onFinish={onClickUserAccountLogin}
          autoComplete="off"
          size="large"
          initialValues={{ remember: localCache.getCache('remember'), username: localCache.getCache('username') }}
        >
          <Form.Item name="username" rules={[{ required: true, message: `${t(i18nPrefix(pathname, 'username.rules.required'))}` }]}>
            <Input placeholder={t(i18nPrefix(pathname, 'username.rules.required'))} />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: `${t(i18nPrefix(pathname, 'password.rules.required'))}` }]}>
            <Input type="password" placeholder={t(i18nPrefix(pathname, 'password.rules.required'))} />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>{t(i18nPrefix(pathname, 'remember'))}</Checkbox>
              </Form.Item>
              <a href="#">{t(i18nPrefix(pathname, 'forget-password'))}</a>
            </Flex>
          </Form.Item>
          <Form.Item>
            <Button type="primary" block htmlType="submit">
              {t(i18nPrefix(pathname, 'login-button'))}
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </LoginWrapper>
  );
};

export default memo(login);
