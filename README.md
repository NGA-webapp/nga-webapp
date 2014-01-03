# NGA / webapp

> ![](https://github.com/imyelo/nga-webapp/blob/master/phonegap/asset/logo-120.png?raw=true)

> **NGA-webapp**是一款[艾泽拉斯国家地理论坛](http://bbs.ngacn.cc/)的非官方H5客户端，目前经Phonegap打包已可在iOS上使用。

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

## 目标里程碑
- [1.2.0](https://github.com/imyelo/nga-webapp/issues?milestone=2&state=open)
- [1.1.0](https://github.com/imyelo/nga-webapp/issues?milestone=1&state=open)
- 1.0.0


## 如何贡献
### 提交建议
你可以直接在Github上提交[issues](https://github.com/imyelo/nga-webapp/issues)，也可以在NGA中给我回复。

### 贡献代码
由于跨域的问题，在浏览器上进行测试时，请关闭对跨域或安全的限制。
例如Chrome，可使用``--disable-web-security``关闭安全限制。

如果你已经部署好NPM和Grunt，可以在项目根目录执行``grunt dev``，便可在浏览器上进行调试。

目前Phonegap的打包编译是使用[Phonegap Build](https://build.phonegap.com/)进行。


## 依赖
- 主要依赖
  - Phonegap 3.0.0
  - Backbone 1.1.0
  - underscore 1.5.2
  - seajs 2.1.1
  - zeptojs 1.0.1
  - iscroll 4.2.5
  - less 1.4.2
  - artTemplate 2.0.1
  - [nga-ubb](https://github.com/imyelo/nga-ubb)
  - normalize.css
  - bootstrap(css, components) 3.0.0
  - veryless


## 备忘
- todo list
  - 设置喜爱版面时，将显示当前选中的版面集中显示在顶部，或在header显示数量
  - 推进ubb重写进度
    - tid和pid链接、站内链接，在app内跳转
  - 开发letter模块的表情键入


## License
The MIT License


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/imyelo/nga-webapp/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

