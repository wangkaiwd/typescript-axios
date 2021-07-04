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

### `data`: 将参数添加到请求体中

#### 自己的思路

根据请求头不同，要进行不同的处理：

* `application/json`
* `application/x-www-form-urlencoded`
* `multipart/form-data`
* other format

如果是普通对象，转换为`JSON`字符串，其它类型的内容，直接交给服务端处理？

#### 库的思路

* [`XMLHttpRequest.send()`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send#parameters)

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

### 处理返回

* 错误信息
* 请求成功后返回给用户的数据格式