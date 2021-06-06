import { AxiosConfig } from "./types/index";

export function xhr(config: AxiosConfig) {
  const { data = null, method, url } = config;
  const request = new XMLHttpRequest();
  request.open(method, url, true);
  request.addEventListener("load", (e) => {
    console.log(e);
  });
  request.send(data);
}
