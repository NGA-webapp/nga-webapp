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
  var at = {
    regExp: new RegExp(/\[@(\w*)\]/gi),
    replacement: '<a class="ubb-at" data-username="$1" src="javascript:;">{@$1}</a>'
  };

  exports.at = at;
});
