import axios, { IAxiosError } from "../../../lib";

axios({ url: "/error/get", method: "get" })
  .then((res) => {
    console.log("res", res);
  })
  .catch((reason) => {
    console.log("reason", reason);
  });

axios({ url: "/error/timeout", method: "get", timeout: 1000 })
  .then((res) => {
    console.log("res2", res);
  })
  .catch((reason) => {
    console.log("reason2", reason);
  });
setTimeout(() => {
  axios({ url: "/error/network", method: "get" })
    .then((res) => {
      console.log("res3", res);
    })
    .catch((reason: IAxiosError) => {
      console.log("network error", reason);
    });
}, 5000);
