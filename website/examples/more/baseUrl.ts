import axios from "../../../lib";

const instance = axios.create({ baseURL: "http://localhost:3000" });

instance.get("more/get").then((res) => {
  console.log("baseUrl res", res);
});
