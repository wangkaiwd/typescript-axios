import axios from "../../../lib";

axios({
  url: "/extend/post",
  method: "post",
  data: {
    msg: "hi",
  },
}).then((res) => {
  console.log("aixos", res);
});

axios
  .request({
    url: "/extend/post",
    method: "post",
    data: {
      msg: "hello",
    },
  })
  .then((res) => {
    console.log("request", res);
  });

axios.get("/extend/get").then((res) => {
  console.log("get", res);
});

axios.post("/extend/post", { requestMethod: "post" }).then((res) => {
  console.log("post", res);
});
