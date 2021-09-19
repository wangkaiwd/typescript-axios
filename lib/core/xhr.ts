import cookie from "../helpers/cookie";
import { createError } from "../helpers/error";
import { parseResponseHeaders } from "../helpers/header";
import { isURLSameOrigin } from "../helpers/url";
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
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
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
    if (onDownloadProgress) {
      request.addEventListener(
        "progress",
        (e: ProgressEvent<XMLHttpRequestEventTarget>) => {
          onDownloadProgress(e);
        }
      );
    }
    if (onUploadProgress) {
      request.upload.addEventListener(
        "progress",
        (e: ProgressEvent<XMLHttpRequestEventTarget>) => {
          onUploadProgress(e);
        }
      );
    }
    const normalizedMethod = method.toUpperCase();
    request.open(normalizedMethod, url!, true);
    if (withCredentials) {
      // default is false
      request.withCredentials = withCredentials;
    }
    // xsrf
    // request should be made using credentials such as cookie
    // or same origin request
    if (withCredentials || isURLSameOrigin(url!)) {
      const xsrfValue = cookie.read(xsrfCookieName!);
      if (xsrfValue && xsrfHeaderName) {
        headers[xsrfHeaderName] = xsrfValue;
      }
    }
    if (timeout) {
      request.timeout = timeout;
    }
    console.log("headers", headers, config);
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
