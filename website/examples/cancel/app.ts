import axios from "../../../lib";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

// let cancel: Canceler;
// const cancelToken = new CancelToken((c) => {
//   cancel = c;
// });

console.log("cancel");

axios
  .get("/cancel/get", {
    // cancelToken: source.token,
  })
  .then((res) => {
    console.log("cancel1", res);
  })
  .catch((reason) => {
    if (axios.isCancel(reason)) {
      console.log("cancel1-reason", reason, axios.isCancel(reason));
    }
  });

// setTimeout(() => {
// source.cancel("11");
// }, 200);

axios
  .get("cancel/get", {
    // token is CancelToken instance
    cancelToken: source.token,
  })
  .then((res) => {
    console.log(res);
  })
  .catch((reason) => {
    console.log("cancel2", reason);
  });

setTimeout(() => {
  source.cancel("22");
}, 100);
