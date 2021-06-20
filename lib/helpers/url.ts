import { isPlainObject } from "../utils";

function buildUrl(url: string, params?: object): string {
  if (!params) {
    return url;
  }

  function joinParams(params: object) {
    return Object.entries(params).reduce((memo, [key, val], i, array) => {
      if (val instanceof Date) {
        val = val.toISOString();
        memo += `${key}=${val}`;
      } else if (Array.isArray(val)) {
        // todo: how to handle format of array ? would to recursive item?
        // val.forEach((item) => {
        //
        // });
      } else if (isPlainObject(val)) {
        val = encodeURIComponent(JSON.stringify(val));
        memo += `${key}=${val}`;
      }
      if (i !== array.length - 1) {
        memo += "&";
      }
      return memo;
    }, "");
  }

  return `${url}?${joinParams(params)}`;
}

export default buildUrl;
