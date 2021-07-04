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

export interface AxiosConfig {
  url: string;
  method: Methods;
  data?: any;
  params?: object;
  headers?: IHeaders;
}

export interface AxiosResponse {
  status: number;
  statusText: string;
  data: any;
  request: XMLHttpRequest;
}
