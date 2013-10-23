define(function (require, exports) {
  exports.format_date = function (date, friendly) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    if (friendly) {
      var now = new Date();
      var mseconds = -(date.getTime() - now.getTime());
      var time_std = [ 1000, 60 * 1000, 60 * 60 * 1000, 24 * 60 * 60 * 1000 ];
      if (mseconds < time_std[3]) {
        if (mseconds > 0 && mseconds < time_std[1]) {
          return Math.floor(mseconds / time_std[0]).toString() + ' 秒前';
        }
        if (mseconds > time_std[1] && mseconds < time_std[2]) {
          return Math.floor(mseconds / time_std[1]).toString() + ' 分钟前';
        }
        if (mseconds > time_std[2]) {
          return Math.floor(mseconds / time_std[2]).toString() + ' 小时前';
        }
      }
    }

    //month = ((month < 10) ? '0' : '') + month;
    //day = ((day < 10) ? '0' : '') + day;
    hour = ((hour < 10) ? '0' : '') + hour;
    minute = ((minute < 10) ? '0' : '') + minute;
    second = ((second < 10) ? '0': '') + second;

    var thisYear = new Date().getFullYear();
    year = (thisYear === year) ? '' : (year + '-');
    return year + month + '-' + day + ' ' + hour + ':' + minute;
  };
  /**
   * 将字符串转换为整数，并对异常进行处理
   * @param  {string} str 字符串形式的数字
   * @return {number}     转换后的数字，异常为0
   */
  var toInteger = exports.toInteger = function (str) {
    if (typeof str === 'undefined') {
      return 0;
    }
    return parseInt(str, 0) || 0;
  };

  /**
   * 限定标题长度，超过的显示...
   * @param  {string} subject 标题
   * @return {string}         过滤后的标题
   */
  var sliceSubject = exports.sliceSubject = function (subject) {
    var limit = 13; // 标题最长长度
    if (subject.length > limit ) {
      return subject.slice(0, limit - 2) + '...';
    } else {
      return subject;
    }
  };

});
