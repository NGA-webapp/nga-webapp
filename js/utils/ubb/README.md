# ubb for nga-webapp [![Codeship](https://www.codeship.io/projects/dafbb4e0-220a-0131-f95f-16ebbff408cc/status)](https://www.codeship.io/projects/8683) [![Build Status](https://travis-ci.org/imyelo/nga-ubb.png?branch=master)](https://travis-ci.org/imyelo/nga-ubb)  
nga的ubb设计较为杂乱，其本身的代码不便于移植，与一般的ubb规则也有所不同，所以需要重新设计一套可维护的nga-ubb解析器。以主要用于[nga-webapp](https://github.com/imyelo/nga-webapp)项目。

## Dependencies
### 业务环境
除了环境中默认包含的[seajs](https://github.com/seajs/seajs)以外，不依赖任何第三方类库。  
### 开发环境
测试依赖于[mocha](http://visionmedia.github.com/mocha/) + [chai](http://chaijs.com/api/bdd/) (bdd) + [sinon](http://sinonjs.org/docs/)。  
以及自动化工具依赖于[Grunt](http://gruntjs.com/)。

## Usage
在业务中可以直接使用`require('./index')`调用，该文件会返回一个已经设置好的ubb对象。

Example:

    var ubb = require('utils/ubb/index');
    var content = '[h]foobar[/h]......';
    ...
    content = ubb.toHtml(content);
    ...


## Test
[镜像测试](http://imyelo.github.io/nga-ubb/master/test/)或者使用
    
    npm test

具体参考可[/test](https://github.com/imyelo/nga-ubb/tree/master/test)。  

## API
### Ubb
Ubb对象位于[/libs/Ubb.js](https://github.com/imyelo/nga-ubb/tree/master/)，使用`require('./libs/Ubb').Ubb`调用，
并对外部提供三个方法，分别是add，addExtra，toHtml。  
#### 添加普通标签
以下几种形式的标签为标准的ubb标签，可以用add方法进行添加。

- [**tagName** *attr*=val *attr2*=val2]content[**/tagName**]
- [**tagName** *attr*=val]content[**/tagName**]
- [**tagName** val val2]content[**/tagName**]
- [**tagName** val]content[**/tagName**]
- [**tagName**=val]content[**/tagName**]
- [**tagName**]content[**/tagName**]
- [**tagName** *attr*=val *attr2*=val2]
- [**tagName** *attr*=val]
- [**tagName** val val2]
- [**tagName** val]
- [**tagName**=val]
- [**tagName**]

add方法接受一个tag配置对象，包含以下参数

    tagName: 标签名  
    isPair: 标签是否成对出现  
    parser: 解析该标签的方法，成对标签将传入参数(content, attrs)，而非成对标签则传入参数(attrs)  
    priority: 标签处理优先级，值越大越先处理，可以不填，默认为`1`  

其中parser传入的attrs参数为以下形式

    {
      nop: false, // 没有任何属性值
      value: '',  // 当标签格式为[tagName=val]时代表val，否则该值为undefined
      arr: [], // 当标签有属性值且格式不为[tagName=val]时，属性将按顺序存入该数组
      dict: {} // 当标签有属性值且格式不为[tagName=val]时，有属性名的属性将以键值的形式存入该对象
    }

Example:

    var ubb = new Ubb();
    ubb.add({
      tagName: 'test',
      isPair: true,
      parser: function (content, attrs) {
        var data = '';
        if (!attrs.nop && ('foo' in attrs.dict)) {
          data = ' data-foo="' + attrs.dict.foo + '"';
        }
        return '<div class="test"' + data + '>' + content + '</div>';
      },
      priority: 2,
    });


#### 添加特殊标签
非标准格式的标签，可以用addExtra方法进行添加。如以下例子：

- `===head===`
- `[s:4]`
- `[@yelo]`
- `<br />`

是的，`<br/>`也需要使用该方法进行解析。由于在内部执行解析之前，会对内容进行一次编码，过滤危险的字符串，如`<br />`会被转换为`&gt;br /&lt;`，因此需要对原内容中的`<br />`另行处理。

addExtra方法也接受一个tag配置对象，但与add方法，其包含以下参数

    regExp: 匹配解析的正则表达式  
    replacement: 替换内容  
    priority: 标签处理优先级，此处与add方法的priority相同，值越大越先处理，可以不填，默认为1  

addExtra传入的regExp和replacement可以按String.prototype.replace的参数理解。但与String.prototype.replace不同的是addExtra会对内容进行递归处理，从而解析嵌套形式出现的标签。

Example:

    var ubb = new Ubb();
    ubb.add({
      regExp: new RegExp(/-=test:(.*?)=-/gi),
      replacement: '<div class="test">$1</div>',
      priority: 2,
    });

#### 输出解析后的文本
在添加一系列的标签以后，可以通过toHtml方法输出解析后的文本。  

Example:

    var ubb = new Ubb();
    var result;
    ... some add or addExtra function
    result = ubb.toHtml('[test]sth here.[/test]');

toHtml会按设置的优先级进行排序，并将排序后的标签进行缓存，然后依次进行解析。在下一次调用toHtml时，则直接从缓存中取出按优先级排序的标签，减少排序造成的消耗。  
*若在toHtml执行之后再次执行add或者addExtra操作，则会在下一次解析的时候重新排序。*

## 标签补全计划
nga标签类型繁多，但实际使用覆盖率低，因此优先处理常用部分。

+ 所有标签
    - [b] <del>粗体文字</del>
        - <del>基本解析</del>
    - [u] <del>下划线文字</del>
        - <del>基本解析</del>
    - [i] <del>斜体文字</del>
        - <del>基本解析</del>
    - [align] <del>左/中/右对齐</del>
        - <del>基本解析</del>
    - [color] 文字颜色
        - <del>基本解析</del>
        - 重写样式表
    - [size] 文字大小
        - <del>基本解析</del>
        - 重写样式表
        - 限制最大值
    - [font] 文字字体
        - <del>基本解析</del>
        - 重写样式表
    - [del] 删除线
        - <del>基本解析</del>
        - 重写样式表
    - [h] 段落标题
        - <del>基本解析</del>
    - ===h=== 段落标题
        - <del>基本解析</del>
    - [l/r] 左/右浮动
        - <del>基本解析</del>
    - [list] 列表条目
        - <del>基本解析</del>
        - 重写样式表
    - [img] 插入图片
        - <del>基本解析</del>
        - 重写样式表
        - 处理异常
    - [s:] 插入官方表情
        - <del>基本解析</del>
        - 重写文件地址，使用缓存处理
    - [img] 插入额外表情图片
        - 基本解析
        - 重写文件地址，使用缓存处理
    - [quote] 引用文字
        - <del>基本解析</del>
        - 重写样式表
    - [code] 程序代码
        - <del>基本解析</del>
        - 重写样式表
    - [url] 插入链接
    - [tid/pid] 主题/回复
    - [crypt] 插入加密的内容
    - [dice] 投骰子
    - [collapse] 插入折叠的内容
    - [@用户名] 发送提醒
    - [flash] 插入flash(视频)
    - [table] 插入表格
    - [randomblock] 插入随机段落
    - [t.178.com] 引用178尾巴
    - [album] 插入相册
    - [customachieve] 自定义成就
    - [[]] 游戏数据库
    - [armory] 魔兽世界人物信息
    - [url] Diablo3人物信息

