import { AxiosConfig, AxiosResponse } from "./types";
import { xhr } from "./xhr";

function axios(config: AxiosConfig): Promise<AxiosResponse> {
  return xhr(config);
}

export default axios;
