import {
  AxiosErrorOptions,
  AxiosRequestConfig,
  AxiosResponse,
  IAxiosError,
} from "../types";

export class AxiosError extends Error implements IAxiosError {
  isAxiosError: boolean;

  config: AxiosRequestConfig;

  request?: XMLHttpRequest;

  response?: AxiosResponse;

  code?: string;

  constructor(options: AxiosErrorOptions) {
    super(options.message);
    this.isAxiosError = true;
    this.config = options.config;
    this.request = options.request;
    this.response = options.response;
    if (options.code) {
      this.code = options.code;
    }
  }
}

export function createError(options: AxiosErrorOptions): IAxiosError {
  return new AxiosError(options);
}
