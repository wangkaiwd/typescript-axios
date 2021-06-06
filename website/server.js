const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");

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
// Serve the files on port 3000.
app.listen(3000, () => {
  console.log("Example app listening on port 3000!\n");
});
