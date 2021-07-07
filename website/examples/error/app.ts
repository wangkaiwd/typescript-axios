import axios from "../../../lib";

axios({ url: "/error/get", method: "get" })
  .then((res) => {
    console.log("res", res);
  })
  .catch((reason) => {
    console.log("reason", reason);
  });

axios({ url: "/error/timeout", method: "get" })
  .then((res) => {
    console.log("res2", res);
  })
  .catch((reason) => {
    console.log("reason2", reason);
  });
