define(function (require, exports, module) {
  // 一系列的消息方法
  // 在phonegap没有引入的情况下回滚到浏览器本身的方法运行

  var getNotif = function () {
    if (typeof cordova !== 'undefined') {
      return cordova.require('org.apache.cordova.core.dialogs.notification');
    }
  };

  var noop = function () {};

  var alert = function (message, callback, title, buttonName) {
    var notif = getNotif();
    message = message + '';
    callback = callback || noop;
    title = title || 'NGA';
    if (notif && notif.alert) {
      notif.alert(message, callback, title, buttonName);
    } else {
      callback(window.alert(message));
    }
  };
  var confirm = function (message, callback, title, buttonName) {
    var notif = getNotif();
    message = message + '';
    callback = callback || noop;
    title = title || 'NGA';
    if (notif && notif.confirm) {
      notif.confirm(message, callback, title, buttonName);
    } else {
      callback(window.confirm(message));
    }
  };
  var prompt = function (message, callback, title, buttonName, defaultText) {
    var notif = getNotif();
    message = message + '';
    callback = callback || noop;
    title = title || 'NGA';
    if (notif && notif.prompt) {
      notif.prompt(message, callback, title, buttonName, defaultText);
    } else {
      callback(window.prompt(message, defaultText));
    }
  };

  window.a = alert;

  exports.alert = alert;
  exports.confirm = confirm;
  exports.prompt = prompt;

});