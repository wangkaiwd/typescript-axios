import Cancel, { isCancel } from "./cancel/cancel";
import CancelToken from "./cancel/CancelToken";
import Axios from "./core/Axios";
import defaults from "./default";
import { extend } from "./helpers/extend";
import { AxiosRequestConfig, AxiosStatic } from "./types";
import { mergeConfig } from "./core/mergeConfig";

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config);
  const instance = context.request.bind(context);
  // use type assert: after extend instance type is not explicit
  return extend(instance, context) as AxiosStatic;
}

const axios = createInstance(defaults);
axios.create = function (config) {
  return createInstance(mergeConfig(defaults, config));
};

axios.CancelToken = CancelToken;
axios.isCancel = isCancel;
axios.Cancel = Cancel;

export default axios;
