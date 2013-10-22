define(function (require, exports, module) {
  var browser = require('utils/browser');
  var checkError = function (xhr, status) {
    var msg;
    if (status === 'error' || browser.isIPhone) {
      if (xhr.responseText) {
        // 错误时返回的xml还带js蛋疼
        msg = xhr.responseText.match(/<__MESSAGE><item>\d+<\/item><item>(.*?)<\/item>/);
        if (msg.length === 2) {
          return alert(msg[1]);
        }
      }
    }
    if (status === 'error') {
      alert('网络错误');
    }
  };

  var BasicCollection = Backbone.Collection.extend({
    fetchXml: function (data, options) {
      _.defaults(data || (data = {}), {
        'lite': 'xml',
        'v2': 1
      });
      _.defaults(options || (options = {}), {
        'url': this.url,
        'dataType': 'xml',
        'data': data,
        'complete': checkError
      });
      return this.fetch(options);
    },
    // parse: function (nodes) {
    //   if (this.model === void 0) {
    //     throw new Error('non-model in the collection');
    //   }
    //   var arr = [];
    //   var i, len;
    //   for (i = 0, len = nodes.length; i < len; i++) {
    //     arr.push(new this.model(nodes.get(i), {parse: true}));
    //   }
    //   return arr;
    // }
  });

  module.exports = BasicCollection;
});