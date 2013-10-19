define(function (require, exports, module) {
  var isIE67 = require('./browser').isIE67,
    isMobile = require('./browser').isMobile,
    isFixed = !isIE67 && !isMobile;

  /**
   * @module  base
   */

  /**
   * 实现个别样式在不同的浏览器下兼容
   * @class  CSS
   * @static
   */
  /**
   * 兼容ie的position:fixed
   * @method  fixed
   * @param {dom} elem 需要设为fixed的dom节点
   * @param {number} [top] 
   * @param {number} [left]
   * @for  CSS
   * @requires browser
   */
  var fixed = exports.fixed = function () {
    return !isFixed ? function (elem, top, left) {
      var _fixed;
      top = typeof top === 'number' ? top : 0;
      left = typeof left === 'number' ? left : 0;
      _fixed = function () {
        elem.style.top = ((document.documentElement.scrollTop || document.body.scrollTop) + top) + 'px';
        elem.style.left = ((document.documentElement.scrollLeft || document.body.scrollLeft) + left) + 'px';
      };
      elem.style.position = 'absolute';
      elem.style.overflow = 'hidden';
      elem.style.display = 'block';
      $(window).on('scroll resize', _fixed);
      _fixed();
    } : function (elem, top, left) {
      elem.style.position = 'fixed';
      elem.style.top = typeof top === 'number' ? top : 0;
      elem.style.left = typeof left === 'number' ? left : 0;
    };
  }();

  /**
   * 兼容ie的全屏层样式
   * @method  fullScreen
   * @param {dom} elem 需要展开为全屏大小并固定的dom节点
   * @for  CSS
   * @requires  browser
   */
  var fullScreen = exports.fullScreen = function () {
    return !isFixed ? function (elem) {
      var _fullScreen = function () {
        elem.style.width = (document.documentElement.clientWidth || document.body.offsetWidth) + 'px';
        elem.style.height = (document.documentElement.clientHeight || document.body.offsetHeight) + 'px';
      };
      fixed(elem);
      $(window).on('resize', _fullScreen);
      _fullScreen();
    } : function (elem) {
      elem.style.position = 'fixed';
      elem.style.left = 0;
      elem.style.top = 0;
      elem.style.width = '100%';
      elem.style.height = '100%';
      elem.style.overflow = 'hidden';
    };
  }();

});