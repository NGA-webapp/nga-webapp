define(function (require, exports, module) {
  var Notification = require('utils/Notification');

  var config = require('config/index');
  var checkError = function (xhr, status) {
    var msg;
    if (status === 'error' || config.nakeServer) {
      if (xhr.responseText) {
        // 错误时返回的xml还带js蛋疼
        msg = xhr.responseText.match(/<__MESSAGE><item>\d+<\/item><item>(.*?)<\/item>/);
        if (!(msg && msg.length === 2)) {
          msg = xhr.responseText.match(/<__MESSAGE><item>(.*?)<\/item><item>\d+<\/item>/);
        }
        if (msg && msg.length === 2) {
          Notification.alert(msg[1].slice(0, 50));
          return;
        }
      }
    }
    if (status === 'error') {
      Notification.alert('网络错误');
    }
  };

  var BasicModel = Backbone.Model.extend({
    fetchXml: function (data, options) {
      var getPrarmStringWithoutUrlEncode = function (obj) {
        var key, paramString;
        paramString = '';
        for (k in obj) {
          paramString += k + '=' + obj[k] + '&';
        }
        return paramString;
      };
      _.defaults(data || (data = {}), this.xmlOptions || (this.xmlOptions = {}), {
        'lite': 'xml',
        'v2': 1
      });
      _.defaults(options || (options = {}), {
        'url': this.url,
        'dataType': 'xml',
        'data': options.urlEncoded ? getPrarmStringWithoutUrlEncode(data) : data,
        'complete': checkError,
        'timeout': 20000
      });
      return this.fetch(options);
    },
  });
  module.exports = BasicModel;
});
