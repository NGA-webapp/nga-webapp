define(function (require, exports) {
  var img = {
    tagName: 'img',
    isPair: true,
    parser: function (content, attrs, settings) {
      // todo: ajsize
      var image;
      if (typeof settings === 'object' && settings.downloadImage === false) {
        image = '<img/>';
      } else {
        image = '<img src="' + content + '" onerror="" />';
      }
      return image;
    },
    priority: 1,
  };
  // 修正使用相对路径的img标签
  var relativeImg = {
    tagName: 'img',
    isPair: true,
    parser: function (content) {
      var match = content.match(/^\.?\/([\s\S]*)/);
      if (match && match.length > 1) {
        return '[img]http://bbs.ngacn.cc/' + match[1] + '[/img]';
      }
      return '[img]' + content + '[/img]';
    },
    priority: 2,
  };

  exports.img = img;
  exports.relativeImg = relativeImg;
});