const path = require("path");
const fs = require("fs");

const genEntries = () => {
  const examplesPath = path.resolve(__dirname, "examples");
  const dirs = fs.readdirSync(examplesPath);
  return dirs.reduce((entries, dir) => {
    entries[dir] = path.resolve(examplesPath, dir, "app.ts");
    return entries;
  }, {});
};
module.exports = {
  mode: "development",
  context: path.resolve(__dirname),
  entry: genEntries(),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  cache: {
    type: "filesystem",
  },
  resolve: {
    extensions: [".js", ".ts", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
