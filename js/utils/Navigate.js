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
    if (history.length > 1) {
      Backbone.history.navigate(history[history.length - 2]);
      history.pop();
    } else {
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

window.t = transition;
  exports.redirect = redirect;
  exports.aside = aside;
  exports.back = back;
  exports.storeRoute = storeRoute;
});