define(function (require, exports, module) {
  var toInteger = require('utils/common').toInteger;
  var getNodeText = require('utils/quoUtils').getNodeText;
  var MedalModel = Backbone.Model.extend({
    defaults: {
      // 参考 http://bbs.ngacn.cc/read.php?tid=6406100&topid=116169942#pid116169942Anchor
      "0":311,//版面ID 
      "1":"游戏综合讨论区",//版面名称 
      "2":"游戏话题来这里讨论"//版面说明 
    },
    parse: function (node) {
      var $node = $$(node);
      var obj = {
        // todo
      };
      return obj;
    }
  });
  module.exports = MedalModel;

});