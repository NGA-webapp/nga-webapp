;(function (definition) {
  // this is considered "safe":
  var hasDefine = typeof define === 'function',
    // hasDefine = typeof define === 'function',
    hasExports = typeof module !== 'undefined' && module.exports;

  if (hasDefine) {
    // AMD Module or CMD Module
    define(definition);
  } else if (hasExports) {
    // Node.js Module
    definition(require, exports, module);
  } else {
    throw new Error('module required');
  }
})(function (require, exports, module) {
  // 代替underscore的一些方法

  /**
   * 实现参数可用字符串代替迭代器
   * @private
   * @param  {function|string} iter 迭代器方法或者指定键名
   * @return {function}      迭代器方法
   */
  var _toIterator = function (iter) {
    if (typeof iter === 'string') {
      return function (sth) {
        return sth[iter];
      };
    } else if (typeof iter === 'function') {
      return iter;
    } else {
      throw new Error('the 2nd argument should be a string or a function');
    }
  };

  /**
   * 对数组进行分组。
   * 参考http://underscorejs.org/#groupBy。
   * 实现了underscore一般情况下的groupBy功能。
   * @param  {array} list    需要分组的数组
   * @param  {function|string} iter    迭代器或键名
   * @param  {object} context 迭代器上下文
   * @return {array}         分组后的数组
   */
  var groupBy = function (list, iter, context) {
    var result, iterator;
    var i, len, key;
    result = {};
    iterator = _toIterator(iter);
    for (i = 0, len = list.length; i < len; i++) {
      key = iterator.call(context, list[i], i, list);
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(list[i]);
    }
    return result;
  };

  /**
   * 对数组进行排序。
   * 参考http://underscorejs.org/#sortBy。
   * 实现了underscore一般情况下的sortBy功能。
   * @param  {array} list    需要排序的数组
   * @param  {function|string} iter    迭代器或键名
   * @param  {object} context 迭代器上下文
   * @return {array}         排序后的数组
   */
  var sortBy = function (list, iter, context) {
    var iterator;
    iterator = _toIterator(iter);
    return  list.slice().sort(function (left, right) {
      return iterator(left) - iterator(right);
    });
  };

  exports.groupBy = groupBy;
  exports.sortBy = sortBy;

});
