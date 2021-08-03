// merge arbitrary objects to one
// {a:1,b:2}, {x:1,y:2}, {a:2,x:2} => {a:2,b:2,x:2,y:2}

import { isPlainObject } from '../utils';

export function deepMerge (...objs: any[]): any {
  const result: any = {};
  objs.forEach((obj) => {
    if (!isPlainObject(obj)) {
      return;
    }
    Object.keys(obj).forEach(key => {
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
