define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var ui = require('utils/ui/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var tpl = require('templates/logout/logout.tpl');
  var tplContent = require('templates/logout/content.tpl');
  var appCache = require('modules/AppCache').appCache;
  var Notification = require('utils/Notification'); 

  // var logoutUrl = 'http://account.178.com/q_account.php?_act=logout';
  var logoutUrl = 'http://bbs.ngacn.cc/nuke.php';

  var LogoutView = BasicView.extend({
    el: '#logout',
    tpl: art.compile(tpl),
    tplContent: art.compile(tplContent),
    flag: {
      init: true, // 初始化
      requesting: false, // 正在请求
    },
    events: {
      'singleTap .action-logout': 'doLogout',
      'swipeRight header+article': 'openLeftSider',
      'swipe .asideMask': 'closeSider',
      'tap .asideMask': 'closeSider',
      'tap .action-aside': 'openLeftSider',
    },
    doLogout: function () {
      var self, username ,password;
      if (this.flag.requesting) {
        return false;
      }
      self = this;
      self.flag.requesting = true;
      console.log('connect start');
      ui.Loading.open();
      $.post(logoutUrl, {func: 'logout', no_auto_login: 1}, function () {
        Notification.alert('登出成功', function () {
          ui.Loading.close();
          appCache.get('loginView').nextAction.success = function () {appCache.get('bootupView').introFunc();};
          Backbone.stage.change('#!/login', ['bounce-top', 'bounce-bottom']);
          self.flag.requesting = false;
        });
      });
      return false;
    },
    openLeftSider: function () {
      var self = this;
      self.$el.find('.asideMask').addClass('on');
      Backbone.aside.onceAfterHide(function () {
        self.$el.find('.asideMask').removeClass('on');
      });
      Backbone.aside.show('menu', ['', 'slide-left']);
    },
    closeSider: function () {
      Backbone.aside.hide(['', 'slide-left']);
    },
    render: function () {
      this.$el.html(this.tpl());
      this.$content = this.$el.find('.content');
      this._refresh();
      return this;
    },
    _refresh: function () {
      var self = this;
      if (!self.flag.init) {
        ui.Loading.open();
      }
      this.$content.html(this.tplContent({}));
      this.$content.removeClass('hide').addClass('show');
      if (!self.flag.init) {
        _.delay(function () {
          ui.Loading.close();
        }, 200);
      }
      self.flag.init = false;
    },
    initialize: function () {
      this.$content = this.$el.find('.content');
      return this.render();
    }
  });
  module.exports = LogoutView;
});
