const toString = Object.prototype.toString;

export function isPlainObject(value: any): value is object {
  return toString.call(value) === "[object Object]";
}
