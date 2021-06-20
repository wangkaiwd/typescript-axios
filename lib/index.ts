import { AxiosConfig, AxiosResponse } from "./types";
import buildUrl from "./helpers/url";
import { xhr } from "./xhr";

function axios(config: AxiosConfig): Promise<AxiosResponse> {
  const { url, params = {} } = config;
  config.url = buildUrl(url, params);
  return xhr(config);
}

export default axios;
