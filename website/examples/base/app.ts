import axios from "../../../lib";

axios({
  url: "/base/get",
  method: "get",
  params: {
    a: { x: 2 },
    b: [1, 2, 3],
  },
}).then(() => {});

axios({
  url: "/base/post",
  method: "post",
  data: {
    foo: { bar: 1 },
  },
}).then(null);

const arr = new Int32Array([21, 31]);
axios({
  url: "/base/buffer",
  method: "post",
  data: arr,
}).then(null);

// post URLSearchParams will automatic set request header Content-Type: application/x-www-form-urlencoded;charset=UTF-8
const paramsString = "q=URLUtils.searchParams&topic=api";
const searchParams = new URLSearchParams(paramsString);

axios({
  url: "/base/post",
  method: "post",
  data: searchParams,
}).then(null);
