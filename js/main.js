define(function (require, exports, module) {
  var Router = require('modules/Router')();
  var Stage = require('utils/Stage');
  var Aside = require('utils/Aside');
  // add custom plugin
  var preload = require('utils/preload');
  var flash = require('utils/flash');
  var router;
  Backbone.stage = new Stage();
  Backbone.aside = new Aside();
  Backbone.$ = $;
  router = new Router();
  Backbone.history.start();

  // 禁用移动设备对body的滚动
  document.addEventListener('touchmove', function (e) {
    if (!_.contains(['TEXTAREA', 'INPUT', 'SELECT'], e.target.nodeName)) {
      e.preventDefault();
    }
  }, false);

  document.addEventListener('deviceready', function () {
    if (cordova) {
      cordova.require('org.apache.cordova.splashscreen.SplashScreen').hide();
    }
  });

});
