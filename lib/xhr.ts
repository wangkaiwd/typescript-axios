import { parseResponseHeaders } from "./helpers/header";
import { AxiosRequestConfig, AxiosResponse } from "./types";

export function xhr(config: AxiosRequestConfig): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      method,
      url,
      headers = {},
      timeout,
      responseType,
    } = config;
    const request = new XMLHttpRequest();
    if (responseType != null) {
      request.responseType = responseType;
    }
    const normalizedMethod = method.toUpperCase();
    request.open(normalizedMethod, url, true);
    if (timeout) {
      request.timeout = timeout;
    }
    Object.keys(headers).forEach((name) => {
      request.setRequestHeader(name, headers[name]);
    });
    request.send(data);
    request.addEventListener("load", () => {
      const responseHeaders = parseResponseHeaders(request);
      const response = {
        status: request.status,
        statusText: request.statusText,
        data: request.response,
        headers: responseHeaders,
        config,
        request,
      };
      if (request.status >= 200 && request.status < 300) {
        resolve(response);
      } else {
        reject(new Error(`Request failed with status code ${response.status}`));
      }
    });
    request.addEventListener("error", () => {
      reject(new Error("Network Error"));
    });
    request.addEventListener("timeout", () => {
      reject(new Error(`Timeout of ${timeout} ms exceeded`));
    });
  });
}
