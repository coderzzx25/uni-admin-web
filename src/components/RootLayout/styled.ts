import { Layout } from 'antd';
import styled from 'styled-components';

export const RootLayoutWrapper = styled(Layout)`
  height: 100vh;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .content {
    padding: 1.25rem;
  }
`;
