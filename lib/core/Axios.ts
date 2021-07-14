import dispatchRequest from "./dispatchRequest";
import { AxiosPromise, AxiosRequestConfig } from "../types";

export default class Axios {
  request<T = any>(
    url: string | AxiosRequestConfig,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    if (typeof url === "string") {
      // type guard by typeof operator
      if (!config) {
        config = {};
      }
      config.url = url;
    } else {
      config = url;
    }
    return dispatchRequest(config);
  }

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.request<T>({
      ...config,
      url,
      method: "get",
    });
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.request<T>({
      ...config,
      url,
      method: "delete",
    });
  }

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.request<T>({
      ...config,
      url,
      method: "head",
    });
  }

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.request<T>({
      ...config,
      url,
      method: "options",
    });
  }

  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.request<T>({
      ...config,
      url,
      data,
      method: "post",
    });
  }

  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request<T>({
      ...config,
      url,
      data,
      method: "put",
    });
  }

  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.request<T>({
      ...config,
      url,
      method: "patch",
    });
  }
}
