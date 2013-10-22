define(function (require, exports, module) {
  var BasicCollection = require('modules/daos/abstracts/BasicCollection');
  var PostInTopicModel = require('modules/daos/topic/PostInTopicModel');
  var browser = require('utils/browser');
  var parser = require('modules/daos/topic/parser');
  var config = require('config');

  var PostInTopicCollection = BasicCollection.extend({
    url: browser.isIPhone || config.nakeServer ? '/api/topic' : 'http://bbs.ngacn.cc/read.php',
    model: PostInTopicModel,
    // cache中存放如服务器上数据总行数等信息
    cache: {},
    parse: function (resp) {
      var data = parser(resp);
      window.parserDate = data;
      this.cache.rows = data.rows;
      console.log('account status: ', data.account);
      return data.posts;
    }
  });

  module.exports = PostInTopicCollection;
});