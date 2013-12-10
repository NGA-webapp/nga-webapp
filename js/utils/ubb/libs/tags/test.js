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
  exports.pair = {
    tagName: 'test',
    isPair: true,
    parser: function (content, attrs) {
      var data = '';
      if (!attrs.nop && ('foo' in attrs.dict)) {
        data = ' data-foo="' + attrs.dict.foo + '"';
      }
      return '<div class="test"' + data + '>' + content + '</div>';
    }
  };
  exports.single = {
    tagName: 'test',
    isPair: false,
    parser: function (attrs) {
      var data = '';
      if (!attrs.nop && ('foo' in attrs.dict)) {
        data = ' data-foo="' + attrs.dict.foo + '"';
      }
      return '<div class="test"' + data + '>single</div>';
    }
  };
  exports.stringParser = {
    tagName: 'test',
    isPair: false,
    parser: 'super'
  };
});