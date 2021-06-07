import { AxiosConfig } from "./types";

export function xhr(config: AxiosConfig) {
  return new Promise((resolve, reject) => {
    const { data = null, method, url } = config;
    const request = new XMLHttpRequest();
    request.open(method, url, true);
    request.send(data);
    request.addEventListener("load", () => {
      if (request.status >= 200 && request.status < 300) {
        resolve(request.response);
      }
    });
    request.addEventListener("error", (e) => {
      reject(e);
    });
  });
}
