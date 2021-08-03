import dispatchRequest from "./dispatchRequest";
import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  RejectedFn,
  ResolvedFn,
} from "../types";
import AxiosInterceptorManager from "./InterceptorManager";
import { mergeConfig } from "./mergeConfig";

interface PromiseChain {
  resolved: ResolvedFn | ((config: AxiosRequestConfig) => AxiosPromise);
  rejected?: RejectedFn;
}

interface Interceptors {
  request: AxiosInterceptorManager<AxiosRequestConfig>;
  response: AxiosInterceptorManager<AxiosResponse>;
}

export default class Axios {
  interceptors: Interceptors;

  defaults: AxiosRequestConfig;

  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig;
    this.interceptors = {
      request: new AxiosInterceptorManager<AxiosRequestConfig>(),
      response: new AxiosInterceptorManager<AxiosResponse>(),
    };
  }

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
    const chains: PromiseChain[] = [];
    const reqInterceptors = this.interceptors.request.interceptors;
    const resInterceptors = this.interceptors.response.interceptors;
    for (let i = 0; i < reqInterceptors.length; i++) {
      const { resolvedFn, rejectedFn } = reqInterceptors[i]!;
      chains.push({
        resolved: resolvedFn,
        rejected: rejectedFn,
      });
    }
    chains.push({
      resolved: dispatchRequest,
      rejected: undefined,
    });
    for (let i = 0; i < resInterceptors.length; i++) {
      const { resolvedFn, rejectedFn } = resInterceptors[i]!;
      chains.push({
        resolved: resolvedFn,
        rejected: rejectedFn,
      });
    }
    let p = Promise.resolve(mergeConfig(this.defaults, config));
    chains.forEach((chain) => {
      const { resolved, rejected } = chain;
      // think difference with:  p.then(resolved,rejected); return p
      p = p.then(resolved, rejected);
    });
    // todo: How to optimize this force type transform?
    return p as AxiosPromise<T>;
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
