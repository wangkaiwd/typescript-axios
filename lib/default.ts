import { AxiosRequestConfig } from "./types";
import { processHeaders } from "./helpers/header";
import { transformRequest, transformResponseData } from "./helpers/data";
// axios global config
const defaults: AxiosRequestConfig = {
  method: "GET",
  timeout: 0,
  headers: {
    // can config for specific method, and will be flatten before send request
    common: {
      Accept: "application/json, text/plain, */*",
    },
  },
  withCredentials: false,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  transformRequest: [
    function (data, headers) {
      // process headers will change headers objects value reference
      processHeaders(headers, data);
      return transformRequest(data);
    },
  ],
  transformResponse: [
    function (data) {
      return transformResponseData(data);
    },
  ],
};

const methodsWithoutData = ["get", "delete", "head", "options"];

methodsWithoutData.forEach((method) => {
  defaults.headers![method] = {};
});

const methodsWithData = ["post", "put", "patch"];

methodsWithData.forEach((method) => {
  defaults.headers![method] = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
});

export default defaults;
