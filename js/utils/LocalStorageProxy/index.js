define(function (require, exports, module) {
  var LocalStorage = require('./base/LocalStorage');
  var LocalStorageProxy = require('./LocalStorageProxy');
  var toDataUrl = require('./base/toDataUrl');

  exports.toDataUrl = toDataUrl;
  exports.LocalStorage = LocalStorage;
  exports.LocalStorageProxy = LocalStorageProxy;
});