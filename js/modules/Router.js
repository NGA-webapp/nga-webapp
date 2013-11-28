define(function (require, exports, module) {
  var SiteModel = require('modules/daos/site/SiteModel');
  var MenuView = require('modules/views/menu/Menu');
  var ForumsView = require('modules/views/forums/Forums');
  var ForumView = require('modules/views/forum/Forum');
  var TopicView = require('modules/views/topic/Topic');
  var UserView = require('modules/views/user/User');
  var LoginView = require('modules/views/login/Login');
  var LogoutView = require('modules/views/logout/Logout');
  var SettingView = require('modules/views/setting/Setting');
  var BootupView = require('modules/views/bootup/Bootup');
  var appCache = require('modules/AppCache').appCache;
  var transition = require('utils/StageTransition');
  var Navigate = require('utils/Navigate');

  module.exports = function () {
    var routesTable = {
      "": "index",
      "!/bootup": "index",
      "!/forums": "getForums",
      "!/forum/:fid": "getForum",
      "!/forum/:fid/p:page": "getForum",
      "!/topic/:tid": "getTopic",
      "!/topic/:tid/p:page": "getTopic",
      "!/user/:uid": "getUser",
      "!/login": "getLogin",
      "!/logout": "getLogout",
      "!/menu": "getMenu",
      "!/setting": "getSetting",
      "!/setting/favor": "getSettingFavor",
      "*other": "defaultRoute"
    };
    var Router = Backbone.Router.extend({
      routes: routesTable,
      // 初始化单例的视图，存入cache
      cacheInitialize: function () {
        appCache.initialize(function () {
          var data = {};
          data.siteModel = new SiteModel();
          data.menuView = new MenuView();
          data.forumsView = new ForumsView();
          data.forumView = new ForumView();
          data.topicView = new TopicView();
          data.userView = new UserView();
          data.loginView = new LoginView();
          data.logoutView = new LogoutView();
          data.settingView = new SettingView();
          data.bootupView = new BootupView();
          return data;
        });
        this.cached = appCache.get();
        window.cached = this.cached;
      },
      index: function () {
        console.log('index');
        this.cacheInitialize();
        this.cached.bootupView.bootup();
        transition.toSection(this.cached.bootupView);
        // Navigate.redirect('!/forum/-7');
        // Navigate.redirect('!/login');
      },
      getForums: function () {
        console.log('forums: ');
        this.cacheInitialize();
        transition.toSection(this.cached.forumsView);
        this.cached.forumsView.open();
      },
      getForum: function (fid, page) {
        console.log('forum: ' + fid, this.cached.forumView);
        this.cacheInitialize();
        transition.toSection(this.cached.forumView);
        this.cached.forumView.fetch({fid: fid, page: (page || 1)});
      },
      getTopic: function (tid, page) {
        tid = tid === 1 ? 6582574 : tid;
        console.log('topic: ' + tid + ', page: ' + (page || 1));
        this.cacheInitialize();
        transition.toSection(this.cached.topicView);
        this.cached.topicView.fetch({tid: tid, page: (page || 1)});
      },
      getUser: function (uid) {
        console.log('user: ' + uid);
        this.cacheInitialize();
        transition.toSection(this.cached.userView);
        this.cached.userView.fetch({uid: uid});
      },
      getLogin: function () {
        console.log('login: ');
        this.cacheInitialize();
        transition.toSection(this.cached.loginView);
      },
      getLogout: function () {
        console.log('logout: ');
        this.cacheInitialize();
        transition.toSection(this.cached.logoutView);
      },
      getMenu: function () {
        this.cacheInitialize();
        transition.openAside(this.cached.menuView);
      },
      getSetting: function () {
        console.log('setting: ');
        this.cacheInitialize();
        transition.toSection(this.cached.settingView);
      },
      getSettingFavor: function () {
        console.log('setting favor: ');
        this.cacheInitialize();
        transition.toSection(this.cached.forumsView);
        this.cached.forumsView.open(true);
      },
      defaultRoute: function () {
        alert('404');
        console.log('404');
      },
      initialize: function () {
        // http://stackoverflow.com/questions/11364837/using-backbone-history-to-go-back-without-triggering-route-function
        var self = this;
        this.on('route', Navigate.storeRoute);
        this.on('route', function (route, param) {
          // todo 暂时没有考虑后退的情况，可能需要为Navigate重新封装出一系列事件
          // 延迟处理input，是为了防止在切换页面时手误选中下一个页面的input
          _.delay(function () {
            if (route === 'getMenu') {
              self.cached.menuView.$el.find('.search-box input').attr('disabled', null);
            } else {
              self.cached.menuView.$el.find('input').attr('disabled', 'disabled');
            }
            if (route === 'getLogin') {
              self.cached.loginView.$el.find('input').attr('disabled', null);
              self.cached.loginView.$el.find('button').attr('disabled', null);
            } else {
              self.cached.loginView.$el.find('input').attr('disabled', 'disabled');
              self.cached.loginView.$el.find('button').attr('disabled', 'disabled');
            }
          }, 800);
        });
        this.cached = {
          forumView: void 0,
          topicView: void 0
        };
        return this;
      }
    });
    return Router;
  };
});
