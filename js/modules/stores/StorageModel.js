define(function (require, exports, module) {
  var LocalStorage = require('utils/LocalStorage');

  // 保留键名
  var __reserved__ = ['all'];

  // 检查保留键名冲突
  var checkReserved = function (key) {
    if (_.contains(__reserved__, key)) {
      throw new Error('the key is reserved');
    }
  };

  var StorageModel = function (namespace) {
    this._storage = new LocalStorage(namespace);
    return this;
  };

  _.extend(StorageModel.prototype, Backbone.Events, {
    set: function (key, val) {
      checkReserved(key);
      this._storage.set(key, val);
      this.trigger('set', key, val);
      this.trigger('set:' + key, val);
      return this;
    },
    get: function (key) {
      checkReserved(key);
      var val = this._storage.get(key);
      this.trigger('get', key, val);
      this.trigger('get:' + key, val);
      return val;
    },
    clear: function (key) {
      checkReserved(key);
      if (arguments.length === 0) {
        this._storage.clear();
        this.trigger('clear', 'all');
        this.trigger('clear:all');
      } else {
        this._storage.clear(key);
        this.trigger('clear', key);
        this.trigger('clear:' + key);
      }
      return this;
    },
    all: function () {
      this.trigger('get', 'all', val);
      this.trigger('get:all', val);
      return this._storage.all();
    }
  });

  var storage = new StorageModel('nga');

  module.exports = StorageModel;
});