import Cancel, { isCancel } from "../cancel/Cancel";
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

export interface PlainObject {
  [k: string]: any;
}

export type Canceler = (message: string) => void;
export type CancelExecutor = (cancel: Canceler) => void;

export type CancelInstance = InstanceType<typeof Cancel>;

export interface CancelToken {
  promise: Promise<CancelInstance>;
  reason?: CancelInstance;

  throwIfRequested(): void;
}

export interface CancelStatic {
  new (message?: string): CancelInstance;
}

export interface CancelTokenSource {
  token: CancelToken;
  cancel: Canceler;
}

export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken;

  source(): CancelTokenSource;
}

type ProgressHandler = (e: ProgressEvent<XMLHttpRequestEventTarget>) => void;

export interface AxiosBasicCredentials {
  username: string;
  password: string;
}

export type AxiosRequestParams = PlainObject | URLSearchParams;
export type AxiosParamsSerializer = (params: AxiosRequestParams) => string;

export interface AxiosRequestConfig {
  auth?: AxiosBasicCredentials;
  baseURL?: string;
  url?: string;
  method?: Methods;
  data?: any;
  params?: AxiosRequestParams; // can object or URLSearchParams
  headers?: IHeaders;
  timeout?: number;
  // eslint-disable-next-line no-undef
  responseType?: XMLHttpRequestResponseType;
  transformRequest?: AxiosTransformer | AxiosTransformer[];
  transformResponse?: AxiosTransformer | AxiosTransformer[];
  cancelToken?: CancelToken;
  withCredentials?: boolean;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  onUploadProgress?: ProgressHandler;
  onDownloadProgress?: ProgressHandler;
  validateStatus?: (status: number) => boolean | null;
  paramsSerializer?: AxiosParamsSerializer;

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
  create(config?: AxiosRequestConfig): AxiosInstance;

  CancelToken: CancelTokenStatic;
  isCancel: typeof isCancel;
  Cancel: CancelStatic; // why need this property
  all: <T>(promises: (Promise<T> | T)[]) => Promise<T[]>;
  spread: <T, R>(cb: (...args: T[]) => R) => (arr: T[]) => R;
}

export type ResolvedFn<T = any> = (val: T) => T | Promise<T>;
export type RejectedFn = (error: any) => Promise<any>;
