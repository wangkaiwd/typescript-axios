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

export interface AxiosConfig {
  url: string;
  method: Methods;
  data?: any;
  params?: any;
}

export interface AxiosResponse {
  status: number;
  statusText: string;
  data: any;
  request: XMLHttpRequest;
}
