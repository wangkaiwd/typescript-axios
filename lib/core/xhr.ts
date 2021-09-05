import { createError } from "../helpers/error";
import { parseResponseHeaders } from "../helpers/header";
import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  CancelInstance,
} from "../types";

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
      withCredentials,
    } = config;
    const request = new XMLHttpRequest();
    if (cancelToken) {
      cancelToken.throwIfRequested();
      cancelToken.promise.then((reason: CancelInstance) => {
        request.abort();
        reject(reason);
      });
    }
    if (responseType != null) {
      request.responseType = responseType;
    }
    const normalizedMethod = method.toUpperCase();
    request.open(normalizedMethod, url!, true);
    if (withCredentials) {
      // default is false
      request.withCredentials = withCredentials;
    }
    if (timeout) {
      request.timeout = timeout;
    }
    Object.keys(headers).forEach((name) => {
      request.setRequestHeader(name, headers[name]);
    });
    request.send(data);

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
