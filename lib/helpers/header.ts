import { isPlainObject } from "../utils";
import { IHeaders } from "../types";

function normalizeHeadersName(headers: any) {
  if (!headers) {
    return;
  }
  Object.keys(headers).forEach((name) => {
    const names = name.split("-").map((part) => part.toUpperCase());
    const newName = names.join("-");
    headers[newName] = headers[name];
    delete headers[name];
  });
}

export function processHeaders(headers: any, data: any): IHeaders | undefined {
  normalizeHeadersName(headers);
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

export function parseResponseHeaders(request: XMLHttpRequest): IHeaders {
  const responseStr = request.getAllResponseHeaders();
  const array = responseStr.split("\r\n");
  return array.reduce((memo: IHeaders, item) => {
    if (item) {
      const [key, val] = item.split(": ");
      memo[key] = val;
    }
    return memo;
  }, {});
}
