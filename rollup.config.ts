import resolve from "@rollup/plugin-node-resolve";
import ts from "rollup-plugin-typescript2";

const pkg = require("./package.json");

export default {
  input: `lib/index.ts`,
  output: [
    {
      file: pkg.main,
      exports: "auto",
      format: "cjs"
    },
    {
      file: pkg.module,
      format: "es"
    },
    {
      file: "build/axios.browser.js",
      name: "axios",
      format: "iife"
    }
  ],
  plugins: [resolve(), ts({ useTsconfigDeclarationDir: true })]
};
