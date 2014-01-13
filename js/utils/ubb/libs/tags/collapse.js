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
  var collapse = {
    tagName: 'collapse',
    isPair: true,
    parser: function (content, attrs) {
      var title = attrs.nop ? '展开' : attrs.value;
      return '<details class="ubb-collapse"><summary>' + title + '</summary>'
         + '<div class="ubb-collapse-content">' + content + '</div></details>';
    },
    priority: 1,
  };
  
  exports.collapse = collapse;
});