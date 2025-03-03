import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// 针对AxiosRequestConfig配置进行扩展
export interface Interceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: any) => any;
  requestFailureFn?: (err: AxiosError) => any;
  responseSuccessFn?: (res: T) => T;
  responseFailureFn?: (err: AxiosError) => any;
}

export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: Interceptors<T>;
  headers?: Record<string, string>;
}
