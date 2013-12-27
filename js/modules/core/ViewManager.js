define(function (require, exports, module) {
  var ViewManager = function () {
    return this;
  };

  ViewManager.prototype.initialize = function (collection) {
    this._views = collection;
    return this;
  };

  ViewManager.prototype.get = function (key) {
    return this._views[key];
  };

});