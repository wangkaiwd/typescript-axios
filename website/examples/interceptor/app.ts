import axios from "../../../lib";

let test = 1;

axios.interceptors.request.use((config) => {
  test += 1;
  return config;
});

axios.interceptors.request.use((config) => {
  test += 1;
  config.headers = config.headers ?? {};
  if (config.headers) {
    config.headers.test = test;
  }
  return config;
});

axios.interceptors.response.use((res) => {
  test -= 1;
  return res;
});
axios.interceptors.response.use((res) => {
  test -= 1;
  return res;
});

axios.post("/interceptor/demo").then((res) => {
  console.log("res", res);
});
