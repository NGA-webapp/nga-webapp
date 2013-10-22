define(function (require, exports, module) {
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
      "*other": "defaultRoute"
    };
    var Router = Backbone.Router.extend({
      routes: routesTable,
      // 初始化单例的视图，存入cache
      cacheInitialize: function () {
        this.cached.forumView = this.cached.forumView || new ForumView();
        this.cached.topicView = this.cached.topicView || new TopicView();
      },
      index: function () {
        console.log('index');
        this.cacheInitialize();
        Navigate.redirect('!/forum/335');
      },
      getForum: function (fid, page) {
        console.log('forum: ' + fid, this.cached.forumView);
        this.cacheInitialize();
        transition.switchTo(this.cached.forumView);
        this.cached.forumView.fetch({fid: fid, page: (page || 1)});
        this.currentSection = this.cached.forumView;
      },
      getTopic: function (tid, page) {
        tid = tid === 1 ? 6582574 : tid;
        console.log('topic: ' + tid + ', page: ' + (page || 1));
        this.cacheInitialize();
        transition.switchTo(this.cached.topicView);
        this.cached.topicView.fetch({tid: tid, page: (page || 1)});
        this.currentSection = this.cached.topicView;
      },
      defaultRoute: function () {
        alert('404');
        console.log('404');
      },
      initialize: function () {
        // http://stackoverflow.com/questions/11364837/using-backbone-history-to-go-back-without-triggering-route-function
        this.on('all', Navigate.storeRoute);
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
