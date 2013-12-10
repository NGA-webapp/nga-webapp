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
})(function (require, exports) {
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
      var val;
      if (!attrs.nop && typeof attrs.value === 'string') {
        // 百分比字体限制最大300%
        if (attrs.value.slice(-1) === '%') {
          val = parseInt(attrs.value.slice(0, -1), 0);
          val = (val > 300 ? 300 : val) + '%';
        } else {
          val = attrs.value;
        }
        return '<span style="font-size: ' + val + ';">' + content + '</span>';
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
