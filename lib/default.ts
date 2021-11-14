import { AxiosRequestConfig } from "./types";
import { processHeaders } from "./helpers/header";
import { transformRequest, transformResponseData } from "./helpers/data";
// axios global config
const defaults: AxiosRequestConfig = {
  method: "GET",
  timeout: 0,
  headers: {},
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
  validateStatus(status: number) {
    return status >= 200 && status <= 299;
  },
};

const methodsWithoutData = ["get", "delete", "head", "options"];

methodsWithoutData.forEach((method) => {
  defaults.headers![method] = {};
});

const methodsWithData = ["post", "put", "patch"];

methodsWithData.forEach((method) => {
  defaults.headers![method] = {};
});

export default defaults;
