define(function (require, exports, module) {
  var BaseUI = require('./BaseUI');
  var fullScreen = require('./base/css').fullScreen;
  var config = {
    delay: 5000
  };
  /**
   * @module  UI
   */
  /**
   * 通知UI组件 
   * @class Notification
   * @extends {BaseUI} 
   * @constructor
   * @static
   */
  /**
   * 打开通知UI
   * @method open
   * @param {string} content 消息内容
   * @param {string} [type] 类型, 可为alert/error/success/info
   * @for  Notification
   * @public
   */
  var special = {
    _id: 'NotificationUI',
    _css: {
      base: 'notificationUI',
      show: 'showNotificationUI',
      bg: 'bgNotificationUI',
      son: 'sonNotificationUI',
      shows: {
        base: 'showNotificationUI',
        alert: 'showAlertNotificationUI',
        error: 'showErrorNotificationUI',
        success: 'showSuccessNotificationUI',
        info: 'showInfoNotificationUI'
      }
    },
    _tpl: function () {
      return '<div id="' + this._id + '" class="' + this._css.base + '"><div class="' + this._css.bg + '"></div><div class="' + this._css.son + '"></div></div>';
    },
    _timeout: '',
    afterInit: function (id) {
      fullScreen(this.el().get(0));
    },
    beforeOpen: function (content, type) {
      var self = this;
      var i;
      for (i in self._css.shows) {
        self.el().removeClass(self._css.shows[i]);
      }
      if (typeof type === 'string' && typeof self._css.shows[type] === 'string') {
        self._css.show = self._css.shows[type] + ' ' + self._css.shows.base;
      } else {
        self._css.show = self._css.shows.alert + ' ' + self._css.shows.base;
      }
      self.el().children('.' + self._css.son).html(content);
      self.el().children('.' + self._css.bg).on('click.notificationUI', function () {
        self.close();
      });
      this._timeout = setTimeout(function () {
        self.close();
      }, config.delay);
    },
    beforeClose: function (content) {
      this.el().children('.' + this._css.bg).off('click.modalUI');
      if (this._timeout) {
        clearTimeout(this._timeout);
      }
    },
    events: {
      'afterInit': 'afterInit',
      'beforeOpen': 'beforeOpen',
      'beforeClose': 'beforeClose'
    }
  };
  var Notification = function () {
    return BaseUI.apply(this, arguments);
  };
  $.extend(special.events, BaseUI.events);
  $.extend(Notification, BaseUI, special);
  $.extend(Notification.prototype, BaseUI.prototype, special);
  module.exports = Notification;

});