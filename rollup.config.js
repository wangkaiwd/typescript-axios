import resolve from "@rollup/plugin-node-resolve";
import ts from "rollup-plugin-typescript2";
import path from "path";
import pkg from "./package.json";

export default {
  input: `lib/index.ts`,
  // foremost
  output: [
    {
      file: path.resolve(__dirname, pkg.main),
      exports: "auto",
      format: "cjs",
    },
    {
      file: path.resolve(__dirname, pkg.module),
      format: "es",
    },
    {
      file: path.resolve(__dirname, "build/axios.browser.js"),
      name: "axios",
      format: "iife",
    },
  ],
  // need watch ?
  watch: {
    include: "lib/**/*",
  },
  plugins: [resolve(), ts({ useTsconfigDeclarationDir: true })],
};
