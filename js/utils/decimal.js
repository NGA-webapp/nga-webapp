define(function (require, exports, module) {
  /**
   * 以四舍五入保留指定小数点位数
   * @param  {number} x 输入小数
   * @param  {number} [n] 指定保留位数
   * @return {number}   输出小数
   */
  var round = function (x, n) {
    var f, pow;
    n = typeof n === 'undefined' ? 2 : n;
    f = parseFloat(x);
    if (isNaN(f)) {
      return;
    }
    pow = Math.pow(10, n);
    return Math.round(x * pow) / pow;
  };
  /**
   * 向下保留指定小数点位数
   * @param  {number} x 输入小数
   * @param  {number} [n] 指定保留位数
   * @return {number}   输出小数
   */
  var floor = function (x, n) {
    var f, pow;
    n = typeof n === 'undefined' ? 2 : n;
    f = parseFloat(x);
    if (isNaN(f)) {
      return;
    }
    pow = Math.pow(10, n);
    return Math.floor(x * pow) / pow;
  };

  /**
   * 向上保留指定小数点位数
   * @param  {number} x 输入小数
   * @param  {number} [n] 指定保留位数
   * @return {number}   输出小数
   */
  var ceil = function (x, n) {
    var f, pow;
    n = typeof n === 'undefined' ? 2 : n;
    f = parseFloat(x);
    if (isNaN(f)) {
      return;
    }
    pow = Math.pow(10, n);
    return Math.ceil(x * pow) / pow;
  };

  exports.round = round;
  exports.floor = floor;
  exports.ceil = ceil;
});
