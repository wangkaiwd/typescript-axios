module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "import/no-extraneous-dependencies": 0,
    "no-param-reassign": 0,
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        mjs: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "no-empty": ["error", { allowEmptyCatch: true }],
    "import/prefer-default-export": 0,
    "prefer-destructuring": 0,
    "no-shadow": 0,
    "prefer-promise-reject-errors": 0,
  },
  settings: {
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "import/resolver": {
      node: {
        extensions: [".js", ".ts"],
      },
    },
  },
};
