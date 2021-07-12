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

export type IHeaders = Record<string, string>;

export interface AxiosRequestConfig {
  url?: string;
  method?: Methods;
  data?: any;
  params?: object;
  headers?: IHeaders;
  timeout?: number;
  // eslint-disable-next-line no-undef
  responseType?: XMLHttpRequestResponseType;
}

export interface AxiosResponse {
  status: number;
  statusText: string;
  data: any;
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

export type AxiosPromise = Promise<AxiosResponse>;

export type AxiosErrorOptions = Omit<IAxiosError, "isAxiosError" | "name">;

export interface AxiosInstance extends InstanceType<typeof Axios> {
  (config: AxiosRequestConfig): AxiosPromise;
}
