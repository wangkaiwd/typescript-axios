import axios from "../../../lib";

axios({
  url: "/base/get",
  method: "get",
  params: { a: 1, b: 2 },
}).then((result) => {
  console.log(result);
});
