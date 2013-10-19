define(function (require, exports, module) {
  var BaseUI = require('./BaseUI');
  var fullScreen = require('./base/css').fullScreen;
  /**
   * @module  UI
   */
  var special = {
    _id: 'OverlayUI',
    _css: {
      base: 'overlayUI',
      show: 'showOverlayUI'
    },
    afterInit: function (id) {
      fullScreen(this.el().get(0));
    },
    events: {
      'afterInit': 'afterInit'
    }
  };
  var Overlay = function () {
    return BaseUI.apply(this, arguments);
  };
  /**
   * Overlay UI组件 
   * @class Overlay
   * @extends {BaseUI} 
   * @constructor
   * @static
   */
  $.extend(special.events, BaseUI.events);
  $.extend(Overlay, BaseUI, special);
  $.extend(Overlay.prototype, BaseUI.prototype, special);
  module.exports = Overlay;
});