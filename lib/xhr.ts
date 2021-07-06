import { parseResponseHeaders } from "./helpers/header";
import { AxiosRequestConfig, AxiosResponse } from "./types";

export function xhr(config: AxiosRequestConfig): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    const { data = null, method, url, headers = {}, responseType } = config;
    const request = new XMLHttpRequest();
    if (responseType != null) {
      request.responseType = responseType;
    }
    const normalizedMethod = method.toUpperCase();
    request.open(normalizedMethod, url, true);
    Object.keys(headers).forEach((name) => {
      request.setRequestHeader(name, headers[name]);
    });
    request.send(data);
    request.addEventListener("load", () => {
      if (request.status >= 200 && request.status < 300) {
        const responseHeaders = parseResponseHeaders(request);
        // todo: handle response data according to responseType
        resolve({
          status: request.status,
          statusText: request.statusText,
          data: request.response,
          headers: responseHeaders,
          config,
          request,
        });
      } else {
        reject("err");
      }
    });
    request.addEventListener("error", (e) => {
      reject(e);
    });
  });
}
