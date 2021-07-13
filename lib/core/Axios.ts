import dispatchRequest from "./dispatchRequest";
import { AxiosPromise, AxiosRequestConfig } from "../types";

export default class Axios {
  request(config: AxiosRequestConfig): AxiosPromise {
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
