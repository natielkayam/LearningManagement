import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

export interface HttpClientConfig {
  baseURL: string;
  timeout?: number;
  useAuth?: boolean;
  useCredentials?: boolean;
}

export class HttpClient {
  private instance: AxiosInstance;
  private config: HttpClientConfig;

  constructor(config: HttpClientConfig) {
    this.config = {
      useAuth: false,
      useCredentials: false,
      ...config,
    };

    this.instance = axios.create({
      baseURL: this.config.baseURL,
      withCredentials: this.config.useCredentials,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Public methods that mirror axios methods
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.get(url, config);
  }

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.post(url, data, config);
  }

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.put(url, data, config);
  }

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.patch(url, data, config);
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.delete(url, config);
  }

  // Get the underlying axios instance for advanced usage
  getInstance(): AxiosInstance {
    return this.instance;
  }
}
// Factory function to create HTTP clients for different services
export const createHttpClient = (config: HttpClientConfig): HttpClient => {
  return new HttpClient(config);
};

export const createCourseClient = (): HttpClient => {
  return createHttpClient({
    baseURL: import.meta.env.VITE_BASE_API_URL_COURSE,
    useAuth: false,
    useCredentials: false, 
  });
};