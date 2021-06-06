import { AxiosConfig } from "./types/index";
import { xhr } from "./xhr";

function axios(config: AxiosConfig): void {
  xhr(config);
}

export default axios;
