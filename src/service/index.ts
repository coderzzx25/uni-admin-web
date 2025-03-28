import store from '@/store';
import { BASE_URL, TIME_OUT } from './config';
import Request from './request';
import { message } from 'antd';
import { clearTokenReducer, fetchRefreshToken } from '@/store/modules/user';
import { RequestConfig } from './request/type';
import { AxiosHeaders } from 'axios';

type FailedQueueItem = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
  config: RequestConfig;
};
let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

// 处理队列中的失败请求
const processQueue = (error?: Error): void => {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error);
      return;
    }

    if (config) {
      resolve(request.instance(config));
    }
  });
  failedQueue = [];
};

// 创建请求实例
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
      // 处理网络错误（无响应情况）
      if (!error.response) {
        return Promise.reject('网络错误');
      }

      const { status } = error.response;
      const originalRequest = error.config;

      if (status === 401 && !isRefreshing) {
        isRefreshing = true;

        try {
          const refreshToken = store.getState().user.refreshToken;

          const retryRequest = new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject, config: originalRequest as RequestConfig });
          });

          const result = store.dispatch(fetchRefreshToken(refreshToken));

          if (fetchRefreshToken.fulfilled.match(result)) {
            const { token } = result.payload;

            if (originalRequest?.headers instanceof AxiosHeaders) {
              originalRequest.headers.set('Authorization', `Bearer ${token}`);
            }

            processQueue();

            return retryRequest;
          }
        } catch (error) {
          // 清理用户状态
          store.dispatch(clearTokenReducer());
          message.error('会话已过期，请重新登录');
          window.location.hash = '/login';

          // 拒绝所有队列请求
          processQueue(error as Error);
          return Promise.reject(error);
        }
      }

      // 其他错误处理
      return Promise.reject(error.response?.data || error.message);
    }
  }
});

export default request;
