## 搭建项目

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

### 代码规范

安装`lint`

* [TSLint -> ESLint](https://github.com/palantir/tslint/issues/4534)
* [eslint](https://eslint.org/docs/user-guide/getting-started)
* [prettier](https://prettier.io/docs/en/install.html)
* [lint-staged](https://www.npmjs.com/package/lint-staged) + [husky](https://github.com/typicode/husky): format code
  before execute git commit
  * [How to use husky v6 with lint-staged?](https://github.com/typicode/husky/issues/949)

编辑器配置：

* [webstorm](https://prettier.io/docs/en/webstorm.html)

### 初始化`tsconfig`

```shell
npx tsc --init
```

### 提交规范

用到的第三方库：

* [`cz-cli`](https://github.com/commitizen/cz-cli)
* [`commitlint`](https://github.com/conventional-changelog/commitlint)
* [`conventional-changelog`](https://github.com/conventional-changelog/conventional-changelog)
  * [`usage`](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog)

### 高效开发

在测试页面中使用`axios`，模拟真实使用场景：

* 目前的开发环境配置[在这里](https://github.com/wangkaiwd/typescript-axios/blob/master/website/readme.md)

### 调试

* 目前可以直接在`chrome`浏览器中调试
* 如何使用编辑器断点调试源代码？

#### 在其它项目中调试

* [npm link](https://docs.npmjs.com/cli/v8/commands/npm-link)
* [how do I uninstall a package installed using npm link](https://stackoverflow.com/questions/19094630/how-do-i-uninstall-a-package-installed-using-npm-link)
  * cancel npm link

into library directory and execute follow command line:

```shell
npm link
```

then into your project directory:

```shell
npm link @ppwd/axios
```

#### free api

* [hacker news api](https://github.com/HackerNews/API): need fq

### 代码质量

* jest

### 打包

* `tsc`

### 发布

* [getting error 402 while publishing package using npm](https://stackoverflow.com/q/41981686)
* tag
* version

### 文档书写

### 参考

* [typescript-starter](https://github.com/bitjson/typescript-starter)
* [`vue`](https://github.com/vuejs/vue-next)
* [`element-plus`](https://github.com/element-plus/element-plus)