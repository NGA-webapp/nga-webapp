define(function (require, exports, module) {
  var toInteger = require('utils/common').toInteger;
  var getNodeText = require('utils/quoUtils').getNodeText;
  var UserModel = Backbone.Model.extend({
    defaults: {
      // 参考 http://bbs.ngacn.cc/read.php?pid=118598780
      "uid": 0, // uid 
      "username": "", // 用户名 
      "medal": 0, // 徽章id 逗号分隔 
      "group": 0, // 用户组 如果是-1使用下一个用户组 
      "member": 0,// 用户组 
      "avatar": "",// 头像 和以前一样 可能是字符串也可能是object 
      "yz": 0, // 激活状态 1激活 0未激活 -1nuke -2往下账号禁用 
      "site": "", // 个人版名 
      "honor": "", // 头衔 
      "reg": 0, // 注册日期 
      "mute": 0, // 禁言到期时间 
      "post": 0, // 发帖数 
      "rvrc": 0, // 威望 
      "money": 0, // 金钱 铜币数 
      "visit": 0, // 最后一次访问 
      "signature": "", // 签名 
      "bit": 0 // 用户状态bit 
    },
    parse: function (node) {
      var $node = $$(node);
      var obj = {
        "uid" : toInteger($node.find('uid').text()),
        "username": $node.find('username').text(),
        "medal": toInteger($node.find('medal').text()),
        "group": toInteger($node.find('groupid').text()),
        "member": toInteger($node.find('memberid').text()),
        "avatar": $node.find('avatar').text(),
        "yz": toInteger($node.find('yz').text()),
        "site": $node.find('site').text(),
        "honor": $node.find('honor').text(),
        "reg": toInteger($node.find('regdate').text()),
        "mute": toInteger($node.find('mute_time').text()),
        "post": toInteger($node.find('postnum').text()),
        "rvrc": toInteger($node.find('rvrc').text()),
        "money": toInteger($node.find('money').text()),
        "visit": toInteger($node.find('thisvisit').text()),
        "signature": $node.find('signature').text(),
        "bit": toInteger($node.find('bit_data').text())
      };
      return obj;
    }
  });

  module.exports = UserModel;
});
