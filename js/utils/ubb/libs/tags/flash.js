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
  var flash = {
    tagName: 'flash',
    isPair: true,
    parser: function (content, attrs, settings) {
      var flash;
      if (typeof settings === 'object' && settings.getFlash === false) {
        flash = '<div></div>';
      } else {
        flash = '<div class="ubb-flash" data-url="' + content + '"></div>';
      }
      return flash;
    },
    priority: 1,
  };

  exports.flash = flash;
});