// merge arbitrary objects to one
// {a:1,b:2}, {x:1,y:2}, {a:2,x:2} => {a:2,b:2,x:2,y:2}

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

export function deepMerge(...objs: any[]): any {
  const result: any = {};
  objs.forEach((obj) => {
    if (!isPlainObject(obj)) {
      return;
    }
    Object.keys(obj).forEach((key) => {
      if (isPlainObject((obj as any)[key])) {
        // recursive deep merge
        result[key] = deepMerge(result[key], (obj as any)[key]);
      } else {
        result[key] = (obj as any)[key];
      }
    });
  });
  return result;
}
