import Axios from './core/Axios';
import defaults from './default';
import { extend } from './helpers/extend';
import { AxiosRequestConfig, AxiosStatic } from './types';
import { mergeConfig } from './core/mergeConfig';

function createInstance (config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config);
  const instance = context.request.bind(context);
  // use type assert
  return extend(instance, context) as AxiosStatic;
}

const axios = createInstance(defaults);
axios.create = function (config) {
  return createInstance(mergeConfig(defaults, config));
};
export default axios;
