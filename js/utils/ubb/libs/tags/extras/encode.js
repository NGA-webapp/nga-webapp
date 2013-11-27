define(function (require, exports, module) {
  var amp = {
    regExp: new RegExp(/&amp;/gi),
    replacement: '&',
    priority: 3,
  };

  exports.amp = amp;
});
