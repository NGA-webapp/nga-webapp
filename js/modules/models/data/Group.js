define(function (require, exports, module) {
  var toInteger = require('utils/common').toInteger;
  var getNodeText = require('utils/quoUtils').getNodeText;
  var GroupModel = Backbone.Model.extend({
    defaults: {
      // 参考 http://bbs.ngacn.cc/read.php?pid=118598780
     "gid": 0, // 用户组id 
     "name": "", // 用户组名
     "bit": 0 // 用户组属性bit 
    },
    parse: function (node) {
      var $node = $$(node);
      var obj = {
        // todo
      };
      return obj;
    }
  });
  module.exports = GroupModel;
});
