import { isPlainObject } from "../utils";

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

export function processHeaders(headers: any, data: any) {
  normalizeHeadersName(headers);
  if (isPlainObject(data)) {
    // headers default is empty object ?
    if (headers && !headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }
  }
}
