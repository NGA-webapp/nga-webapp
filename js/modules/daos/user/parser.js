define(function (require, exports, module) {
  var toInteger = require('utils/common').toInteger;

  var getUser = function (node) {
    var $node = $(node);
    // 头像格式未确定，暂时理解为两种
    // 第一种直接返回整个url
    // 第二种返回以/*$js$*/开头，并接一个json，json中的[0][0]为url
    // 但第二种格式未确定是否正确，所以用正则取url
    // @ 2013.10.25, 修正第二种正则格式，可能不带/*$js$*/开头，直接以{"l"...}的形式出现
    var getAvatarUrl = function (text) {
      var tmp;
      if (!!text.match(/^\/\*\$js\$\*\//) || !!text.match(/^\{\"l\"/)) {
        tmp = text.match(/\"(http:\/\/.*?)\"/i);
        if (tmp.length > 1) {
          return tmp[1];
        }
      }
      return text;
    };
    return {
      "id" : toInteger($node.find('uid').text()),
      "uid" : toInteger($node.find('uid').text()),
      "username": $node.find('username').text(),
      "groupName": $node.find('group').text(),
      "member": toInteger($node.find('memberid').text()),
      "avatar": getAvatarUrl($node.find('avatar').text()),
      "reg": toInteger($node.find('regdate').text()),
      "mute": toInteger($node.find('muteTime').text()),
      "posts": toInteger($node.find('posts').text()),
      "fame": toInteger($node.find('fame').text()),
      "rvrc": toInteger($node.find('rvrc').text()),
      "money": toInteger($node.find('money').text()),
      "title": $node.find('title').text(),
      "honor": $node.find('honor').text(),
      "sign": $node.find('sign').text(),
      "bit": toInteger($node.find('bit').text())
    };
  };

  var toCustom = function (user) {
    var obj;
    obj = {
      user: user,
    };
    return obj;
  };

  var parser = function (resp) {
    var $resp = $(resp);
    var $user;
    var user;
    $user = $resp.find('data>item').get(0);
    user = getUser($user);
    return toCustom(user);
  };

  module.exports = parser;
});