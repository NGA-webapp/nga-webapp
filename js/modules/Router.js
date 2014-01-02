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
  var PublishView = require('modules/views/publish/Publish');
  var BootupView = require('modules/views/bootup/Bootup');
  var appCache = require('modules/AppCache').appCache;
  var transition = require('utils/StageTransition');
  var Navigate = require('utils/Navigate');
  var siteStorage = require('modules/storage/site');
  var Notification = require('utils/Notification');
  var stage = require('utils/Stage');

  module.exports = function () {
    var routesTable = {
      "": "index",
      "!/bootup": "index",
      "!/forums": "getForums",
      "!/forum/:fid": "getForum",
      "!/forum/:fid/p:page": "getForum",
      "!/favor": "getFavor",
      "!/favor/p:page": "getFavor",
      "!/search/:keyword": "getSearch",
      "!/search/:keyword/p:page": "getSearch",
      "!/topic/:tid": "getTopic",
      "!/topic/:tid/p:page": "getTopic",
      "!/user/uid/:uid": "getUserByUid",
      "!/user/username/:username": "getUserByUsername",
      "!/login": "getLogin",
      "!/logout": "getLogout",
      "!/menu": "getMenu",
      "!/setting": "getSetting",
      "!/setting/favor": "getSettingFavor",
      "!/publish/:fid": "getPublish",
      "!/publish/:fid/:tid": "getPublish",
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
          data.publishView = new PublishView();
          data.bootupView = new BootupView();
          return data;
        });
        this.cached = appCache.get();
        window.cached = this.cached;
      },
      stageInitialize: function () {
        this.cached.forumsView.$el.addClass('stage-animate-out');
        this.cached.forumView.$el.addClass('stage-animate-out');
        this.cached.topicView.$el.addClass('stage-animate-out');
        this.cached.userView.$el.addClass('stage-animate-out');
        this.cached.loginView.$el.addClass('stage-animate-out');
        this.cached.logoutView.$el.addClass('stage-animate-out');
        this.cached.settingView.$el.addClass('stage-animate-out');
        this.cached.publishView.$el.addClass('stage-animate-out');
        this.cached.logoutView.$el.addClass('stage-animate-out');
        this.cached.bootupView.$el.addClass('stage-animate-in');
        this.cached.menuView.$el.addClass('aside-animate-aside-out');
      },
      index: function () {
        console.log('index');
        this.cached.bootupView.bootup();
        // transition.toSection(this.cached.bootupView);
      },
      getForums: function () {
        console.log('forums: ');
        // transition.toSection(this.cached.forumsView);
        this.cached.forumsView.open();
      },
      getForum: function (fid, page) {
        console.log('forum: ' + fid, this.cached.forumView);
        // transition.toSection(this.cached.forumView);
        this.cached.forumView.fetch({fid: fid, page: (page || 1)}, {remove: true});
        siteStorage.addLastForum(fid);
      },
      getFavor: function (page) {
        console.log('forum: favor', this.cached.forumView);
        // transition.toSection(this.cached.forumView);
        this.cached.forumView.fetch({favor: 1, page: (page || 1)}, {remove: true});
      },
      getSearch: function (keyword, page) {
        console.log('forum: search', this.cached.forumView);
        // transition.toSection(this.cached.forumView);
        this.cached.forumView.fetch({key: keyword, fidgroup: 'user', page: (page || 1)}, {remove: true});
      },
      getTopic: function (tid, page) {
        tid = tid === 1 ? 6582574 : tid;
        console.log('topic: ' + tid + ', page: ' + (page || 1));
        // transition.toSection(this.cached.topicView);
        this.cached.topicView.fetch({tid: tid, page: (page || 1)});
      },
      getUserByUid: function (uid) {
        console.log('user: ' + uid);
        // transition.toSection(this.cached.userView);
        this.cached.userView.fetch({uid: uid});
      },
      getUserByUsername: function (username) {
        console.log('user: ' + username);
        // transition.toSection(this.cached.userView);
        this.cached.userView.fetch({username: username});
      },
      getLogin: function () {
        console.log('login: ');
        // transition.toSection(this.cached.loginView);
      },
      getLogout: function () {
        console.log('logout: ');
        // transition.toSection(this.cached.logoutView);
      },
      getMenu: function () {
        // transition.openAside(this.cached.menuView);
      },
      getSetting: function () {
        console.log('setting: ');
        // transition.toSection(this.cached.settingView);
      },
      getSettingFavor: function () {
        console.log('setting favor: ');
        // transition.toSection(this.cached.forumsView);
        this.cached.forumsView.open(true);
      },
      getPublish: function (fid, tid) {
        tid = typeof tid === 'undefined' ? 0 : tid;
        console.log('publish: ' + fid + ',' + tid);
        // transition.toSection(this.cached.publishView);
        this.cached.publishView.open(fid, tid);
      },
      defaultRoute: function () {
        Notification.alert('穿越了哦亲');
        console.log('404');
      },
      initialize: function () {
        // http://stackoverflow.com/questions/11364837/using-backbone-history-to-go-back-without-triggering-route-function
        var self = this;
        this.on('route', Navigate.storeRoute);
        this.on('route', function (route, param) {
          // todo 暂时没有考虑后退的情况，可能需要为Navigate重新封装出一系列事件
          // 延迟处理input，是为了防止在切换页面时手误选中下一个页面的input
          var enableInput = function () {
            if (route === 'getMenu') {
              self.cached.menuView.$el.find('.search-box input').attr('disabled', null);
            }
            if (route === 'getLogin') {
              self.cached.loginView.$el.find('input').attr('disabled', null);
              self.cached.loginView.$el.find('button').attr('disabled', null);
            }
            if (route === 'getPublish') {
              self.cached.publishView.$el.find('input').attr('disabled', null);
              self.cached.publishView.$el.find('textarea').attr('disabled', null);
            }
          };
          var disableInput = function () {
            self.cached.menuView.$el.find('input').attr('disabled', 'disabled').blur();
            self.cached.loginView.$el.find('input').attr('disabled', 'disabled').blur();
            self.cached.loginView.$el.find('button').attr('disabled', 'disabled').blur();
            self.cached.publishView.$el.find('input').attr('disabled', 'disabled').blur();
            self.cached.publishView.$el.find('textarea').attr('disabled', 'disabled').blur();
          };
          disableInput();
          _.delay(enableInput, 800);
        });
        Backbone.history.on('route', function () {
          if (Backbone.history._historyStack.length === 0) {
            Backbone.history._historyStack = [Backbone.history.getFragment()];
            Backbone.stage.change('#' + Backbone.history.getFragment());
          } else {
            if (this.getFragment(Backbone.stage.getLastFragment()) === this.getFragment()) {
              return true;
            } else {
              Backbone.stage.change('#' + this.getFragment());
            }
          }
        });
        this.cacheInitialize();
        this.stageInitialize();
        Backbone.stage.setMap({
          "": appCache.get('bootupView'),
          "!/bootup": appCache.get('bootupView'),
          "!/forums": appCache.get('forumsView'),
          "!/forum/:fid": appCache.get('forumView'),
          "!/forum/:fid/p:page": appCache.get('forumView'),
          "!/favor": appCache.get('forumView'),
          "!/favor/p:page": appCache.get('forumView'),
          "!/search/:keyword": appCache.get('forumView'),
          "!/search/:keyword/p:page": appCache.get('forumView'),
          "!/topic/:tid": appCache.get('topicView'),
          "!/topic/:tid/p:page": appCache.get('topicView'),
          "!/user/uid/:uid": appCache.get('userView'),
          "!/user/username/:username": appCache.get('userView'),
          "!/login": appCache.get('loginView'),
          "!/logout": appCache.get('logoutView'),
          "!/setting": appCache.get('settingView'),
          "!/setting/favor": appCache.get('forumsView'),
          "!/publish/:fid": appCache.get('publishView'),
          "!/publish/:fid/:tid": appCache.get('publishView'),
          "*other": appCache.get('bootupView')
        });
        Backbone.aside.setMap({
          'menu': appCache.get('menuView')
        });
        Backbone.stage.setCurrentView(appCache.get('bootupView'));
        return this;
      }
    });
    return Router;
  };
});
