import { processHeaders } from "./helpers/header";
import { AxiosConfig, AxiosResponse } from "./types";

export function xhr(config: AxiosConfig): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    const { data = null, method, url, headers } = config;
    const request = new XMLHttpRequest();
    const normalizedMethod = method.toUpperCase();
    request.open(normalizedMethod, url, true);
    processHeaders(headers, data);
    request.send(data);
    request.addEventListener("load", () => {
      if (request.status >= 200 && request.status < 300) {
        resolve({
          status: request.status,
          statusText: request.statusText,
          data: request.response,
          request,
        });
      }
    });
    request.addEventListener("error", (e) => {
      reject(e);
    });
  });
}
