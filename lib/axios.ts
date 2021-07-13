import Axios from "./core/Axios";
import { extend } from "./helpers/extend";
import { AxiosInstance } from "./types";

function createInstance(): AxiosInstance {
  const context = new Axios();
  const instance = context.request.bind(context);
  return extend(instance, Axios.prototype);
}

const axios = createInstance();
export default axios;
