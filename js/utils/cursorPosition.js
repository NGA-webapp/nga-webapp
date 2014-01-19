define(function (require, exports, module) {
  // 获取文本框内光标的位置
  var get = function (elem) {
    var position = -1;
    var range;
    if (elem.selectionStart) {
      // not ie
      position = elem.selectionStart;
    } else {
      // ie
      if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.moveStart("character", -elem.value.length);
        position = range.text.length;
      }
    }
    return position;
  };

  // 将文本框光标放置至指定位置
  var set = function (elem, i) {
    var range;
    if (elem.setSelectionRange) {
      // not ie
      elem.setSelectionRange(i, i);
    } else {
      //IE
      if (elem.createTextRange) {
        range = elem.createTextRange();
        range.move("character", i);
        range.select();
      }
    }
  };

  exports.get = get;
  exports.set = set;
});
