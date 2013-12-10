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
  var list = {
    tagName: 'list',
    isPair: true,
    parser: function (content) {
      var str = '';
      var arr = content.split('[*]');
      var i, len;
      for (i = 0, len = arr.length; i < len; i++) {
        if (arr[i]) {
          str += '<li>' + arr[i] + '</li>';
        }
      }
      return '<ul>' + str + '</ul>';
    }
  };

  exports.list = list;
});