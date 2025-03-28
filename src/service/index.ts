import { BASE_URL, TIME_OUT } from './config';
import Request from './request';
import { message } from 'antd';
import { localCache } from '@/utils/cache';
import { refreshTokenAPI } from './modules/auth';

let isRefreshing = false;

// 创建请求实例
const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      if (!config.headers.Authorization) {
        const token = localCache.getCache('token');
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
      // 处理网络错误（无响应情况）
      if (!error.response) {
        return Promise.reject('网络错误');
      }

      const { status } = error.response;

      if (status === 401 && !isRefreshing) {
        isRefreshing = true;
        message.info('token失效，正在刷新token，请稍后重试');

        const refreshToken = localCache.getCache('refreshToken');

        if (refreshToken) {
          try {
            const result = await refreshTokenAPI(refreshToken);
            localCache.setCache('token', result.token);
            localCache.setCache('refreshToken', result.refreshToken);
            isRefreshing = false;
            message.success('token刷新成功,请重新操作');
          } catch (error) {
            localCache.deleteCache('token');
            localCache.deleteCache('refreshToken');
            message.error('用户信息已过期,请重新登录,正在跳转到登录页');
            setTimeout(() => {
              window.location.href = '/login';
            }, 1000);
            return Promise.reject('用户信息已过期，请重新登录');
          }
        } else {
          localCache.deleteCache('token');
          localCache.deleteCache('refreshToken');
          message.error('用户信息已过期,请重新登录,正在跳转到登录页');
          setTimeout(() => {
            window.location.href = '/login';
          }, 1000);
          return Promise.reject('用户信息已过期，请重新登录');
        }
      }

      // 其他错误处理
      return Promise.reject(error.response?.data || error.message);
    }
  }
});

export default request;
