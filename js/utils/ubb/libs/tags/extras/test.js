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
  exports.testExtra = {
    regExp: new RegExp(/-=test:(.*?)=-/gi),
    replacement: '<div class="test">$1</div>'
  };
  exports.testExtraException = {
    regExp: new RegExp(/-=exception=-/gi),
    replacement: '<div class="test">$1</div>'
  };
});