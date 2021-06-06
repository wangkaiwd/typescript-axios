### example
* 每个页面都是单独的页面，然后单独引入对应的打包文件

#### server
由于我们并不需要`webpack`的生产环境打包能力，并且我们需要一个`server`来提供接口。通过`webpack-dev-middleware`，我们可以通过`server`来在开发环境打包代码，并且`server`中我们还可以自定义自己的逻辑。
* 需要一个服务端来接收客户端通过`aixos`发起的请求


思路：

引入路径：

`server`的功能：
1. 提供静态服务器的能力，让我们可以通过服务器访问`demo`页面
2. 通过`webpack-dev-middleware`来使用`webpack`对`ts`文件进行打包
3. 提供接口，方便客户端测试

![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/demo-of-webpack.png)