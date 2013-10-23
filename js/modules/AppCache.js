define(function (require, exports, module) {
  var AppCache = function () {
    this.flag = {};
    this.flag.init = false;
    return this;
  };
  AppCache.prototype.initialize = function (initFunction) {
    if (!this.flag.init) {
      this.flag.init = true;
      initFunction.apply(this);
    }
    return this;
  };
  AppCache.prototype.get = function (key) {
    if (typeof key === 'undefined') {
      return this.data;
    } else {
      return this.data[key];
    }
  };

  var appCache = new AppCache();

  exports.appCache = appCache;
});