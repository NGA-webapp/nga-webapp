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
})(function (require, exports) {
  var l = {
    tagName: 'l',
    isPair: true,
    parser: function (content) {
      return '<div class="left">' + content + '</div>';
    }
  };

  var r = {
    tagName: 'r',
    isPair: true,
    parser: function (content) {
      return '<div class="right">' + content + '</div>';
    }
  };

  var quote = {
    tagName: 'quote',
    isPair: true,
    parser: function (content) {
      return '<blockquote>' + content + '</blockquote>';
    }
  };

  var code = {
    tagName: 'code',
    isPair: true,
    parser: function (content) {
      return '<pre class="prettyprint"><code>' + content + '</code></pre>';
    }
  };

  var tid = {
    tagName: 'tid',
    isPair: true,
    parser: function (content, attrs) {
      if (attrs.nop) {
        return content;
      }
      return '<a href="#!/topic/' + attrs.value + '">' + content + '</a>';
    },
    priority: 3,
  };

  // webapp未提供接口，后续补上
  var pid = {
    tagName: 'pid',
    isPair: true,
    parser: function (content) {
      return '';
    },
    priority: 3,
  };

  exports.l = l;
  exports.r = r;
  exports.quote = quote;
  exports.code = code;
  exports.tid = tid;
  exports.pid = pid;
});