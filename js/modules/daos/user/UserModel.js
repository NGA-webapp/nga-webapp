define(function (require, exports, module) {
  var BasicModel = require('modules/daos/abstracts/BasicModel');
  var browser = require('utils/browser');
  var parser = require('modules/daos/user/parser');
  var config = require('config/index');

  var SiteModel = BasicModel.extend({
    url: browser.isIPhone || config.nakeServer ? '/api/user' : 'http://bbs.ngacn.cc/nuke.php',
    xmlOptions: {
      '__lib': 'ucp',
      '__act': 'get'
    },
    parse: function (resp) {
      console.log(resp);
      var data = parser(resp);
      console.log(data);
      return data;
    },
    initialize: function () {
      return this;
    }
  });
  module.exports = SiteModel;
});
