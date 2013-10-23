define(function (require, exports, module) {
  var Router = require('modules/Router')();
  var router = new Router();
  Backbone.$ = $;
  Backbone.history.start();


  // 禁用移动设备对body的滚动
  document.addEventListener('touchmove', function (e) {
      e.preventDefault();
  }, false);
  
  require('utils/LocalStorage');

});
