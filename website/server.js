const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");

const PORT = 3000;
const app = express();
const config = require("./webpack.config");

const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler));
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/simple/get", (req, res) => {
  res.json({
    msg: "Hello World!",
  });
});

app.get("/base/get", (req, res) => {
  res.json(req.query);
});

app.get("/base/post", (req, res) => {
  res.json({
    msg: "post response",
  });
});

// Serve the files on port 3000.
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!\n`);
});
