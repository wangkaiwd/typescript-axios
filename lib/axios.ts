import Cancel, { isCancel } from "./cancel/Cancel";
import CancelToken from "./cancel/CancelToken";
import Axios from "./core/Axios";
import { mergeConfig } from "./core/mergeConfig";
import defaults from "./default";
import { extend } from "./helpers/extend";
import { AxiosRequestConfig, AxiosStatic } from "./types";

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config);
  const instance = context.request.bind(context);
  // use type assert: after extend instance type is not explicit
  // https://stackoverflow.com/questions/30881632/es6-iterate-over-class-methods
  extend(instance, context);
  extend(instance, Axios.prototype);
  return instance as AxiosStatic;
}

const axios = createInstance(defaults);
axios.create = function (config = {}) {
  return createInstance(mergeConfig(defaults, config));
};

axios.CancelToken = CancelToken;
axios.isCancel = isCancel;
axios.Cancel = Cancel;
axios.all = function (promises) {
  return Promise.all(promises);
};
axios.spread = function (cb) {
  return function wrap(responses) {
    return cb(...responses);
  };
};

export default axios;
