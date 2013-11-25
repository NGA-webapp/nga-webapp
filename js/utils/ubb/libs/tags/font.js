define(function (require, exports) {
  var b = {
    tagName: 'b',
    isPair: true,
    parser: function (content) {
      return '<b>' + content + '</b>';
    }
  };

  var u = {
    tagName: 'u',
    isPair: true,
    parser: function (content) {
      return '<u>' + content + '</u>';
    }
  };

  var i = {
    tagName: 'i',
    isPair: true,
    parser: function (content) {
      return '<i>' + content + '</i>';
    }
  };

  var del = {
    tagName: 'del',
    isPair: true,
    parser: function (content) {
      return '<del>' + content + '</del>';
    }
  };

  var h = {
    tagName: 'h',
    isPair: true,
    parser: function (content) {
      return '<h4>' + content + '</h4>';
    }
  };

  var font = {
    tagName: 'font',
    isPair: true,
    parser: function (content, attrs) {
      if (!attrs.nop && typeof attrs.value === 'string') {
        return '<span style="font-family: ' + attrs.value + ';">' + content + '</span>';
      }
      return content;
    }
  };

  var color = {
    tagName: 'color',
    isPair: true,
    parser: function (content, attrs) {
      if (!attrs.nop && typeof attrs.value === 'string') {
        return '<span class="' + attrs.value + '">' + content + '</span>';
      }
      return content;
    }
  };

  var size = {
    tagName: 'size',
    isPair: true,
    parser: function (content, attrs) {
      if (!attrs.nop && typeof attrs.value === 'string') {
        return '<span style="font-size: ' + attrs.value + ';">' + content + '</span>';
      }
      return content;
    }
  };

  var align = {
    tagName: 'align',
    isPair: true,
    parser: function (content, attrs) {
      if (!attrs.nop && typeof attrs.value === 'string') {
        switch (attrs.value) {
          case 'left': case 'right': case 'center':
          return '<div style="text-align: ' + attrs.value + ';">' + content + '</div>';
        }
      }
      return content;
    }
  };

  exports.b = b;
  exports.u = u;
  exports.i = i;
  exports.del = del;
  exports.h = h;
  exports.font = font;
  exports.color = color;
  exports.size = size;
  exports.align = align;
});
