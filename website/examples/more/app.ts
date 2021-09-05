import axios from "../../../lib";

axios
  .get("http://localhost:3001/more/credentials", { withCredentials: true })
  .then((res) => {
    console.log("res", res);
  });

axios
  .get("http://localhost:3001/more/credentials", { withCredentials: false })
  .then((res) => {
    console.log("res", res);
  });
