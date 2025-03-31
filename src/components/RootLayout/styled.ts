import { Layout } from 'antd';
import styled from 'styled-components';

export const RootLayoutWrapper = styled(Layout)`
  height: 100vh;

  .logo {
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }

  .logo img {
    height: 100%;
  }

  .logo span {
    font-size: 1.5rem;
    font-weight: bold;
    margin-left: 0.5rem;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header-right {
    display: flex;
    align-items: center;
  }

  .theme-color {
    margin-right: 0.5rem;
  }
  .content {
    padding: 1.25rem;
  }
`;
