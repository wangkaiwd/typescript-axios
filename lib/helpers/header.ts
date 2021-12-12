import { IHeaders, Methods } from "../types";
import { deepMerge, isFormData, isPlainObject } from "./utils";

function normalizeHeadersName(headers: any, normalizedName: "Content-Type") {
  if (!headers) {
    return;
  }
  Object.keys(headers).forEach((name) => {
    if (
      name !== normalizedName &&
      name.toUpperCase() === normalizedName.toUpperCase()
    ) {
      headers[normalizedName] = headers[name];
      delete headers[name];
    }
  });
}

export function processHeaders(headers: any, data: any): IHeaders {
  normalizeHeadersName(headers, "Content-Type");
  if (isFormData(data)) {
    delete headers["Content-Type"];
  }
  if (!headers) {
    headers = {};
  }
  if (isPlainObject(data)) {
    // headers default is empty object ?
    if (!headers["Content-Type"]) {
      // If headers not have Content-Type property, set it to application/json
      headers["Content-Type"] = "application/json; charset=utf-8";
    }
  }
  return headers;
}

export function parseResponseHeaders(headers: string): IHeaders {
  const array = headers.split("\r\n");
  return array.reduce((memo: IHeaders, item) => {
    if (item) {
      const [key, ...val] = item.split(":");
      const normalizedKey = key.trim().toLocaleLowerCase();
      if (normalizedKey) {
        memo[normalizedKey] = val.join(":").trim();
      }
    }
    return memo;
  }, {});
}

// common: all
// method verb: supply specific http request
export function flattenHeaders(headers: IHeaders, method: Methods) {
  const { common = {} } = headers;
  // return a new object
  headers = deepMerge(common, headers[method] || {}, headers);
  const methodsToDelete = [
    "get",
    "post",
    "option",
    "delete",
    "put",
    "patch",
    "head",
    "common",
  ];
  methodsToDelete.forEach((method) => {
    delete headers[method];
  });
  return headers;
}
