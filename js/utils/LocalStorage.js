define(function (require, exports, module) {
  /**
   * 对localStorage进行的封装
   * @author yelo
   * @class  LocalStorage
   * @constructor
   * @param {string} namespace 命名空间
   * @chainable
   * @return {LocalStorage} this
   */
  var LocalStorage = function (namespace) {
    this._namespace = namespace || 'yelo';
    return this;
  };
  /**
   * 为键名加前缀
   * @method prefix
   * @for  LocalStorage
   * @param  {string} key 键名
   * @return {string}     完整键名
   */
  LocalStorage.prototype.prefix = function (key) {
    return this._namespace + '-' + key;
  };
  /**
   * 获取类型
   * @method getType
   * @for  LocalStorage
   * @param  {string} val 值
   * @return {string}     类型
   */
  LocalStorage.prototype.getType = function (val) {
    if (_.isArray(val)) return 'array';
    if (_.isNumber(val)) return 'number';
    if (_.isObject(val)) return 'object';
    if (_.isUndefined(val)) return 'undefined';
    return 'string';
  };
  /**
   * 保存键值
   * @method set
   * @for  LocalStorage
   * @param {string} key 键
   * @param {object|string|number|array} val 值
   */
  LocalStorage.prototype.set = function (key, val) {
    var type;
    if (!this.enable) return null;
    type = this.getType(val);
    window.localStorage.setItem(this.prefix(key), JSON.stringify({data: val, type: type}));
    return val;
  };
  /**
   * 取出键值
   * @method get
   * @for  LocalStorage
   * @param  {string} key 键
   * @param {object} [options] 可选项
   *        {boolean} [options.prefix=true] 是否自动为key加命名空间的前缀
   * @return {object|string|number|array}     值
   */
  LocalStorage.prototype.get = function (key, options) {
    var val;
    if (!this.enable) return null;
    _.defaults((options || (options = {})), {prefix: true});
    val = window.localStorage.getItem(options.prefix ? this.prefix(key): key);
    if (null === val) {
      return null;
    }
    try {
      return JSON.parse(val).data;
    } catch (e) {
      return null;
    }
  };
  /**
   * 获取指定键的类型
   * @method type
   * @for  LocalStorage
   * @param  {string} key 键
   * @param {object} [options] 可选项
   *        {boolean} [options.prefix=true] 是否自动为key加命名空间的前缀
   * @return {string}     类型
   */
  LocalStorage.prototype.type = function (key, options) {
    var val;
    if (!this.enable) return null;
    _.defaults((options || (options = {})), {prefix: true});
    val = window.localStorage.getItem(options.prefix ? this.prefix(key) : key);
    if (null === val) {
      return null;
    }
    try {
      return JSON.parse(val).type;
    } catch (e) {
      return null;
    }
  };
  /**
   * 获取当前命名空间里的键名列表
   * @method keys
   * @param {object} [options] 可选项
   *        {boolean} [options.prefix=false] 输出结果是否包含前缀
   * @for  LocalStorage
   * @return {array} 
   */
  LocalStorage.prototype.keys = function (options) {
    var self, arr, i, len;
    if (!this.enable) return null;
    _.defaults((options || (options = {})), {prefix: false});
    self = this;
    arr = [];
    for (i = 0, len = window.localStorage.length; i < len; i++) {
      arr.push(window.localStorage.key(i));
    }
    arr = _.filter(arr, function (key) {
      return key.slice(0, self._namespace.length + 1) === self._namespace + '-';
    });
    if (options.prefix) {
      return arr;
    } else {
      return _.map(arr, function (key) {
        return key.slice(self._namespace.length + 1);
      });
    }
  };
  /**
   * 移除当前命名空间下指定键或全部键
   * @method  clear
   * @for  LocalStorage
   * @param  {string} [key]  键，若置空则全部清除
   */
  LocalStorage.prototype.clear = function (key) {
    var keys;
    var i, len;
    if (!this.enable) return null;
    if (arguments.length === 0) {
      keys = this.keys({prefix: true});
      for (i = 0, len = keys.length; i < len; i++) {
        window.localStorage.removeItem(keys[i]);
      }
    }
    window.localStorage.removeItem(this.prefix(key));
  };
  /**
   * 获取当前命名空间下所有键值对
   * @method all
   * @for  LocalStorage
   * @param {object} [options]  可选项
   *        {boolean} [options.prefix=false] 输出结果带命名空间前缀
   * @return {object}
   */
  LocalStorage.prototype.all = function (options) {
    var self, obj;
    if (!this.enable) return null;
    _.defaults((options || (options = {})), {prefix: false});
    self = this;
    obj = {};
    if (options.prefix) {
      _.each(self.keys({prefix: true}), function (key) {
        obj[key] = self.get(key, {prefix: false});
      });
    } else {
      _.each(self.keys({prefix: false}), function (key) {
        obj[key] = self.get(key);
      });
    }
    return obj;
  };
  /**
   * 当前环境支持localStorage
   * @property {boolean} enable 支持localStorage
   * @for  LocalStorage
   */
  LocalStorage.prototype.enable = !!window.localStorage;

  var storage = new LocalStorage('nga');
  window.storage = storage;

  module.exports = storage;
});