define(function (require, exports) {
  var list = {
    tagName: 'list',
    isPair: true,
    parser: function (content) {
      var str = '';
      var arr = content.split('[*]');
      var i, len;
      for (i = 0, len = arr.length; i < len; i++) {
        if (arr[i]) {
          str += '<li>' + arr[i] + '</li>';
        }
      }
      return '<ul>' + str + '</ul>';
    }
  };

  exports.list = list;
});