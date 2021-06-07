import { AxiosConfig } from "./types";
import { xhr } from "./xhr";

function axios(config: AxiosConfig): void {
  xhr(config).then((res) => {
    console.log("res", res);
  });
}

export default axios;
