import store from '@/store';
import { BASE_URL, TIME_OUT } from './config';
import Request from './request';

// 统一的请求对象
const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      const token = store.getState().user.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    requestFailureFn: (error) => {
      return Promise.reject(error);
    },
    responseSuccessFn: (response) => {
      return response.data;
    },
    responseFailureFn: (error) => {
      return Promise.reject(error.response?.data || error.message);
    }
  }
});

export default request;
