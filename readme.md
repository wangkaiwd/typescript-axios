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
  
### 高效开发
在测试页面中使用`axios`，模拟真实使用场景

* 测试页面：`vite` + `typescript` + `ant design vue`

问题：配置已初步完成，但是步骤过于繁琐，且没有找到如何为`vue3`项目指定`tsconfig`的方法

结论：决定采用在`website`下再建一个`vue`+`vite`的项目来生成`demo`
####  配置`Vue3`+`Webpack`开发环境
```bash
# webpack
npm i webpack webpack-cli webpack-dev-server -D
# babel
npm i @babel/core @babel/preset-env @babel/preset-typescript -D

# vue vue-router vue-loader
npm i vue@next vue-loader@next @vue/compiler-sfc

# eslint
npm i eslint-plugin-vue

# css
npm i less less-loader css-loader style-loader
```

* [`eslint-plugin-vue`](https://eslint.vuejs.org/user-guide/#installation)

### 代码质量

* jest

### 发布