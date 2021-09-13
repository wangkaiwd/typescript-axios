import axios from "../../../lib";

document.cookie = "a=b; Max-Age=1000";

// axios
//   .get("http://localhost:3001/more/credentials", { withCredentials: true })
//   .then((res) => {
//     console.log("res", res);
//   });
//
// axios
//   .get("http://localhost:3001/more/credentials", { withCredentials: false })
//   .then((res) => {
//     console.log("res", res);
//   });

axios
  .get("/more/get", {
    xsrfCookieName: "test-cookie-name",
    xsrfHeaderName: "test-header-name",
  })
  .then((res) => {
    console.log(res);
  });
