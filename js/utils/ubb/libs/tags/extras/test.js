define(function (require, exports, module) {
  exports.testExtra = {
    regExp: new RegExp(/-=test:(.*?)=-/gi),
    replacement: '<div class="test">$1</div>'
  };
  exports.testExtraException = {
    regExp: new RegExp(/-=exception=-/gi),
    replacement: '<div class="test">$1</div>'
  };
});