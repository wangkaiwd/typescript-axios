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

  constructor(options: AxiosErrorOptions) {
    super(options.message);
    this.isAxiosError = true;
    this.config = options.config;
    this.request = options.request;
    this.response = options.response;
  }
}

export function createError(options: AxiosErrorOptions): IAxiosError {
  return new AxiosError(options);
}
