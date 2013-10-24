define(function (require, exports, module) {
  var LocalStorageProxy = require('utils/LocalStorageProxy/index').LocalStorageProxy;
  var appStorage = new LocalStorageProxy('nga');
  exports.AppStorage = LocalStorageProxy;
  exports.appStorage = appStorage;
  window.appStorage = appStorage;
});
