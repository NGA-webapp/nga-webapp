define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var ui = require('utils/ui/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var tpl = require('templates/bootup/bootup.tpl');
  var tplContent = require('templates/bootup/content.tpl');
  var Navigate = require('utils/Navigate');
  var browser = require('utils/browser');
  var config = require('config/index');
  var appCache = require('modules/AppCache').appCache;
  var siteStorage = require('modules/storage/site');
  var sliceSubject = require('utils/common').sliceSubject;

  var BootupView = BasicView.extend({
    el: '#bootup',
    tpl: art.compile(tpl),
    tplContent: art.compile(tplContent),
    events: {
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
    redirect: function (url) {
      _.delay(function () {
        Navigate.redirect(url);
      }, 400);
    },
    // 登入后的跳转
    introFunc: function () {
      var quickForum;
      var self = this;
      var fid, forum;
      quickForum = siteStorage.getQuickForum();
      if (quickForum.length > 0) {
        self.log('检查快速导航...已设置.');
        fid = quickForum[0];
        self.redirect('#!/forum/' + fid);
        appCache.get('menuView').uiCurrentForum(fid);
        forum = _.find(siteStorage.getForumList(), function (forum) {
          return forum.fid == fid;
        });
        if (forum) {
          appCache.get('forumView').$el.find('header .subject').text(sliceSubject(forum.name));
        }
      } else {
        self.log('检查快速导航...未设置.');
        self.redirect('#!/forums');
      }
    },
    // 启动
    bootup: function () {
      var self = this;
      var ForumsModel = require('modules/daos/forums/ForumsModel');
      var forumsModel = new ForumsModel();
      forumsModel.fetchXml();
      // if (!siteStorage.isInit()) {
      //   self.redirect('#!/start');
      // } else {
        self.log('检查登录状态...');
        siteStorage.checkLogged(function (isLogged) {
          if (isLogged) {
            self.log('检查登录状态...已登录.');
            self.log('检查快速导航...');
            self.introFunc();
          } else {
            self.log('检查登录状态...未登录.');
            appCache.get('loginView').nextAction.success = function () {self.introFunc();};
            self.redirect('#!/login');
          }
        });
      // }
    },
    log: function (text) {
      console.log('Bootup: ' + text);
      this.$el.find('.content').append('<p>' + text + '</p>');
    },
    initialize: function () {
      this.$content = this.$el.find('.content');
      return this.render();
    }
  });
  module.exports = BootupView;
});
