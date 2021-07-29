import Axios from './core/Axios';
import defaults from './default';
import { extend } from './helpers/extend';
import { AxiosInstance, AxiosRequestConfig } from './types';

function createInstance (config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config);
  const instance = context.request.bind(context);
  return extend(instance, context);
}

const axios = createInstance(defaults);
export default axios;
