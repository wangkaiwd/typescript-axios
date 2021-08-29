import { createError } from "../helpers/error";
import { parseResponseHeaders } from "../helpers/header";
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "../types";

export function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      method = "GET",
      url,
      headers = {},
      timeout,
      responseType,
      cancelToken,
    } = config;
    const request = new XMLHttpRequest();
    if (responseType != null) {
      request.responseType = responseType;
    }
    const normalizedMethod = method.toUpperCase();
    request.open(normalizedMethod, url!, true);
    if (timeout) {
      request.timeout = timeout;
    }
    Object.keys(headers).forEach((name) => {
      request.setRequestHeader(name, headers[name]);
    });
    request.send(data);

    if (cancelToken) {
      cancelToken.promise.then((reason: string) => {
        request.abort();
        reject(
          createError({
            request,
            config,
            message: reason,
          })
        );
      });
    }

    function handleResponse(response: AxiosResponse) {
      if (request.status >= 200 && request.status < 300) {
        resolve(response);
      } else {
        reject(
          createError({
            request,
            response,
            config,
            message: `Request failed with status code ${response.status}`,
          })
        );
      }
    }

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
      handleResponse(response);
    });
    request.addEventListener("error", () => {
      reject(
        createError({
          request,
          config,
          message: "Network Error",
        })
      );
    });
    request.addEventListener("timeout", () => {
      reject(
        createError({
          request,
          config,
          code: "ECONNABORTED",
          message: `Timeout of ${timeout} ms exceeded`,
        })
      );
    });
  });
}
