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
  if (isPlainObject(data)) {
    // headers default is empty object ?
    if (headers && !headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }
  }
  return headers;
}
