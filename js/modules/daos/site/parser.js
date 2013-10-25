define(function (require, exports, module) {
  var toInteger = require('utils/common').toInteger;
  
  var getAccount = function (node) {
    var $node = $(node);
    return {
      "uid": toInteger($node.find('uid').text()),
      "groupBit": toInteger($node.find('group_bit').text()),
      "admin": toInteger($node.find('admincheck').text()),
      "rvrc": toInteger($node.find('rvrc').text())
    };
  };

  var toCustom = function (account) {
    var obj;
    obj = {
      account: account,
      isLogged: !!account.uid
    };
    return obj;
  };

  var parser = function (resp) {
    var $resp = $(resp);
    var $account;
    var account;
    $account = $resp.find('__CU').get(0);
    account = getAccount($account);
    return toCustom(account);
  };

  module.exports = parser;
});