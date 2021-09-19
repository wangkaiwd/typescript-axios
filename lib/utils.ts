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

export function isFormData(val: any): boolean {
  return val instanceof FormData;
}
