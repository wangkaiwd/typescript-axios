## 思路

### 实现一个最简单的`ajax`请求

### `params`: 将参数拼接到`url`中

### 为什么要这样处理?

* 数组
* 对象
* Date
* 特殊字符
  * [encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
  * [When are you supposed to use escape instead of encodeURI/encodeURIComponent](https://stackoverflow.com/questions/75980/when-are-you-supposed-to-use-escape-instead-of-encodeuri-encodeuricomponent)

有什么规范可以参考吗？

#### 问题

* `params: {a:{x:1}}`属性值依旧是对象的情况处理和想象的不一样？

### `data`: 将参数添加到请求体中

#### 自己的思路

根据请求头不同，要进行不同的处理：

* `application/json`
* `application/x-www-form-urlencoded`
* `multipart/form-data`
* other format

如果是普通对象，转换为`JSON`字符串，其它类型的内容，直接交给服务端处理？

#### 库的思路

`send`方法传入的请求体的类型如下：

* Document
* XMLHttpRequestBodyInit

服务端会根据不同的请求`Content-Type`来解析请求`body`:

* 通过流的形式来获取到对应的参数
* 通过`Content-Type`来解析参数
  * `application/json`
  * `application/x-www-form-urlencoded`
  * `multipart/form-data`
  * `text/plain`

如果传入的参数可以被`JSON.parse`进行解析并且`headers`中没有设置`Content-Type`，`axios`会默认设置`application/json`请求头

参考资料：

* [post](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)
* [`XMLHttpRequest.send()`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send#parameters)

### 处理请求头

> 由`send`方法中的参数解析引发的问题

* 支持配置请求头
* 在`open`之后以及`send`之前，通过`headers`来设置请求头

> post body URLSearchParams will auto set request header Content-Type: application/x-www-form-urlencoded;charset=UTF-8

### 处理返回

* 处理响应头(为什么要处理响应头，是出于什么问题而考虑的。目前能想到的1个点：文件下载，通过响应头来获取文件名)
  * [getAllResponseHeaders](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders)
* 支持设置响应类型[`responseType`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType)
  * 设置之后感觉没有用？
  * 实际使用场景：文件下载，服务端返回文件流
* 请求成功后返回给用户的数据格式

### 错误处理

* 网络错误
* 请求超时
* 非200~299状态码

要给使用者详细的错误信息，而不仅仅只是一个字符串：

* message: 错误信息
* request: `XMLHttpRequest`实例
* response: 收到响应，但状态码不是`2xx`
* config: 请求配置项

知识点：[汇总导出类型文件](https://github.com/wangkaiwd/typescript-axios/blob/6ef097d9b1150d8669f954f53919206d2ed12fa4/lib/index.ts#L1-L5)，方便使用者使用类型

### 扩展接口

#### `api`扩展

为了让用户更加方便的调用，我们对使用方法进行了扩展：

* axios(config)
* axios.verb(url,data?,config?)

核心：`axios`本身是一个可以直接调用的函数，而且它也是一个对象，可以通过它的属性来调用不同的方法

#### 函数重载

* [function overload](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads)

#### 响应支持泛型

#### 知识点

*

使用[扩展运算符实现属性对象属性的合并](https://github.com/wangkaiwd/typescript-axios/blob/ff0d0046dfbe74708706b1212d19103797dd25a1/lib/helpers/extend.ts#L2-L7)
，并支持类型提示

*

使一个[变量既是函数又是对象](https://github.com/wangkaiwd/typescript-axios/blob/ff0d0046dfbe74708706b1212d19103797dd25a1/lib/axios.ts#L5-L9)

### 拦截器

* 请求拦截器
* 响应拦截器

#### 需求分析

* 设置公共的请求响应拦截器管理类

#### 知识点

* [review call promise then chain](https://github.com/wangkaiwd/typescript-axios/blob/2c0129bee059cd1e4ed4ce4b0a2268e572cad13d/lib/core/Axios.ts#L68-L69)

### 配置化

`axios`每次在发起请求时都需要传入对应的配置，而有一些是可以全局配置的，而需要局部配置的内容可以与全局配置合并，覆盖掉全局配置。这样可以极大的方便用户使用

#### 合并配置的设计与实现

要合并的配置：

* 全局配置(所有请求)
* 实例配置(每个实例)
* 请求配置(每个请求)

合并策略(`config1`和`config2`合并)：

* 默认合并策略：以`config2`的值为主，如果`config2`有值就用`config2`，否则用`config1`
* 只使用`config2`中的默认配置
* 合并复杂对象：遍历对象的每一项，通过默认合并策略进行合并

#### 请求和响应配置化

* 配置响应和请求
  * transformRequest
  * transformResponse

#### 扩展`axios.create`静态接口

* 利用类型断言强制转换`axios`的类型

### 取消请求

* [`XMLHttpRequest.abort()`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort)
* [how to cancel a pending promise](https://github.com/wangkaiwd/node-core/blob/main/00.promise/promise-abort.js)

难点：

* 如何让用户取消请求

```js
let cancel = undefined
axios({
  url: 'xxx', cancelFn: function(c) { // c = xhr.abort.bind(xhr)
    cancel = c
  }
})
```

* CancelToken Class
* isCancel

#### knowledge points

* the statement after [throw](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw) won't
  be executed

### 整体思路

### 复杂点

* 配置合并：
  * 策略模式
  * 深度合并
  * 拍平`headers`

### 更多功能

* [XMLHttpRequest.withCredentials](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials)
* xsrf: 同域并且设置了`withCredentials`时，在请求头添加`xsrf`相关字段
  * [same-origin-policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)
  * [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
    * [origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin)
    * [cors http response header](https://fetch.spec.whatwg.org/#http-responses)