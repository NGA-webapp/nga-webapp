define(function (require, exports, module) {
  var LocalStorage = require('./base/LocalStorage');
  var LocalStorageProxy = require('./LocalStorageProxy');

  exports.LocalStorage = LocalStorage;
  exports.LocalStorageProxy = LocalStorageProxy;
});