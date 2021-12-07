import { isPlainObject } from "./utils";

// send body parameter not support object, need transform it to string
export function transformRequest(data: any) {
  if (isPlainObject(data)) {
    return JSON.stringify(data);
  }
  return data;
}

export function transformResponseData(data: any) {
  try {
    data = JSON.parse(data);
  } catch (e) {}
  return data;
}
