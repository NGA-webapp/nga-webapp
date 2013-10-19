define(function (require, exports, module) {
  var ForumView = require('modules/views/forum/Forum');
  module.exports = function () {
    var routesTable = {
      "": "index",
      "!/forum/:fid": "getForum",
      "*other": "defaultRoute"
    };
    var Router = Backbone.Router.extend({
      routes: routesTable,
      index: function () {
        console.log('index');
        var forumView = new ForumView();
        forumView.fetch({fid: 335, page: 1});
        window.f = forumView;
      },
      getForum: function (fid) {
        console.log('forum: ' + fid);
      },
      defaultRoute: function () {
        console.log('404');
      },
      intialize: function () {
        this.cached = {

        };
      }
    });
    return Router;
  };
});
