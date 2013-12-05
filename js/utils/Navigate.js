define(function (require, exports, module) {
  var transition = require('utils/StageTransition');

  var flag = {
    backing: false
  };
  var history = [];
  var redirect = function (url) {
    Backbone.history.navigate(url, {trigger: true});
  };
  var aside = function (url, whenAsideClose) {
    transition.setWhenAsideClose(whenAsideClose);
    Backbone.history.navigate(url, {trigger: true});
  };
  var back = function () {
    // if (view) {
    if (flag.backing) {
      return false;
    }
    flag.backing = true;
    // 2013.12.05 app里第一条记录为''， 第二条记录才是bootup完成后的首页
    // 所以为了防止回到bootup页，后退到第二条记录时就不应该再推出记录
    if (history.length > 2) {
      Backbone.history.navigate(history[history.length - 2]);
      history.pop();
    } else if (history.length === 2) {
      Backbone.history.navigate(history[1], {trigger: true});
    } else {
      // 防止异常情况，在没有第二条记录时重新进入bootup
      Backbone.history.navigate('', {trigger: true});
    }
    transition.switchBack();
    flag.backing = false;
    // } else {
    //   Backbone.history.history.back();
    // }
  };
  var storeRoute = function () {
    history.push(Backbone.history.fragment);
  };

  exports.redirect = redirect;
  exports.aside = aside;
  exports.back = back;
  exports.storeRoute = storeRoute;
});