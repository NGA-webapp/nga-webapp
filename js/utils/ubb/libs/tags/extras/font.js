define(function (require, exports, module) {
  var h = {
    regExp: new RegExp(/={3,}(.*?)={3,}/gi),
    replacement: '<h4>$1</h4>'
  };

  exports.h = h;
});
