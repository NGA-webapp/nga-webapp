define(function (require, exports, module) {
  var template = require('./source');
  var common = require('../common');
  var decimal = require('../decimal');
  template.openTag = "<%";
  template.closeTag = "%>";
  template.helper('$format_date', function (content) {
    var timestamp = parseInt(content + '000', 0);
    return common.format_date(new Date(timestamp), true);
  });
  template.helper('$decimal', function (num, n) {
    n = typeof n === 'undefined' ? 2 : n;
    return {
      round: decimal.round(num, n),
      floor: decimal.floor(num, n),
      ceil: decimal.ceil(num, n)
    };
  });
  template.helper('$first', function (arr) {
    var res = arr.length ? arr[0] : {};
    return res;
  });
  template.helper('$get', function (obj, key) {
    var res = typeof obj === 'object' && key in obj ? obj[key] : '';
    return res;
  });
  template.helper('$pagination', function (currentPage, countReplies, rowPerPage) {
    var maxShowPage = 5;
    var countRows = parseInt(countReplies, 0) + 1;
    var countPages = Math.ceil(countRows / rowPerPage);
    var halfShowPage = Math.floor(maxShowPage / 2);
    var arr = [];
    var min, i;
    if (currentPage > halfShowPage) {
      if (currentPage < countPages - halfShowPage) {
        min = currentPage - halfShowPage;
      } else {
        min = countPages - maxShowPage + 1;
        min = min > 0 ? min : 1;
      }
    } else {
      min = 1;
    }
    i = min;
    max = min + maxShowPage -1;
    while (i <= max) {
      arr.push(i > countPages ? '' : i);
      i++;
    }
    return arr;
  });
  module.exports = template;
});