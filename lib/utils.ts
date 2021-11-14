const toString = Object.prototype.toString;

export function isPlainObject(value: any): value is object {
  return toString.call(value) === "[object Object]";
}

export function isObject(value: any): value is object {
  return typeof value === "object" && value !== null;
}

export function isUndefined(value: any): value is undefined {
  return typeof value === "undefined";
}

export function isFormData(value: any): value is FormData {
  return value instanceof FormData;
}

export function isURLSearchParams(value: any): value is URLSearchParams {
  return value instanceof URLSearchParams;
}
