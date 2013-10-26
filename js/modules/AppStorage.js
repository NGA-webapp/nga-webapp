define(function (require, exports, module) {
  /**
   * @deprecated 重新设计为modules/storage/site
   * @type {[type]}
   */
  var LocalStorageProxy = require('utils/LocalStorageProxy/index').LocalStorageProxy;
  var appStorage = new LocalStorageProxy('nga');
  exports.AppStorage = LocalStorageProxy;
  exports.appStorage = appStorage;
  window.appStorage = appStorage;
});
