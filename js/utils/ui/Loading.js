define(function (require, exports, module) {
  var BaseUI = require('./BaseUI');
  var fullScreen = require('./base/css').fullScreen;
  /**
   * @module  UI
   */
  var special = {
    _id: 'LoadingUI',
    _css: {
      base: 'loadingUI',
      show: 'showLoadingUI'
    },
    afterInit: function (id) {
      // fullScreen(this.el().get(0));
    },
    events: {
      'afterInit': 'afterInit'
    }
  };
  /**
   * Loading UI组件 
   * @class Loading
   * @extends {BaseUI} 
   * @constructor
   * @static
   */
  var Loading = function () {
    return BaseUI.apply(this, arguments);
  };
  $.extend(Loading, BaseUI, special);
  $.extend(Loading.prototype, BaseUI.prototype, special);
  module.exports = Loading;
});