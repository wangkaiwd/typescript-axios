import { AxiosRequestConfig } from "../types";
import { isObject } from "../utils";

type IStrategies = {
  [K in keyof AxiosRequestConfig]: (...args: any[]) => any;
};

const strategies: IStrategies = {};

const fromVal2Keys = ["url", "params", "data"];
const deepMergeKeys = ["headers"];

function deepMergeStrategy(val1: any, val2: any): object {
  const result: any = {};
  Object.keys(val1).forEach((key) => {
    const val1Element = val1[key];
    const val2Element = val2[key];
    if (key in val2) {
      if (isObject(val1Element) && isObject(val2Element)) {
        result[key] = deepMergeStrategy(val1Element, val2Element);
      } else {
        result[key] = val2Element;
      }
    } else {
      result[key] = val1Element;
    }
  });
  Object.keys(val2).forEach((key) => {
    if (!(key in val1)) {
      result[key] = val2[key];
    }
  });
  return result;
}

function strategyFromVal2(val1: any, val2: any): any {
  return val2;
}

function defaultStrategy(val1: any, val2: any): any {
  return val2 == null ? val1 : val2;
}

fromVal2Keys.forEach((key) => {
  strategies[key] = strategyFromVal2;
});

deepMergeKeys.forEach((key) => {
  strategies[key] = deepMergeStrategy;
});

function mergeField(config1: any, config2: any, key: string) {
  const strategy = strategies[key] ?? defaultStrategy;
  return strategy(config1[key], config2[key]);
}

// use strategy pattern
export function mergeConfig(
  config1: AxiosRequestConfig,
  config2: AxiosRequestConfig
): AxiosRequestConfig {
  const result: AxiosRequestConfig = {};
  Object.keys(config1).forEach((key) => {
    // exist in both config and only in config1
    result[key] = mergeField(config1, config2, key);
  });

  Object.keys(config2).forEach((key) => {
    // only in config2
    if (!(key in config1)) {
      result[key] = mergeField(config1, config2, key);
    }
  });
  return result;
}
