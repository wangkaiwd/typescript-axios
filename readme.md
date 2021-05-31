## 搭建项目
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

### 代码规范

安装`lint`

* [TSLint -> ESLint](https://github.com/palantir/tslint/issues/4534)
* [eslint](https://eslint.org/docs/user-guide/getting-started)
* [prettier](https://prettier.io/docs/en/install.html)
* [lint-staged](https://www.npmjs.com/package/lint-staged) + [husky](https://github.com/typicode/husky): format code before execute git commit
  * [How to use husky v6 with lint-staged?](https://github.com/typicode/husky/issues/949)

编辑器配置：

* webstorm



### 初始化`tsconfig`

```shell
npx tsc --init
```

### 规范提交
参考:

* `vue`
* `element-plus`

用到的第三方库：
* [`cz-cli`](https://github.com/commitizen/cz-cli)
* [`commitlint`](https://github.com/conventional-changelog/commitlint)
* [`conventional-changelog`](https://github.com/conventional-changelog/conventional-changelog)
  * [`usage`](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog)

### 代码质量

* jest

### 发布