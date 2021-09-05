const express = require("express");

const app = express();
const PORT = 3001;
const whiteList = ["http://localhost:3000"];

function cors(req, res, next) {
  const origin = req.get("origin");
  if (origin && whiteList.includes(origin)) {
    res.set({
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Max-Age": 259200,
    });
  }
  next();
}

app.use(cors);
app.get("/more/credentials", (req, res) => {
  res.json({
    message: "hello cors",
  });
});

app.listen(PORT, () => {
  console.log(`server is listening in port ${PORT}`);
});
