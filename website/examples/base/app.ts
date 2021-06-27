import axios from "../../../lib";

axios({
  url: "/base/get",
  method: "get",
  params: {
    a: { x: 2 },
    b: [1, 2, 3],
  },
}).then(() => {});
