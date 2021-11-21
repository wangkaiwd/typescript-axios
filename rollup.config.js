import resolve from "@rollup/plugin-node-resolve";
import ts from "rollup-plugin-typescript2";
import path from "path";
import pkg from "./package.json";

export default {
  input: `lib/index.ts`,
  // foremost
  output: [
    // {
    //   file: path.resolve(__dirname, pkg.main),
    //   exports: "auto",
    //   format: "cjs",
    // },
    // {
    //   file: path.resolve(__dirname, pkg.module),
    //   format: "es",
    // },
    // {
    //   file: path.resolve(__dirname, "build/browser.js"),
    //   name: "axios",
    //   format: "iife",
    // },
    {
      file: path.resolve(__dirname, pkg.main),
      name: "axios",
      format: "umd",
    },
  ],
  // need watch ?
  watch: {
    include: "lib/**/*",
  },
  plugins: [resolve(), ts({ useTsconfigDeclarationDir: true })],
};
