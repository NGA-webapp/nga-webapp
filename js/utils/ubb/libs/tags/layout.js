define(function (require, exports) {
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

  exports.l = l;
  exports.r = r;
  exports.quote = quote;
  exports.code = code;
});