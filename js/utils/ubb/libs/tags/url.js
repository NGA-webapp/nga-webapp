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
  var url = {
    tagName: 'url',
    isPair: true,
    parser: function (content, attrs) {
      if (attrs.nop) {
        return '<a class="url" data-url="' + content + '" href="javascript:void(0);">' + content + '</a>';
      }
      return '<a class="url" data-url="' + attrs.value + '" href="javascript:void(0);">' + content + '</a>';
    },
    priority: 1,
  };
  
  exports.url = url;
});