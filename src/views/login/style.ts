import { Layout } from 'antd';
import styled from 'styled-components';

const LoginWrapper = styled(Layout)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .login-header {
    width: 100vw;
    text-align: right;
  }

  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form {
      width: 21.875rem;
    }
  }
`;

export default LoginWrapper;
