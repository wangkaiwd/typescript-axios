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
  | "patch"
  | "PATCH";

export type IHeaders = Record<string, string>;

export interface AxiosRequestConfig {
  url: string;
  method: Methods;
  data?: any;
  params?: object;
  headers?: IHeaders;
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
