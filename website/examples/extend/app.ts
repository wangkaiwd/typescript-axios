import axios from "../../../lib";

interface TestData {
  msg: string;
  result?: string;
}

axios("/extend/post", { method: "post" }).then((res) => {
  console.log("overload axios", res);
});
axios<TestData>({
  // support generic
  url: "/extend/post",
  method: "post",
  data: {
    msg: "hi",
  },
}).then((res) => {
  console.log("res", res.data);
  console.log("aixos", res);
});

// axios
//   .request({
//     url: "/extend/post",
//     method: "post",
//     data: {
//       msg: "hello",
//     },
//   })
//   .then((res) => {
//     console.log("request", res);
//   });

axios.get("/extend/get").then((res) => {
  console.log("get", res);
});

axios.head("/extend/head").then((res) => {
  console.log("head", res);
});

axios.post("/extend/post", { requestMethod: "post" }).then((res) => {
  console.log("post", res);
});

axios.delete("/extend/delete").then((res) => {
  console.log("delete", res);
});

axios.options("/extend/options").then((res) => {
  console.log("options", res);
});

axios.put("/extend/put", { requestMethod: "put" }).then((res) => {
  console.log("put", res);
});

axios.patch("/extend/patch", { requestMethod: "patch" }).then((res) => {
  console.log("patch", res);
});
