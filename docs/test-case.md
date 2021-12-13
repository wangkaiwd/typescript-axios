## start test case

* jest
* ts-jest

#### test ajax request

* [jasmine-ajax](https://github.com/jasmine/jasmine-ajax)

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

Expect:

* [toBe](https://jestjs.io/docs/expect#tobevalue)
* [toEqual](https://jestjs.io/docs/expect#toequalvalue)
* [toStrictEqual](https://jestjs.io/docs/expect#tostrictequalvalue)

### introduce

* [test asynchronous code](https://jestjs.io/docs/asynchronous#callbacks)
* [mock functions](https://jestjs.io/docs/mock-functions)

### knowledge

> [vue-next jest config file](https://github.com/vuejs/vue-next/blob/master/jest.config.js)

* create `__tests__` under project root directory
* [npm run script](https://docs.npmjs.com/cli/v8/commands/npm-run-script)
  * pass arguments to the specified script
