define(function (require, exports, module) {
  var __notfound__ = '';
  var __imgpath__ = 'http://img4.ngacn.cc/ngabbs';
  var __smile__ = {
    1: __imgpath__ + '/post/smile/smile.gif',
    2: __imgpath__ + '/post/smile/mrgreen.gif',
    3: __imgpath__ + '/post/smile/question.gif',
    4: __imgpath__ + '/post/smile/wink.gif',
    5: __imgpath__ + '/post/smile/redface.gif',
    6: __imgpath__ + '/post/smile/sad.gif',
    7: __imgpath__ + '/post/smile/cool.gif',
    8: __imgpath__ + '/post/smile/crazy.gif',
    32: __imgpath__ + '/post/smile/12.gif',
    33: __imgpath__ + '/post/smile/13.gif',
    34: __imgpath__ + '/post/smile/14.gif',
    30: __imgpath__ + '/post/smile/10.gif',
    29: __imgpath__ + '/post/smile/09.gif',
    28: __imgpath__ + '/post/smile/08.gif',
    27: __imgpath__ + '/post/smile/07.gif',
    26: __imgpath__ + '/post/smile/06.gif',
    25: __imgpath__ + '/post/smile/05.gif',
    24: __imgpath__ + '/post/smile/04.gif',
    35: __imgpath__ + '/post/smile/15.gif',
    36: __imgpath__ + '/post/smile/16.gif',
    37: __imgpath__ + '/post/smile/17.gif',
    38: __imgpath__ + '/post/smile/18.gif',
    39: __imgpath__ + '/post/smile/19.gif',
    40: __imgpath__ + '/post/smile/20.gif',
    41: __imgpath__ + '/post/smile/21.gif',
    42: __imgpath__ + '/post/smile/22.gif',
    43: __imgpath__ + '/post/smile/23.gif'
  };
  var smile = {
    regExp: new RegExp(/\[s:(\d+?)\]/gi),
    replacement: function (match, $1, index, str) {
      var url;
      if (arguments.length > 3 && ($1 in __smile__)) {
        url = __smile__[$1];
      } else {
        url = __notfound__;
      }
      return '<img src="' + url + '" />';
    }
  };

  exports.smile = smile;
});
