import { AxiosRequestConfig } from '../types';
import { deepMerge } from '../helpers/utils';

type IStrategies = {
  [K in keyof AxiosRequestConfig]: (...args: any[]) => any;
};

const strategies: IStrategies = {};

const fromVal2Keys = ['url', 'params', 'data'];
const deepMergeKeys = ['headers'];

function deepMergeStrategy (val1: any, val2: any): object {
  if (!val2) { // not pass custom config will use default global config
    return val1;
  }
  return deepMerge(val1, val2);
}

function fromVal2Strategy (val1: any, val2: any): any {
  return val2;
}

function defaultStrategy (val1: any, val2: any): any {
  return val2 == null ? val1 : val2;
}

fromVal2Keys.forEach((key) => {
  strategies[key] = fromVal2Strategy;
});

deepMergeKeys.forEach((key) => {
  strategies[key] = deepMergeStrategy;
});

// use strategy pattern
export function mergeConfig (
  config1: AxiosRequestConfig,
  config2: AxiosRequestConfig
): AxiosRequestConfig {

  const result: AxiosRequestConfig = {};

  function mergeField (key: string) {
    const strategy = strategies[key] ?? defaultStrategy;
    return strategy(config1[key], config2[key]);
  }

  Object.keys(config1).forEach((key) => {
    // exist in both config1 and config2, and only in config1
    result[key] = mergeField(key);
  });

  Object.keys(config2).forEach((key) => {
    // only in config2
    if (!config1[key]) { // feature of in operator the same as get value in object with except of undefined,null,''
      result[key] = mergeField(key);
    }
  });
  return result;
}
