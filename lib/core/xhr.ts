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
      auth,
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
    const normalizedMethod = method.toUpperCase();
    request.open(normalizedMethod, url!, true);

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

    function configureRequest() {
      if (responseType != null) {
        request.responseType = responseType;
      }
      if (withCredentials) {
        // default is false
        request.withCredentials = withCredentials;
      }
      if (timeout) {
        request.timeout = timeout;
      }
    }

    function bindEvents() {
      if (onDownloadProgress) {
        request.addEventListener("progress", onDownloadProgress);
      }
      if (onUploadProgress) {
        request.upload.addEventListener("progress", onUploadProgress);
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
    }

    function processHeader() {
      // xsrf
      // request should be made using credentials such as cookie
      // or same origin request
      if (withCredentials || isURLSameOrigin(url!)) {
        const xsrfValue = cookie.read(xsrfCookieName!);
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue;
        }
      }
      Object.keys(headers).forEach((name) => {
        request.setRequestHeader(name, headers[name]);
      });
      if (auth) {
        const basicAuthentication = `Basic ${btoa(
          `${auth.username}:${auth.password}`
        )}`;
        request.setRequestHeader("Authorization", basicAuthentication);
      }
    }

    function processCancel() {
      if (cancelToken) {
        cancelToken.throwIfRequested();
        cancelToken.promise.then((reason: CancelInstance) => {
          request.abort();
          reject(reason);
        });
      }
    }

    bindEvents();
    configureRequest();
    processHeader();
    processCancel();
    request.send(data);
  });
}
