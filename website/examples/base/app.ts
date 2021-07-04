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
