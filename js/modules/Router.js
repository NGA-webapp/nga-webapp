define(function (require, exports, module) {
  var MenuView = require('modules/views/menu/Menu');
  var ForumView = require('modules/views/forum/Forum');
  var TopicView = require('modules/views/topic/Topic');
  var transition = require('utils/StageTransition');
  var Navigate = require('utils/Navigate');

  module.exports = function () {
    var routesTable = {
      "": "index",
      "!/forum/:fid": "getForum",
      "!/forum/:fid/p:page": "getForum",
      "!/topic/:tid": "getTopic",
      "!/topic/:tid/p:page": "getTopic",
      "!/menu": "getMenu",
      "*other": "defaultRoute"
    };
    var Router = Backbone.Router.extend({
      routes: routesTable,
      // 初始化单例的视图，存入cache
      cacheInitialize: function () {
        this.cached.menuView = this.cached.menuView || new MenuView();
        this.cached.forumView = this.cached.forumView || new ForumView();
        this.cached.topicView = this.cached.topicView || new TopicView();
        window.view = {
          menu: this.cached.menuView,
          forum: this.cached.forumView,
          topic: this.cached.topicView
        };
      },
      index: function () {
        console.log('index');
        this.cacheInitialize();
        Navigate.redirect('!/forum/-7');
      },
      getForum: function (fid, page) {
        console.log('forum: ' + fid, this.cached.forumView);
        this.cacheInitialize();
        transition.toSection(this.cached.forumView);
        this.cached.forumView.fetch({fid: fid, page: (page || 1)});
        this.currentSection = this.cached.forumView;
      },
      getTopic: function (tid, page) {
        tid = tid === 1 ? 6582574 : tid;
        console.log('topic: ' + tid + ', page: ' + (page || 1));
        this.cacheInitialize();
        transition.toSection(this.cached.topicView);
        this.cached.topicView.fetch({tid: tid, page: (page || 1)});
        this.currentSection = this.cached.topicView;
      },
      getMenu: function () {
        this.cacheInitialize();
        transition.openAside(this.cached.menuView);
      },
      defaultRoute: function () {
        alert('404');
        console.log('404');
      },
      initialize: function () {
        // http://stackoverflow.com/questions/11364837/using-backbone-history-to-go-back-without-triggering-route-function
        this.on('route', Navigate.storeRoute);
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
