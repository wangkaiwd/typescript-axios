import typescript from "rollup-plugin-typescript2";

const pkg = require("./package.json");

export default {
  input: `lib/index.ts`,
  output: [
    {
      file: pkg.main,
      exports: "auto",
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "es",
    },
    {
      file: "build/axios.global.js",
      name: "Axios",
      format: "iife",
    },
  ],
  plugins: [typescript({ useTsconfigDeclarationDir: true })],
};
