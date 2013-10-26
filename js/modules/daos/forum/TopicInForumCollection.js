define(function (require, exports, module) {
  var BasicCollection = require('modules/daos/abstracts/BasicCollection');
  var TopicInForumModel = require('modules/daos/forum/TopicInForumModel');
  var browser = require('utils/browser');
  var parser = require('modules/daos/forum/parser');
  var config = require('config/index');

  var TopicInForumCollection = BasicCollection.extend({
    url: browser.isIPhone || config.nakeServer ? '/api/forum' : 'http://bbs.ngacn.cc/thread.php',
    model: TopicInForumModel,
    // cache中存放如服务器上数据总行数等信息
    cache: {},
    parse: function (resp) {
      var data = parser(resp);
      this.cache.rows = data.rows;
      this.cache.fid = data.forum.fid;
      console.log('account status: ', data.account);
      return data.topics;
    }
  });

  module.exports = TopicInForumCollection;
});