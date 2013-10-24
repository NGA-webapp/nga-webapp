define(function (require, exports, module) {
  var AppCache = function () {
    this.flag = {};
    this.flag.init = false;
    return this;
  };
  AppCache.prototype.initialize = function (initDate) {
    if (!this.flag.init) {
      this.flag.init = true;
      this.data = initDate();
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

  /**
   * 使用该对象缓存app运行生命期里的数据，如单例的视图
   */
  var appCache = new AppCache();

  exports.appCache = appCache;
});