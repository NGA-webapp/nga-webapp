;(function (definition) {
  // this is considered "safe":
  var hasDefine = typeof define === 'function',
    // hasDefine = typeof define === 'function',
    hasExports = typeof module !== 'undefined' && module.exports;

  if (hasDefine) {
    // AMD Module or CMD Module
    define(definition);
  } else if (hasExports) {
    // Node.js Module
    definition(require, exports, module);
  } else {
    throw new Error('module required');
  }
})(function (require, exports, module) {
  var utils = require('./utils');
  var MAXNESTING = 100; // 单类标记最多解析数

  /**
   * 去除头尾多余空白符
   * @param  {string} str
   * @return {string}
   */
  var trim = function (str) {
    if (typeof str !== 'string') {
      return '';
    }
    return str.replace(/(^\s*)|(\s*$)/g, "");
  };

  /**
   * 获取空正则表达式
   * @return {RegExp}         空正则表达式
   */
  var emptyReg = exports.emptyReg = function () {
    return new RegExp(/^(?:)$/);
  };

  /**
   * 获取匹配成对出现的ubb标签无内嵌套的正则表达式
   * @param  {string} tagName 标签名
   * @return {RegExp}         匹配的正则表达式
   */
  var pairReg = exports.pairReg = function (tagName) {
    // e.g.: new RegExp(/\[test((?:[=\s][^\]]*)?)\]((?:(?!(?:\[test\]|\[\/test\])).)*)\[\/test\]/gi);
    return new RegExp('\\[' + tagName + '((?:[=\\s][^\\]]*)?)\\]((?:(?!(?:\\[' + tagName + '\\]|\\[\\\/' + tagName + '\\])).)*)\\[\\\/' + tagName + '\\]', 'gi');
  };

  /**
   * 获取匹配单个出现的ubb标签的正则表达式
   * @param  {string} tagName 标签名
   * @return {RegExp}         匹配的正则表达式
   */
  var singleReg = exports.singleReg = function (tagName) {
    // e.g.: new RegExp(/\[test((?:[=\s][^\]]*)?)\]/gi);
    return new RegExp('\\[' + tagName + '((?:[=\\s][^\\]]*)?)\\]', 'gi');
  };

  /**
   * 将字符串形式的标记属性转换为便于使用的格式
   * @param  {string} attrStr 字符串形式的标记属性，如'=value', ' foo=bar', ' foo bar'
   * @return {object}         便于使用的标记属性
   *                          {
   *                            nop: false, // 没有任何属性值
   *                            value: '',  // 当标签格式为[tag=value]时代表其value，否则该值为undefined
   *                            arr: [], // 当标签有属性值且格式不为[tagName=val]时，属性将按顺序存入该数组
   *                            dict: {} // 当标签有属性值且格式不为[tagName=val]时，有属性名的属性将以键值的形式存入该对象
   *                          }
   */
  var getAttrs = exports.getAttrs = function (attrStr) {
    var result = {};
    var attrArr = [];
    var i, len;
    var equ, key, val;
    if (typeof attrStr !== 'string' || trim(attrStr) === '') {
      // 无属性
      result.nop = true;
    } else if (attrStr.match(/^=/)) {
      // [tag=value]
      result.value = attrStr.slice(1);
    } else if (attrStr.match(/^\s/)) {
      // [tag ...]
      result.arr = [];
      result.dict = {};
      attrArr = trim(attrStr).split(' ');
      for (i = 0, len = attrArr.length; i < len; i++) {
        equ = attrArr[i].indexOf('=');
        if (equ !== -1) {
          // [tag foo=bar baz=abc]
          // [tag foo bar=baz]
          key = attrArr[i].slice(0, equ);
          val = attrArr[i].slice(equ + 1);
          result.dict[key] = val;
          result.arr.push(val);
        } else {
          // [tag foo bar]
          result.arr.push(attrArr[i]);
        }
      }
    }
    return result;
  };

  /**
   * Ubb
   * @class  Ubb
   * @constructor
   * @return {Ubb} this
   * @chainable
   */
  var Ubb = function () {
    if (!(this instanceof Ubb)) {
      return new Ubb();
    }
    this._tags = [];
    // 使用一个_cacheTags保存排序后的tags，减少重复的计算消耗
    this._cacheTags = [];
    this._flag = {
      // 使用一个_flag.cached标记判断是否已经缓存了最新的排序结果
      cached: false,
    };
    return this;
  };

  /**
   * 创建对某段文本进行递归解析单类**普通**标记的方法
   * @method  _buildExec
   * @private
   * @for  Ubb
   * @param {string} tagName 标记名
   * @param  {function|string} parser 该标记的解析器，或该标记直接返回的字符串
   * @param {boolean} isPair 该标记是否成对出现
   * @return {function}     对某段文本进行递归解析单类**普通**标记的方法
   */
  Ubb.prototype._buildExec = function (tagName, parser, isPair, settings) {
    var reg;
    // 根据标签的设置（是否成对出现）选择不同的匹配方法
    reg = isPair ? pairReg(tagName) : singleReg(tagName);

    /**
     * 对某段文本进行递归解析单类**普通**标记
     * @param  {string} str 需要解析的内容
     * @param {number} nest 当前解析次数，当大于设置的最大值时强制跳出递归，以避免发生死循环
     * @return {string}     解析后的内容
     */
    var _exec = function (str, nest) {
      var result, startAt, endAt, attrStr, attrs, content;
      // 重置匹配结果
      reg.lastIndex = 0;
      // 进行匹配
      result = reg.exec(str);
      // 如果没有查找到匹配的标签则返回原文本，结束解析
      if (!result) {
        return str;
      }
      // 如果匹配成功，则取出匹配的位置
      startAt = reg.lastIndex - result[0].length;
      endAt = reg.lastIndex;
      // 提取属性
      attrStr = result[1];
      attrs = getAttrs(attrStr);
      // 根据标签的设置（是否成对出现）选择进行不同的字符串替换方法
      if (isPair) {
        content = result[2];
        str = str.slice(0, startAt) + (typeof parser === 'string' ? parser : parser(content, attrs, settings)) + str.slice(endAt);
      } else {
        str = str.slice(0, startAt) + (typeof parser === 'string' ? parser : parser(attrs, settings)) + str.slice(endAt);
      }
      // 如果此次解析已经超过设置的最大次数限制则结束解析
      if (++nest >= MAXNESTING) {
        return str;
      }
      // 否则将以递归的形式继续对本类标签进行查找解析
      return _exec(str, nest);
    };
    return _exec;
  };

  /**
   * 创建对某段文本进行递归解析单类**特殊**标记的方法
   * @method  _buildExtraExec
   * @private
   * @for  Ubb
   * @param {RegExp} regExp 匹配解析的正则表达式
   * @param {string} replacement 替换内容
   * @return {function}     对某段文本进行递归解析单类**特殊**标记的方法
   */
  Ubb.prototype._buildExtraExec = function (regExp, replacement) {
    /**
     * 对某段文本进行递归解析单类**特殊**标记
     * @param  {string} str 需要解析的内容
     * @param {number} nest 当前解析次数，当大于设置的最大值时强制跳出递归，以避免发生死循环
     * @return {string}     解析后的内容
     */
    var _exec = function (str, nest) {
      regExp.lastIndex = 0;
      if (!regExp.test(str)) {
        return str;
      }
      str = str.replace(regExp, replacement);
      if (++nest >= MAXNESTING) {
        return str;
      }
      return _exec(str, nest);
    };
    return _exec;
  };

  /**
   * 将危险字符编码
   * @method _escape
   * @private
   * @for  Ubb
   * @param  {string} content 需要编码的内容
   * @return {string}         编码后的内容
   */
  Ubb.prototype._escape = function (content) {
    if (content) {
      content = content.replace(/&/igm, '&amp;');
      content = content.replace(/</igm, '&lt;');
      content = content.replace(/>/igm, '&gt;');
      content = content.replace(/\"/igm, '&quot;');
      content = content.replace(/\'/igm, '&apos;');
    }
    return content;
  };

  /**
   * 将内容通过单类标记转换为html格式
   * @method  _toHtml
   * @private
   * @for  Ubb
   * @param  {string} content 需要转换的内容
   * @param  {string} tag 设置的标记规则
   * @param  {object} settings 自定义设置项，如图片默认地址等
   * @return {string}         转换后的内容
   */
  Ubb.prototype._toHtml = function (content, tag, settings) {
    var isExtra, regExp, replacement, tagName, parser, isPair;
    isExtra = tag.isExtra;
    if (isExtra) {
      regExp = tag.regExp;
      replacement = tag.replacement;
      return this._buildExtraExec(regExp, replacement)(content, 0);
    } else {
      tagName = tag.tagName;
      parser = tag.parser;
      isPair = tag.isPair;
      return this._buildExec(tagName, parser, isPair, settings)(content, 0);
    }
  };

  /**
   * 将内容通过全部ubb标记转换为html格式
   * @method  toHtml
   * @for  Ubb
   * @param  {string} content 需要转换的内容
   * @param  {object} settings 自定义设置项，如图片默认地址等
   * @return {string}         转换后的内容
   */
  Ubb.prototype.toHtml = function (content, settings) {
    var tags, i, len;
    content = this._escape(content);
    // 缓存排序结果
    if (this._flag.cached) {
      tags = this._cacheTags;
    } else {
      tags = utils.sortBy(this._tags, function (tag) {return -tag.priority;});
      this._cacheTags = tags;
      this._flag.cached = true;
    }
    // 依次进行转换
    for (i = 0, len = tags.length; i < len; i++) {
      content = this._toHtml(content, tags[i], settings);
    }
    return content;
  };

  /**
   * 添加标签
   * @method _add
   * @private
   * @for  Ubb
   * @param {object} tag 标签的设置
   *                     {
   *                       tagName: '', // 标签名
   *                       parser: function (content, attr) {}, // 解析器，也可以直接为一个字符串
   *                       isPair: true, // 是否成对出现
   *                       priority: 1, // 优先处理级别
   *                     }
   * @return {Ubb} this
   * @chainable
   */
  Ubb.prototype._add = function (tag) {
    var self = this;
    var defaults = {
      tagName: '',
      parser: function (content, attr) {},
      isPair: true,
      priority: 1
    };
    // var options = $.extend({}, defaults, tag);
    var options = {
      tagName: typeof tag.tagName === 'undefined' ? defaults.tagName : tag.tagName,
      parser: typeof tag.parser === 'undefined' ? defaults.parser : tag.parser,
      isPair: typeof tag.isPair === 'undefined' ? defaults.isPair : tag.isPair,
      priority: typeof tag.priority === 'undefined' ? defaults.priority : tag.priority,
      isExtra: false,
    };
    if (!options.tagName) {
      throw new Error('the tag name could not be empty.');
    }
    // 允许同名标签存在，并按优先级处理。
    self._tags.push(options);
    // 添加新标签时将缓存标记设为false
    self._flag.cached = false;
    return self;
  };

  /**
   * 添加一个或多个标签
   * @method add
   * @for  Ubb
   * @param {object|array} tags 一个(object)或一组(array)标签的设置
   *                     {
   *                       tagName: '', // 标签名
   *                       parser: function (content, attr) {}, // 解析器，也可以直接为一个字符串
   *                       isPair: true, // 是否成对出现
   *                       priority: 1, // 优先处理级别
   *                     }
   * @return {Ubb} this
   * @chainable
   */
  Ubb.prototype.add = function (tags) {
    var i, len;
    if (tags instanceof Array) {
      for (i = 0, len = tags.length; i < len; i++) {
        this._add(tags[i]);
      }
    } else {
      this._add(tags);
    }
    return this;
  };

  /**
   * 添加**特殊**标签
   * @method _addExtra
   * @private
   * @for  Ubb
   * @param {object} tag 标签的设置
   *                     {
   *                       regExp: new RegExp(/===(.*?)===/gi), // 匹配解析的正则表达式
   *                       replacement: '<h4>$1</h4>', // 替换内容
   *                     }
   * @return {Ubb} this
   * @chainable
   */
  Ubb.prototype._addExtra = function (tag) {
    var self = this;
    var defaults = {
      regExp: emptyReg(),
      replacement: '',
      priority: 1
    };
    // var options = $.extend({}, defaults, tag);
    var options = {
      regExp: typeof tag.regExp === 'undefined' ? defaults.regExp : tag.regExp,
      replacement: typeof tag.replacement === 'undefined' ? defaults.replacement : tag.replacement,
      priority: typeof tag.priority === 'undefined' ? defaults.priority : tag.priority,
      isExtra: true,
    };
    // 特殊标签与普通标签共同放在一个集合中
    self._tags.push(options);
    // 添加新标签时将缓存标记设为false
    self._flag.cached = false;
    return self;
  };

  /**
   * 添加一个或多个**特殊**标签
   * @method addExtra
   * @for  Ubb
   * @param {object|array} tags 一个(object)或一组(array)标签的设置
   *                     {
   *                       regExp: new RegExp(/===(.*?)===/gi), // 匹配解析的正则表达式
   *                       replacement: '<h4>$1</h4>', // 替换内容
   *                     }
   * @return {Ubb} this
   * @chainable
   */
  Ubb.prototype.addExtra = function (tags) {
    var i, len;
    if (tags instanceof Array) {
      for (i = 0, len = tags.length; i < len; i++) {
        this._addExtra(tags[i]);
      }
    } else {
      this._addExtra(tags);
    }
    return this;
  };

  exports.Ubb = Ubb;
});
