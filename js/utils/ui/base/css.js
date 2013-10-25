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

  /**
   * 垂直和水平同时相对于父元素居中定位。
   * 适用于父元素无滚动的情况。
   * 在父元素会滚动的情况下，需要绑定事件，让父元素滚动时再执行该方法。
   * @method  centerBox
   * @param {dom} elem 需要居中定位的dom节点
   * @param {dom} [parent] 若留空则自动寻找父元素，若赋值如document.body，则定位都将会相对于body进行
   * @for  CSS
   */
  var centerBox = exports.centerBox = function (elem, parent) {
    var container = {};
    parent = parent || elem.parentElement || elem.parentNode;
    container.top = parent.scrollTop;
    container.left = parent.scrollLeft;
    container.width = parent.offsetWidth;
    container.height = parent.offsetHeight;
    // container.top = document.documentElement.scrollTop || document.body.scrollTop;
    // container.left = document.documentElement.scrollLeft || document.body.scrollLeft;
    // container.width = document.documentElement.clientWidth || document.body.offsetWidth;
    // container.height = document.documentElement.clientHeight || document.body.offsetHeight;
    elem.style.position = 'absolute';
    elem.style.top = (container.height - elem.offsetHeight) / 2 + container.top + 'px';
    elem.style.left = (container.width - elem.offsetWidth) / 2 + container.left + 'px';
  };
  window.centerBox = centerBox;

});