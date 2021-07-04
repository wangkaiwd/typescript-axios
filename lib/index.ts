import { transformRequest } from "./helpers/data";
import { AxiosConfig, AxiosResponse } from "./types";
import buildUrl from "./helpers/url";
import { xhr } from "./xhr";

function processConfig(config: AxiosConfig): void {
  const { url, params, data } = config;
  config.url = buildUrl(url, params);
  config.data = transformRequest(data);
}

function axios(config: AxiosConfig): Promise<AxiosResponse> {
  processConfig(config);
  return xhr(config);
}

export default axios;
