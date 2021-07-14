import dispatchRequest from "./dispatchRequest";
import { AxiosPromise, AxiosRequestConfig } from "../types";

export default class Axios {
  request(
    url: string | AxiosRequestConfig,
    config?: AxiosRequestConfig
  ): AxiosPromise {
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

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.request({
      ...config,
      url,
      method: "get",
    });
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.request({
      ...config,
      url,
      method: "delete",
    });
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.request({
      ...config,
      url,
      method: "head",
    });
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.request({
      ...config,
      url,
      method: "options",
    });
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.request({
      ...config,
      url,
      data,
      method: "post",
    });
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.request({
      ...config,
      url,
      data,
      method: "put",
    });
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.request({
      ...config,
      url,
      method: "patch",
    });
  }
}
