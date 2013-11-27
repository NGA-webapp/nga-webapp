define(function (require, exports) {
  var url = {
    tagName: 'url',
    isPair: true,
    parser: function (content, attrs) {
      if (attrs.nop) {
        return '<a class="url" href="' + content + '" target="_blank">' + content + '</a>';
      }
      return '<a class="url" href="' + attrs.value + '" target="_blank">' + content + '</a>';
    },
    priority: 1,
  };
  
  exports.url = url;
});