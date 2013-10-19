define(function(require, exports, module) {
  /**
   * @module  base
   * @author yelo
   */

  /**
   * 检测浏览器版本
   * @class Browser
   * @static
   * from: http://www.cnblogs.com/rubylouvre/archive/2009/10/14/1583362.html
   */

  // IE
  /**
   * @property {Boolean} isIE
   */
  var isIE = exports.isIE = !!window.ActiveXObject;
  /**
   * @property {Boolean} isIE67
   */
  var isIE67 = exports.isIE67 = !"1"[0];
  /**
   * @property {Boolean} isIE678
   */
  var isIE678 = exports.isIE678 = '\v'=='v';
  /**
   * @property {Boolean} isIE8
   */
  var isIE8 = exports.isIE8 = window.toStaticHTML;
  /**
   * @property {Boolean} isIE9
   */
  var isIE9 = exports.isIE9 = document.documentMode && document.documentMode === 9;

  // other
  /**
   * @property {Boolean} isNetscape
   */
  var isNetscape = exports.isNetscape = !!window.GeckoActiveXObject;
  /**
   * @property {Boolean} isGecko  包括firefox
   */
  var isGecko = exports.isGecko = !!window.netscape;
  /**
   * @property {Boolean} isFirefox
   */
  var isFirefox = exports.isFirefox = !!window.Components;
  /**
   * @property {Boolean} isSafari
   */
  var isSafari = exports.isSafari = !!(navigator.vendor && navigator.vendor.match(/Apple/));
  /**
   * @property {Boolean} isChrome
   */
  var isChrome = exports.isChrome = !!(window.chrome && window.google);
  /**
   * @property {Boolean} isOpera
   */
  var isOpera = exports.isOpera = !!window.opera;
  /**
   * @property {Boolean} isMaxthon 傲游2 3
   */
  // 傲游2 3
  var isMaxthon = exports.isMaxthon = /maxthon/i.test(navigator.userAgent);
  /**
   * @property {Boolean} is360se 360安全浏览器
   */
  var is360se = exports.is360se = /360se/i.test(navigator.userAgent);

  // 手机
  /**
   * @property {Boolean} isIPhone
   */
  var isIPhone = exports.isIPhone = /iPhone/i.test(navigator.userAgent);
  /**
   * @property {Boolean} isIPhone4
   */
  var isIPhone4 = exports.isIPhone4 = window.devicePixelRatio >= 2;
  /**
   * @property {Boolean} isPad
   */
  var isIPad = exports.isIPad = /iPad/i.test(navigator.userAgent);
  /**
   * @property {Boolean} isAndroid
   */
  var isAndroid = exports.isAndroid = /android/i.test(navigator.userAgent);
  /**
   * @property {Boolean} isIOS
   */
  var isIOS = exports.isIOS = isIPhone || isIPad;
  /**
   * @property {Boolean} isMobile
   */
  var isMobile = exports.isMobile = 'createTouch' in document && !('onmousemove' in document) || /(iPhone|iPad|iPod)/i.test(navigator.userAgent);

});