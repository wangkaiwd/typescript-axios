import { transformRequest, transformResponseData } from "../helpers/data";
import { processHeaders } from "../helpers/header";
import buildUrl from "../helpers/url";
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "../types";
import { xhr } from "./xhr";

function processConfig(config: AxiosRequestConfig): void {
  const { url = "", params, data, headers } = config;
  config.url = buildUrl(url, params);
  config.headers = processHeaders(headers, data);
  config.data = transformRequest(data);
}

function transformResponse(response: AxiosResponse) {
  response.data = transformResponseData(response.data);
}

function dispatchRequest<T = any>(config: AxiosRequestConfig): AxiosPromise<T> {
  processConfig(config);
  return xhr(config).then((response) => {
    transformResponse(response);
    return response;
  });
}

export default dispatchRequest;
