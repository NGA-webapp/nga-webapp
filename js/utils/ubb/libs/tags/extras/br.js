define(function (require, exports, module) {
  var br = {
    regExp: new RegExp(/&lt;br *\/?&gt;/gi),
    replacement: '<br/>'
  };

  exports.br = br;
});
