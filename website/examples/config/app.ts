import axios from "../../../lib";

axios
  .post(
    "/config/post",
    { x: 1 },
    { headers: { b: 3, c: 4, common: { d: 5, a: { x: 2, y: 3 } } } }
  )
  .then((res) => {
    console.log("res", res);
  });
