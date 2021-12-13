import { flattenHeaders } from "../helpers/header";
import buildUrl, { combineUrl, isAbsoluteUrl } from "../helpers/url";
import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Methods,
} from "../types";
import { xhr } from "./xhr";
import { transform } from "./transform";

function processConfig(config: AxiosRequestConfig): void {
  // merge config
  const { params, data, headers, method, baseURL } = config;
  let { url = "" } = config;
  if (!isAbsoluteUrl(url) && baseURL) {
    url = combineUrl(baseURL, url);
  }
  config.method = method?.toLowerCase() as Methods;
  config.url = buildUrl(url, params);
  // why headers not as a return value and pass next function
  config.data = transform(data, headers, config.transformRequest);
  config.headers = flattenHeaders(headers!, method!);
}

// config: global instance scope
function transformResponse(response: AxiosResponse) {
  response.data = transform(
    response.data,
    response.headers,
    response.config.transformResponse
  );
}

function dispatchRequest<T = any>(config: AxiosRequestConfig): AxiosPromise<T> {
  processConfig(config);
  return xhr(config).then((response) => {
    transformResponse(response);
    return response;
  });
}

export default dispatchRequest;
