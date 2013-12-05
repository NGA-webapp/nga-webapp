define(function (require, exports, module) {
  var ui = require('utils/ui/index');
  var config = require('config/index');
  var checkError = function (xhr, status) {
    var msg;
    if (status === 'error' || config.nakeServer) {
      if (xhr.responseText) {
        // 错误时返回的xml还带js蛋疼
        msg = xhr.responseText.match(/<__MESSAGE><item>\d+<\/item><item>(.*?)<\/item>/);
        if (msg && msg.length === 2) {
          alert(msg[1]);
          ui.Loading.close();
          return;
        }
      }
    }
    if (status === 'error') {
      alert('网络错误');
      ui.Loading.close();
    }
  };

  var BasicCollection = Backbone.Collection.extend({
    fetchXml: function (data, options) {
      if (typeof data === 'string') {
        data += '&lite=xml&v2=1';
      } else {
        _.defaults(data || (data = {}), this.xmlOptions || (this.xmlOptions = {}), {
          'lite': 'xml',
          'v2': 1
        });
      }
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