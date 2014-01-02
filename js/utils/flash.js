define(function (require, exports, module) {
  var getYoukuId = function (url) {
    var rule = {
      // http://v.youku.com/v_show/id_XNjU1NDU5NTQw_ev_1.html
      html: new RegExp(/^http:\/\/v\.youku\.com\/v_show\/id_([a-z0-9A-Z\-]*)/),
      // http://player.youku.com/player.php/sid/XNjU1NDU5NTQw/v.swf
      swf: new RegExp(/^http:\/\/player\.youku\.com\/player\.php\/sid\/([a-z0-9A-Z\-]*)\/v\.swf/),
    };
    var tmp;
    if ((tmp = url.match(rule.html)) && tmp.length === 2) {
      return tmp[1];
    } else if ((tmp = url.match(rule.swf)) && tmp.length === 2) {
      return tmp[1];
    }
    return '';
  };

  var youku = function (elem, callback) {
    var url = elem.getAttribute('data-url');
    var id = getYoukuId(url);
    var request = function (success) {
      $.ajax({
        url: 'http://api.3g.youku.com/layout/phone2_1/play',
        data: {
          "point": "1",
          "id": id,
          "pid": "352e7f78a0bc479b",
          "format": "4",
          "ver": "2.3.1",
          "network": "WIFI",
        },
        type: 'get',
        dataType: 'json',
        success: success,
        error: function () {
          console.log(arguments);
        }
      });
    };
    var success = function (data) {
      var url, video;
      if (data && data.results && data.results['3gphd'] && data.results['3gphd'][0]) {
        url = data.results['3gphd'][0].url;
      }
      if (url) {
        video = document.createElement('video');
        video.setAttribute('src', url);
        video.setAttribute('controls', 'controls');
        elem.appendChild(video);
        callback.call(elem);
      }
    };
    if (id) {
      request(success);
    }
  };

  var getTudouId = function (url) {
    var rule = {
      // http://www.tudou.com/programs/view/UnvYrcJVKAA
      view: new RegExp(/^http:\/\/www\.tudou\.com\/programs\/view\/([a-z0-9A-Z\-_]*)/),
      // http://www.tudou.com/listplay/OQQcpI4mZNc/lSFGUMMvHKs.html
      // http://www.tudou.com/listplay/OYrMv_-gk38/CL-qDZkKV0A.html
      list: new RegExp(/^http:\/\/www\.tudou\.com\/listplay\/[a-z0-9A-Z\-_]*\/([a-z0-9A-Z\-_]*)/),
      // http://www.tudou.com/v/UnvYrcJVKAA/&resourceId=0_04_05_99/v.swf
      swf: new RegExp(/^http:\/\/www\.tudou\.com\/v\/([a-z0-9A-Z\-_]*)\/.*\/v\.swf/),
    };
    var tmp;
    if ((tmp = url.match(rule.view)) && tmp.length === 2) {
      return tmp[1];
    } else if ((tmp = url.match(rule.list)) && tmp.length === 2) {
      return tmp[1];
    } else if ((tmp = url.match(rule.swf)) && tmp.length === 2) {
      return tmp[1];
    }
    return '';
  };

  var tudou = function (elem, callback) {
    var url = elem.getAttribute('data-url');
    var id = getTudouId(url);
    var request = function (success) {
      $.ajax({
        url: 'http://www.tudou.com/programs/view/html5embed.action',
        data: {
          "code": id,
        },
        type: 'get',
        crossDomain: true,
        dataType: 'text',
        success: success,
        error: function () {
          console.log(arguments);
        }
      });
    };
    var success = function (data) {
      var url, video;
      // ... var iid = 184361336; ...
      var rule = new RegExp(/var iid ?= ?(\d*);/);
      var tmp;
      if ((tmp = data.match(rule)) && tmp.length === 2) {
        url = "http://vr.tudou.com/v2proxy/v2.m3u8?it=" + tmp[1] + "&st=3";
      }
      if (url) {
        video = document.createElement('video');
        video.setAttribute('src', url);
        video.setAttribute('controls', 'controls');
        elem.appendChild(video);
        callback.call(elem);
      }
    };
    if (id) {
      request(success);
    }
  };

  var jQueryFactory = (function ($) {
    $.extend($.fn, {
      youku: function (callback) {
        var i, len;
        for (i = 0, len = this.length; i < len; i++) {
          youku(this[i], callback);
        }
        return $(this);
      },
      tudou: function (callback) {
        var i, len;
        for (i = 0, len = this.length; i < len; i++) {
          tudou(this[i], callback);
        }
        return $(this);
      },
    });
  });

  if (typeof jQuery !== 'undefined') {
    jQueryFactory(jQuery);
  } else if (typeof $ !== 'undefined') {
    jQueryFactory($);
  }

  return {
    youku: youku
  };
});