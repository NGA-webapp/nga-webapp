define(function (require, exports, module) {
  var toInteger = require('utils/common').toInteger;
  var getNodeText = require('utils/quoUtils').getNodeText;
  var BasicModel = require('modules/models/abstracts/Basic');
  var AccountModel = require('modules/models/data/Account');
  var UserCollection = require('modules/collections/data/Users');
  var PostCollection = require('modules/collections/data/Posts');
  var TopicModel = require('modules/models/data/Topic');
  var config = require('config/index');

  var ReadModel = BasicModel.extend({
    // url: 'http://bbs.ngacn.cc/read.php',
    url: config.nakeServer ? '/api/topic' : 'http://bbs.ngacn.cc/read.php',
    defaults: {
      "account": {},
      "users": {},
      "posts": {},
      "topic": {},
      "rows": 0,
      "thisRows": 0,
      "perRows": 20,
    },
    parse: function (resp) {
      window.resp = resp;
      var $resp = $$(resp);
      return {
        account: new AccountModel($resp.find('__CU').get(0), {parse: true}),
        users: new UserCollection($resp.find('__U>item'), {parse: true}),
        posts: new PostCollection($resp.find('__R>item'), {parse: true}),
        topic: new TopicModel($resp.find('__T').get(0), {parse: true}),
        rows: toInteger($resp.find('__ROWS').text()),
        thisRows: toInteger($resp.find('__R__ROWS').text()),
        perRows: toInteger($resp.find('__R__ROWS_PAGE').text())
      };
    },
  });
  module.exports = ReadModel;
});
