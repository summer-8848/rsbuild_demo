import axios, { type AxiosRequestConfig, AxiosResponse } from 'axios';

// 创建实例
const service = axios.create({
  baseURL: process.env.PUBLIC_BASE_API, // 设置默认的 baseURL
  timeout: 3000, // 设置默认的 timeout
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (!config.headers) {
      throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    console.error('error: ', error);
    return Promise.reject(error.message);
  }
);

// 封装request方法，使其支持泛型
export function request<T>(config: AxiosRequestConfig): Promise<T> {
  return new Promise((resolve, reject) => {
    service(config)
      .then((response: AxiosResponse) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// 导出 axios 实例
export default request;
