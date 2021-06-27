import { isPlainObject } from "../utils";

function encode(url: string): string {
  // transform compiled string to origin
  // https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
  // #, ? , / have special meaning in url, aside from these need to transform origin string
  return encodeURIComponent(url)
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]")
    .replace(/%40/gi, "@")
    .replace(/%3A/gi, ":")
    .replace(/%24/gi, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/gi, "+");
}

interface IResult {
  url: string;
  hash: string;
}

function handleHashAndQuestionMark(url: string): IResult {
  const hashIndex = url.indexOf("#");
  const questionMarkIndex = url.indexOf("?");
  let hash = "";
  if (hashIndex !== -1) {
    hash = url.slice(hashIndex);
    url = url.slice(0, hashIndex);
  }
  if (questionMarkIndex === -1) {
    url += "?";
  }
  return {
    url,
    hash,
  };
}

function joinParams(params: object) {
  const parts: string[] = [];
  Object.entries(params).forEach(([key, val]) => {
    let values: any[]; // tricks: make all conditions to an array to unified handle
    if (Array.isArray(val)) {
      values = val;
      key += `[]`;
    } else {
      values = [val];
    }
    values.forEach((val) => {
      if (isPlainObject(val)) {
        val = JSON.stringify(val);
      } else if (val instanceof Date) {
        val = val.toISOString();
      }
      parts.push(`${encode(key)}=${encode(val)}`);
    });
  });
  return parts.join("&");
}

function buildUrl(url: string, params?: object): string {
  if (!params) {
    return url;
  }

  const { url: newUrl, hash } = handleHashAndQuestionMark(url);
  return newUrl + joinParams(params) + hash;
}

export default buildUrl;
