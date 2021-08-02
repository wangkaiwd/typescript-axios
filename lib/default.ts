import { AxiosRequestConfig } from "./types";
// axios global config
const defaults: AxiosRequestConfig = {
  method: "GET",
  timeout: 0,
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
    },
  },
};

// const methodsWithoutData = ["get", "delete", "head", "options"];
//
// methodsWithoutData.forEach((method) => {
//   defaults.headers![method] = {};
// });
//
// const methodsWithData = ["post", "put", "patch"];
//
// methodsWithData.forEach((method) => {
//   defaults.headers![method] = {
//     "Content-Type": "application/x-www-form-urlencoded",
//   };
// });

export default defaults;
