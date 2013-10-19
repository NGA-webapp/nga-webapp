define(function (require, exports, module) {
  var toInteger = require('utils/common').toInteger;
  var getNodeText = require('utils/quoUtils').getNodeText;
  // 当前登录账号
  var AccountModel = Backbone.Model.extend({
    defaults: {
      // 参考 http://bbs.ngacn.cc/read.php?tid=6406100&topid=115692624#pid115692624Anchor
      "uid": 0, // 用户id
      "groupBit": 0, // 用户权限bti
      "admin": 0, // 用户是否在当前页有部分权限
      "rvrc": 0 // 用户的威望(论坛的威望显示值是此数值/10
    },
    parse: function (node) {
      var $node = $$(node);
      var obj = {
        "uid": toInteger($node.find('uid').text()),
        "groupBit": toInteger($node.find('group_bit').text()),
        "admin": toInteger($node.find('admincheck').text()),
        "rvrc": toInteger($node.find('rvrc').text())
      };
      return obj;
    }
  });
  module.exports = AccountModel;
});
