import { AxiosRequestConfig } from "../types";
import { isObject } from "../utils";

// const strategies: any = {};
//
// function defaultStrategy(val1: any, val2: any): any {
//   return val2 == null ? val1 : val2;
// }
//
// function deepMergeStrategy(val1: any, val2: any): any {
//   if (val1 == null) {
//     return val2;
//   }
//   if (val2 == null) {
//     return val1;
//   }
//   return deepMerge(val1, val2);
// }
//
// function mergeField(config1: any, config2: any, key: string) {
//   const strategy = strategies[key] ?? defaultStrategy;
//   return strategy(config1[key], config2[key]);
// }

// use strategy pattern
export function mergeConfig(
  config1: AxiosRequestConfig,
  config2: AxiosRequestConfig
): AxiosRequestConfig {
  const result: any = {};
  // all own and only config1 own
  for (const key in config1) {
    if (Object.prototype.hasOwnProperty.call(config1, key)) {
      if (key in config2) {
        if (isObject(config1[key])) {
          result[key] = mergeConfig(config1[key], config2[key]);
        } else {
          result[key] = config2[key];
        }
      } else {
        result[key] = config1[key];
      }
    }
  }
  // only config2 own
  for (const key in config2) {
    if (
      Object.prototype.hasOwnProperty.call(config2, key) &&
      !Object.prototype.hasOwnProperty.call(config1, key)
    ) {
      result[key] = config2[key];
    }
  }
  return result;
}
