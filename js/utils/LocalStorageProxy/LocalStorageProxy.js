define(function (require, exports, module) {
  var LocalStorage = require('./base/LocalStorage');

  // 保留键名
  var __reserved__ = ['all'];

  // 检查保留键名冲突
  var checkReserved = function (key) {
    if (_.contains(__reserved__, key)) {
      throw new Error('the key is reserved');
    }
  };

  var LocalStorageProxy = function (namespace) {
    this._storage = new LocalStorage(namespace);
    return this;
  };

  _.extend(LocalStorageProxy.prototype, Backbone.Events, {
    set: function (key, val, options) {
      var previous;
      checkReserved(key);
      _.defaults((options || (options = {})), {silent: false});
      if (!options.silent) {
        previous = this._storage.get(key, {silent: true});
        if (!_.isEqual(previous, val)) {
          this.trigger('change', key, val, previous);
          this.trigger('change:' + key, val, previous);
        }
        this.trigger('set', key, val);
        this.trigger('set:' + key, val);
      }
      this._storage.set(key, val);
      return this;
    },
    get: function (key, options) {
      var val;
      checkReserved(key);
      _.defaults((options || (options = {})), {silent: false});
      val = this._storage.get(key);
      if (!options.silent) {
        this.trigger('get', key, val);
        this.trigger('get:' + key, val);
      }
      return val;
    },
    clear: function (key, options) {
      checkReserved(key);
      _.defaults((options || (options = {})), {silent: false});
      if (arguments.length === 0) {
        this._storage.clear();
        if (!options.silent) {
          this.trigger('clear', 'all');
          this.trigger('clear:all');
        }
      } else {
        this._storage.clear(key);
        if (!options.silent) {
          this.trigger('clear', key);
          this.trigger('clear:' + key);
        }
      }
      return this;
    },
    all: function (options) {
      var dicts = this._storage.all();
      _.defaults((options || (options = {})), {silent: false});
      if (!options.silent) {
        this.trigger('get', 'all', dicts);
        this.trigger('get:all', dicts);
      }
      return dicts;
    }
  });

  var storage = new LocalStorageProxy('nga');

  module.exports = LocalStorageProxy;
});