### 开发环境
* 每个页面都是单独的页面，然后单独引入对应的打包文件

#### server
`server`的功能：
1. 提供静态服务器的能力，让我们可以通过服务器访问`demo`页面
2. 通过`webpack-dev-middleware`来使用`webpack`对`ts`文件进行打包
3. 提供接口，方便客户端测试

![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/demo-of-webpack.png)