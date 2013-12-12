define(function (require, exports, module) {
  var BasicModel = require('modules/daos/abstracts/BasicModel');
  var parser = require('modules/daos/user/parser');
  var config = require('config/index');
  var Notification = require('utils/Notification');

  var SiteModel = BasicModel.extend({
    url: config.nakeServer ? '/api/user' : 'http://bbs.ngacn.cc/nuke.php',
    xmlOptions: {
      '__lib': 'ucp',
      '__act': 'get'
    },
    parse: function (resp) {
      var data, err;
      if ((err = resp.querySelectorAll('root>error')).length > 0) {
        Notification.alert(err[0].textContent);
        return {error: err[0].textContent};
      } else {
        data = parser(resp);
        return data;
      }
    },
    initialize: function () {
      return this;
    }
  });
  module.exports = SiteModel;
});
