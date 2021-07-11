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

如果传入的参数可以被`JSON.parse`进行解析，`axios`会默认设置`application/json`请求头

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

### 整体思路