## start test case

* jest
* ts-jest

### knowledge

> [vue-next jest config file](https://github.com/vuejs/vue-next/blob/master/jest.config.js)

* create `__tests__` under project root project

#### configuration

* test file will has suffix `.spec` compare with origin source code file
  * [testMatch](https://jestjs.io/docs/configuration#testmatch-arraystring)
  * [testPathIgnorePatterns](https://jestjs.io/docs/configuration#testpathignorepatterns-arraystring)
* [setupFilesAfterEnv](https://jestjs.io/docs/configuration#setupfilesafterenv-array)

#### api

* [describe](https://jestjs.io/docs/api#describename-fn)
* [test](https://jestjs.io/docs/api#testname-fn-timeout)
* [beforeEach](https://jestjs.io/docs/api#beforeeachfn-timeout)
* [afterEach](https://jestjs.io/docs/api#aftereachfn-timeout)
* [test asynchronous code](https://jestjs.io/docs/asynchronous#callbacks)
