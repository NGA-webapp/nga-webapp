define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var ui = require('utils/ui/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var tpl = require('templates/logout/logout.tpl');
  var tplContent = require('templates/logout/content.tpl');
  var Navigate = require('utils/Navigate');
  var appCache = require('modules/AppCache').appCache;
  var Notification = require('utils/Notification'); 

  // var logoutUrl = 'http://account.178.com/q_account.php?_act=logout';
  var logoutUrl = 'http://nga.178.com/nuke.php';

  var LogoutView = BasicView.extend({
    el: '#logout',
    tpl: art.compile(tpl),
    tplContent: art.compile(tplContent),
    flag: {
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
      $.post(logoutUrl, {func: 'logout', do_not_multi_login: 1}, function () {
        Notification.alert('登出成功', function () {
          ui.Loading.close();
          appCache.get('loginView').nextAction.success = function () {appCache.get('bootupView').introFunc();};
          Navigate.redirect('#!/login');
          self.flag.requesting = false;
        });
      });
      return false;
    },
    openLeftSider: function () {
      // this.$el.addClass('section-sider-left');
      var self = this;
      Navigate.aside('#!/menu', function () {
        self.$el.find('.asideMask').removeClass('on');
      });
      self.$el.find('.asideMask').addClass('on');
    },
    closeSider: function () {
      Navigate.back();
    },
    render: function () {
      this.$el.html(this.tpl());
      this.$content = this.$el.find('.content');
      this._refresh();
      return this;
    },
    _refresh: function () {
      var self = this;
      ui.Loading.open();
      this.$content.html(this.tplContent({}));
      this.$content.removeClass('hide').addClass('show');
      _.delay(function () {
        ui.Loading.close();
      }, 200);

    },
    initialize: function () {
      this.$content = this.$el.find('.content');
      return this.render();
    }
  });
  module.exports = LogoutView;
});
