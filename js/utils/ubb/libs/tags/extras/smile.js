;
(function(definition) {
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
})(function(require, exports, module) {
  var __notfound__ = '';
  var __imgpath__ = 'http://img4.ngacn.cc/ngabbs';
  var __smiles__ = {
    0: {
      1: 'smile.gif',
      2: 'mrgreen.gif',
      3: 'question.gif',
      4: 'wink.gif',
      5: 'redface.gif',
      6: 'sad.gif',
      7: 'cool.gif',
      8: 'crazy.gif',
      32: '12.gif',
      33: '13.gif',
      34: '14.gif',
      30: '10.gif',
      29: '09.gif',
      28: '08.gif',
      27: '07.gif',
      26: '06.gif',
      25: '05.gif',
      24: '04.gif',
      35: '15.gif',
      36: '16.gif',
      37: '17.gif',
      38: '18.gif',
      39: '19.gif',
      40: '20.gif',
      41: '21.gif',
      42: '22.gif',
      43: '23.gif'
    },
    ac: {
      "blink": "ac0.png",
      "goodjob": "ac1.png",
      "上": "ac2.png",
      "中枪": "ac3.png",
      "偷笑": "ac4.png",
      "冷": "ac5.png",
      "凌乱": "ac6.png",
      "反对": "ac7.png",
      "吓": "ac8.png",
      "吻": "ac9.png",
      "呆": "ac10.png",
      "咦": "ac11.png",
      "哦": "ac12.png",
      "哭": "ac13.png",
      "哭1": "ac14.png",
      "哭笑": "ac15.png",
      "哼": "ac16.png",
      "喘": "ac17.png",
      "喷": "ac18.png",
      "嘲笑": "ac19.png",
      "嘲笑1": "ac20.png",
      "囧": "ac21.png",
      "委屈": "ac22.png",
      "心": "ac23.png",
      "忧伤": "ac24.png",
      "怒": "ac25.png",
      "怕": "ac26.png",
      "惊": "ac27.png",
      "愁": "ac28.png",
      "抓狂": "ac29.png",
      "抠鼻": "ac30.png",
      "擦汗": "ac31.png",
      "无语": "ac32.png",
      "晕": "ac33.png",
      "汗": "ac34.png",
      "瞎": "ac35.png",
      "羞": "ac36.png",
      "羡慕": "ac37.png",
      "花痴": "ac38.png",
      "茶": "ac39.png",
      "衰": "ac40.png",
      "计划通": "ac41.png",
      "赞同": "ac42.png",
      "闪光": "ac43.png",
      "黑枪": "ac44.png"
    }
  };
  var smile = {
    regExp: new RegExp(/\[s:([\w\:\u4E00-\u9FA5]+?)\]/gi),
    replacement: function(match, $1, index, str) {
      var url, keys;
      if (arguments.length > 3) {
        keys = $1.split(':');
        if (keys.length === 1 && (keys[0] in __smiles__[0])) {
          url = __smiles__[0][keys[0]];
        } else if (keys.length === 2 && (keys[0] in __smiles__) && (keys[1] in __smiles__[keys[0]])) {
          url = __smiles__[keys[0]][keys[1]];
        }
      }
      if (!url) {
        url = __notfound__;
      }
      url = url ? (__imgpath__ + '/post/smile/' + url) : __notfound__;
      return '<img src="' + url + '" />';
    }
  };

  exports.smile = smile;
});