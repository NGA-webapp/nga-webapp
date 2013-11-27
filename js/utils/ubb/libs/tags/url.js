define(function (require, exports) {
  var url = {
    tagName: 'url',
    isPair: true,
    parser: function (content, attrs) {
      return '<a href="' + attrs.value + '" target="_blank">' + content + '</a>';
    },
    priority: 1,
  };
  
  exports.url = url;
});