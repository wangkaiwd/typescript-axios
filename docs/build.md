## build

* refer to [rollup-typescript](https://gist.github.com/aleclarson/9900ed2a9a3119d865286b218e14d226)

### operate step with rollup

#### Feature

* support typescript
* generate different format bundle

#### Install

1. Run this in your terminal:

```shell
npm i typescript rollup rollup-plugin-typescript2 tslib -D
```

2. Ensure your `package.json` contains these values(and replace `my-lib` part):

```json
{
  "main": "build/my-lib.cjs.js",
  "module": "build/my-lib.es.js",
  "types": "build/my-lib/types/index.d.ts",
  "scripts": {
    "build": "rollup -c rollup.config.ts"
  }
}
```

3. Create `rollup.config.ts` under project root directory

```typescript
import typescript from "rollup-plugin-typescript2";

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
  plugins: [typescript({ useTsconfigDeclarationDir: true })]
};
```

4. Ensure your `tsconfig.json` contain these values:

```json
{
  "target": "ES5",
  "declaration": true,
  "declarationDir": "build/types",
  "moduleResolution": "Node"
}
```

5. All done! Now execute `npm run build` in your terminal:

```shell
npm run build
```

### webpack

* [author library](https://webpack.js.org/guides/author-libraries/)

### rollup

* [Quick start](https://rollupjs.org/guide/en/#quick-start)
* [module field of package.json](https://stackoverflow.com/questions/42708484/what-is-the-module-package-json-field-for)
  * **read all information**
  * [pkg.module](https://github.com/rollup/rollup/wiki/pkg.module)
* [output.format](https://rollupjs.org/guide/en/#outputformat)

