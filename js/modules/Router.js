define(function (require, exports, module) {
  var ForumView = require('modules/views/forum/Forum');
  var TopicView = require('modules/views/topic/Topic');
  module.exports = function () {
    var routesTable = {
      "": "index",
      "!/forum/:fid": "getForum",
      "!/topic/:tid": "getTopic",
      "!/topic/:tid/p:page": "getTopic",
      "*other": "defaultRoute"
    };
    var Router = Backbone.Router.extend({
      routes: routesTable,
      index: function () {
        console.log('index');
        (this.cached.forumView || (this.cached.forumView = new ForumView())).fetch({fid: 335, page: 1});
        window.f = this.cached.forumView;
      },
      getForum: function (fid) {
        console.log('forum: ' + fid);
      },
      getTopic: function (tid, page) {
        console.log('topic: ' + tid + ', page: ' + (page || 1));
        (this.cached.topicView || (this.cached.topicView = new TopicView())).fetch({tid: 4899639, page: 1});
      },
      defaultRoute: function () {
        console.log('404');
      },
      initialize: function () {
        this.cached = {
          forumView: void 0
        };
        return this;
      }
    });
    return Router;
  };
});
