const express = require("express");
const webpack = require("webpack");
const multer = require("multer");
const webpackDevMiddleware = require("webpack-dev-middleware");
const path = require("path");
const fs = require("fs");
const config = require("./webpack.config");

const PORT = 3000;
const app = express();

const upload = multer({ dest: path.resolve(__dirname, "uploads/") });

const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler));
app.use(
  express.static(__dirname, {
    // index.html request source will set cookie by server, subsequent request will add cookie request header
    setHeaders(res) {
      res.cookie("test-cookie-name", "token123");
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const successResult = {
  message: "success",
  code: 0,
};

function atob(base64) {
  return Buffer.from(base64, "base64").toString("ascii");
}

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
  app.post("/extend/post", (req, res) => {
    res.json({
      msg: "extend post",
      result: req.body,
    });
  });

  app.get("/extend/get", (req, res) => {
    res.json({
      msg: "extend get",
      result: req.query,
    });
  });

  app.head("/extend/head", (req, res) => {
    res.json({
      msg: "extend head",
      result: req.query,
    });
  });

  app.delete("/extend/delete", (req, res) => {
    res.json({
      msg: "extend delete",
      result: req.body,
    });
  });

  app.options("/extend/options", (req, res) => {
    res.json({
      msg: "extend options",
      result: req.body,
    });
  });

  app.put("/extend/put", (req, res) => {
    res.json({
      msg: "extend put",
      result: req.body,
    });
  });

  app.patch("/extend/patch", (req, res) => {
    res.json({
      msg: "extend patch",
      result: req.body,
    });
  });
}

function registerInterceptorRoute() {
  app.post("/interceptor/demo", (req, res) => {
    res.json({
      msg: "hello",
    });
  });
}

function registerConfigRoute() {
  app.post("/config/post", (req, res) => {
    res.json({ message: "success" });
  });
}

function registerCancelRoute() {
  app.get("/cancel/get", (req, res) => {
    setTimeout(() => {
      res.json({ message: "success", code: 0 });
    }, 2000);
  });
}

function registerMoreRoute() {
  app.get("/more/get", (req, res) => {
    res.json(successResult);
  });
  app.post("/more/upload", upload.single("file"), (req, res) => {
    res.json({
      ...successResult,
      ...req.file,
    });
  });
  app.post("/more/download", (req, res) => {
    // download with stream
    const filePath = path.resolve(__dirname, "test-files/test-video.mov");
    fs.stat(filePath, (err, stats) => {
      if (!err) {
        const length = stats.size;
        const basename = path.basename(filePath);
        // Content-Disposition
        // Content-Type
        res.set("Content-Disposition", `attachment; filename=${basename}`);
        res.set("Content-Type", "video/quicktime");
        // must set content-length so that client progress event can get total file bytes count
        res.set("Content-length", String(length));
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
      }
    });
    // https://stackoverflow.com/questions/7288814/download-a-file-from-nodejs-server-using-express
    // res.download(filePath);
  });
  app.post("/more/auth", (req, res) => {
    const authorization = req.get("Authorization");
    const [type, credentials] = authorization.split(" ");
    const [username, password] = atob(credentials).split(":");
    if (type === "Basic" && username === "ppk" && password === "123456") {
      res.json(req.body);
    } else {
      res.status(401);
      res.end();
    }
  });
}

registerSimpleRoute();
registerBaseRoute();
registerErrorRoute();
registerExtendRoute();
registerInterceptorRoute();
registerConfigRoute();
registerCancelRoute();
registerMoreRoute();
// Serve the files on port 3000.
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!\n`);
});
