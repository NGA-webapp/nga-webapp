define(function (require, exports) {
  var url = {
    tagName: 'url',
    isPair: true,
    parser: function (content, attrs) {
      if (attrs.nop) {
        return '<a class="url" data-url="' + content + '" href="javascript:void(0);">' + content + '</a>';
      }
      return '<a class="url" data-url="' + attrs.value + '" href="javascript:void(0);">' + content + '</a>';
    },
    priority: 1,
  };
  
  exports.url = url;
});