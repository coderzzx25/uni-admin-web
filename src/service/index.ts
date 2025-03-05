import store from '@/store';
import { BASE_URL, TIME_OUT } from './config';
import Request from './request';
import { message } from 'antd';
import { clearTokenReducer, fetchRefreshToken } from '@/store/modules/user';

let isRefreshing = false;
// 统一的请求对象
const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      if (!config.headers.Authorization) {
        const token = store.getState().user.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    requestFailureFn: (error) => {
      return Promise.reject(error);
    },
    responseSuccessFn: (response) => {
      return response.data;
    },
    responseFailureFn: async (error) => {
      // 判断网络是否断开
      if (!error.response) {
        window.location.href = '/500';
      }

      // 判断token是否失效
      const status = error.response?.status;
      if (status === 401 && !isRefreshing) {
        isRefreshing = true;
        message.info('token失效，正在刷新token，请稍后重试');
        const refreshToken = store.getState().user.refreshToken;
        const result = await store.dispatch(fetchRefreshToken(refreshToken));
        if (fetchRefreshToken.fulfilled.match(result)) {
          message.success('token刷新成功，请重新操作');
          isRefreshing = false;
        } else {
          isRefreshing = false;
          message.error('登录信息已过期，正在跳转到登录页');
          store.dispatch(clearTokenReducer());
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }
      return Promise.reject(error.response?.data || error.message);
    }
  }
});

export default request;
