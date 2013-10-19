define(function (require, exports, module) {
  var EventEmitter = require('../EventEmitter/index');
  var template = require('../artTemplate/index');
  /**
   * @module  UI
   */
  /**
   * UI组件的基类
   * @class BaseUI 
   * @constructor
   * @static
   */
  var BaseUI = function (id) {
    this.init.apply(this, arguments);
    return this;
  };
  var Events = new EventEmitter();
  $.extend(BaseUI, Events);
  $.extend(BaseUI.prototype, Events);
  BaseUI.prototype._DEVELOPER = BaseUI._DEVELOPER = false;
  /**
   * @property {string} _id id，同时也是dom中元素的id
   * @for  BaseUI
   * @protected
   */
  BaseUI.prototype._id = BaseUI._id = 'BaseUI';
  /**
   * @property {object} _css  包含的样式名字典
   * @for  BaseUI
   * @potected
   */
  BaseUI.prototype._css = BaseUI._css = {
    base: 'baseUI',
    show: 'showBaseUI'
  };
  /**
   * @property {function} _tpl  返回模板
   * @for  BaseUI
   * @potected
   */
  BaseUI.prototype._tpl = BaseUI._tpl = function () {
    return '<div id="' + this._id + '" class="' + this._css.base + '"></div>';
  };
  /**
   * @property {number} _times  记录调用open方法而未close的次数
   * @for  BaseUI
   * @private
   */
  BaseUI.prototype._times = BaseUI._times = 0;
  /**
   * @property {function} _render 渲染模板
   * @for  BaseUI
   * @private
   */
  BaseUI.prototype._render = BaseUI._render = function (assign) {
    return template.compile(this._tpl())(assign);
  };
  // BaseUI.prototype.beforeInit = BaseUI.beforeInit = function () {};
  // BaseUI.prototype.afterInit = BaseUI.afterInit = function () {};
  // BaseUI.prototype.beforeOpen = BaseUI.beforeOpen = function () {};
  // BaseUI.prototype.afterOpen = BaseUI.afterOpen = function () {};
  // BaseUI.prototype.beforeClose = BaseUI.beforeClose = function () {};
  // BaseUI.prototype.afterClose = BaseUI.afterClose = function () {};
  /**
   * 私有初始化方法
   * @method  _init
   * @param  {string} [id] id，同时也是dom中元素的id
   * @for  BaseUI
   * @protected
   * @return {BaseUI}   this 
   */
  BaseUI.prototype._init = BaseUI._init = function (id) {
    var self = this;
    if (typeof id !== 'undefined') {
      self._id = id;
    }
    self._el = $('#' + self._id);
    if (self._el.length === 0) {
      self.on('open', function () {self._open.apply(self, arguments);});
      self.on('close', function () {self._close.apply(self, arguments);});
      $.each(self.events, function (key, val) {
        if (typeof val === 'string') {
          self.on(key, function () {self[val].apply(self, arguments);});
        } else if (typeof val === 'function') {
          self.on(key, function () {val.apply(self, arguments);});
        }
      });
      self.trigger('beforeInit', arguments);
      self._el = $(self._render()).prependTo('body');
      self.trigger('afterInit', arguments);
    }
    self._times = 0;
    return self;
  };
  /**
   * @property {object} events  额外加入的事件
   * @for  BaseUI
   * @public
   */
  BaseUI.prototype.events = BaseUI.events = {
    'open': function () {
      if (this._DEVELOPER) {
        console.log('ui.open', this._id);
      }
    },
    'close': function () {
      if (this._DEVELOPER) {
        console.log('ui.close', this._id);
      }
    }
  };
  /**
   * 初始化方法
   * @method  init
   * @param  {string} [id] id，同时也是dom中元素的id
   * @for  BaseUI
   * @public
   * @return {BaseUI}   this 
   */
  BaseUI.prototype.init = BaseUI.init = function (id) {
    return this._init.apply(this, arguments);
  };
  /**
   * 打开UI
   * @method open
   * @for  BaseUI
   * @public
   * @return {BaseUI} this
   * @chainable
   */
  BaseUI.prototype.open = BaseUI.open = function () {
    if (!this._el) this.init();
    this.trigger('open', arguments);
    return this;
  };
  /**
   * 关闭UI
   * @method close
   * @for  BaseUI
   * @public
   * @return {BaseUI} this
   * @chainable
   */
  BaseUI.prototype.close = BaseUI.close = function () {
    if (!this._el) this.init();
    this.trigger('close', arguments);
    return this;
  };
  /**
   * 私有打开UI方法
   * @method _open
   * @for  BaseUI
   * @protected
   */
  BaseUI.prototype._open = BaseUI._open = function () {
    if (!this._el) this.init();
    ++this._times;
    this.trigger('beforeOpen', arguments);
    this._el.addClass(this._css.show);
    this.trigger('afterOpen', arguments);
    return this;
  };
  /**
   * 私有关闭UI方法
   * @method  _close
   * @for  BaseUI
   * @protected
   */
  BaseUI.prototype._close = BaseUI._close = function () {
    if (!this._el) this.init();
    --this._times;
    if (this._times <= 0) {
      this._times = 0;
      this.trigger('beforeClose', arguments);
      this._el.removeClass(this._css.show);
      this.trigger('afterClose', arguments);
    }
    return this;
  };
  /**
   * 获取dom元素
   * @method el
   * @for  BaseUI
   * @public
   * @return {jQuery} dom元素
   */
  BaseUI.prototype.el = BaseUI.el = function () {
    if (!this._el) this.init();
    return this._el;
  };
  /**
   * 移除UI对象
   * @method destroy
   * @for  BaseUI
   * @public
   */
  BaseUI.prototype.destroy = BaseUI.destroy = function () {
    var self = this;
    self._el.remove();
    delete self._el;
    self._times = 0;
    self.off('open');
    self.off('close');
    $.each(self.events, function (key, val) {
      if (typeof val === 'string' || typeof val === 'function') {
        self.off(key);
      }
    });
    return self;
  };
  module.exports = BaseUI;
});