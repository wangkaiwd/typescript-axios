import axios from "../../../lib";

axios
  .post(
    "/more/auth",
    { a: 1 },
    { auth: { username: "ppk1", password: "123456" } }
  )
  .then((res) => {
    console.log("res", res);
  })
  .catch((err) => {
    console.log("err:", err.message);
  });
