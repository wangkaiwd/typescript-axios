import { AxiosConfig, AxiosResponse } from "./types";
import buildUrl from "./helpers/url";
import { xhr } from "./xhr";

function processConfig(config: AxiosConfig): void {
  const { url, params = {} } = config;
  config.url = buildUrl(url, params);
}

function axios(config: AxiosConfig): Promise<AxiosResponse> {
  processConfig(config);
  return xhr(config);
}

export default axios;
