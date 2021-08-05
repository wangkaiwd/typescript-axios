import { AxiosTransformer } from '../types';

// last function in array will be pass to xhr.send(), so it must be satisfy body type(Document or XMLHttpRequestBodyInit)

/**
 * @param data request or response data
 * @param headers
 * @param fns
 */
export function transform (data: any, headers: any, fns?: AxiosTransformer | AxiosTransformer[]): any {
  if (!fns) {
    return data;
  }
  if (!Array.isArray(fns)) {
    fns = [fns];
  }
  fns.forEach(fn => {
    data = fn(data, headers);
  });
  return data;
}