define(function (require, exports, module) {
  var toInteger = require('utils/common').toInteger;
  var getNodeText = require('utils/quoUtils').getNodeText;
  var BasicModel = require('modules/models/abstracts/Basic');
  var AccountModel = require('modules/models/data/Account');
  var ForumModel = require('modules/models/data/Forum');
  var TopicCollection = require('modules/collections/data/Topics');
  var browser = require('utils/browser');

  var ThreadModel = BasicModel.extend({
    // url: 'http://bbs.ngacn.cc/thread.php',
    url: browser.isIPhone ? '/api/forum' : 'http://bbs.ngacn.cc/thread.php',
    defaults: {
      "account": {},
      "forum": {},
      "topics": {},
      "rows": 0,
      "thisRows": 0,
      "perRows": 35
    },
    parse: function (resp) {
      window.resp = resp;
      var $resp = $$(resp);
      return {
        account: new AccountModel($resp.find('__CU').get(0), {parse: true}),
        forum: new ForumModel($resp.find('__F').get(0), {parse: true}),
        topics: new TopicCollection($resp.find('__T>item'), {parse: true}),
        rows: toInteger($resp.find('__ROWS').text()),
        thisRows: toInteger($resp.find('__T__ROWS').text()),
        perRows: toInteger($resp.find('__T__ROWS_PAGE').text())
      };
    }
  });
  module.exports = ThreadModel;
});
