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

function registerSimpleRoute() {
  app.get("/simple/get", (req, res) => {
    res.json({
      msg: "Hello World!",
    });
  });
}

function registerBaseRoute() {
  app.get("/base/get", (req, res) => {
    res.json(req.query);
  });

  app.post("/base/post", (req, res) => {
    res.json(req.body);
  });
  app.post("/base/buffer", (req, res) => {
    const message = [];
    req.on("data", (chunk) => {
      message.push(chunk);
    });
    req.on("end", () => {
      const buffer = Buffer.concat(message);
      // buffer.toString
      // buffer.toJSON
      res.json(buffer.toJSON());
    });
  });
}

function registerErrorRoute() {
  app.get("/error/get", (req, res) => {
    if (Math.random() > 0.5) {
      res.json({
        msg: "hello world",
      });
    } else {
      res.status(500);
      res.end();
    }
  });
  app.get("/error/timeout", (req, res) => {
    setTimeout(() => {
      res.json({
        msg: "Hello World!",
      });
    }, 3000);
  });
}

function registerExtendRoute() {
  app.post("/extend/post").then((req, res) => {
    res.json({
      msg: "extend post",
      result: req.body,
    });
  });

  app.get("/extend/get").then((req, res) => {
    res.json({
      msg: "extend get",
      result: req.query,
    });
  });
}

registerSimpleRoute();
registerBaseRoute();
registerErrorRoute();
registerExtendRoute();
// Serve the files on port 3000.
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!\n`);
});
