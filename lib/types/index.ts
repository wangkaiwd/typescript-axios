import Axios from "../core/Axios";

export type Methods =
  | "get"
  | "GET"
  | "head"
  | "HEAD"
  | "post"
  | "POST"
  | "delete"
  | "DELETE"
  | "options"
  | "OPTIONS"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH";

export type IHeaders = Record<string, any>;

export interface AxiosTransformer {
  (data: any, headers?: any): any;
}

export interface CancelToken {
  promise: Promise<string>;
  reason: string;
}

export interface AxiosRequestConfig {
  url?: string;
  method?: Methods;
  data?: any;
  params?: object;
  headers?: IHeaders;
  timeout?: number;
  // eslint-disable-next-line no-undef
  responseType?: XMLHttpRequestResponseType;
  transformRequest?: AxiosTransformer | AxiosTransformer[];
  transformResponse?: AxiosTransformer | AxiosTransformer[];
  cancelToken?: CancelToken;

  [k: string]: any;
}

export interface AxiosResponse<T = any> {
  status: number;
  statusText: string;
  data: T;
  headers: IHeaders;
  config: AxiosRequestConfig;
  request: XMLHttpRequest;
}

export interface IAxiosError extends Error {
  config: AxiosRequestConfig;
  code?: string;
  request?: XMLHttpRequest;
  response?: AxiosResponse;
  message: string;
  isAxiosError: boolean;
}

export type AxiosPromise<T = any> = Promise<AxiosResponse<T>>;

export type AxiosErrorOptions = Omit<IAxiosError, "isAxiosError" | "name">;

export interface AxiosInstance extends InstanceType<typeof Axios> {
  // function overload: https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads
  // notice position of generic parameters
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>;

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
}

export interface AxiosStatic extends AxiosInstance {
  create(config: AxiosRequestConfig): AxiosInstance;
}

export type ResolvedFn<T = any> = (val: T) => T | Promise<T>;
export type RejectedFn = (error: any) => Promise<any>;
export type Canceler = (message: string) => void;
export type CancelExecutor = (cancel: Canceler) => void;
