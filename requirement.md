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

根据请求头不同，要进行不同的处理：

* `application/json`
* `application/x-www-form-urlencoded`
* `multipart/form-data`
* other format

如果是普通对象，转换为`JSON`字符串，其它类型的内容，直接交给服务端处理？

### 处理返回

* 错误信息
* 请求成功后返回给用户的数据格式