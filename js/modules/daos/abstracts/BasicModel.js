define(function (require, exports, module) {
  var toInteger = require('utils/common').toInteger;
  var getNodeText = require('utils/quoUtils').getNodeText;
  var BasicModel = Backbone.Model.extend({
    // loadXml: function ($item) {
    //   return this;
    // },
    fetchXml: function (data) {
      _.defaults(data || (data = {}), this.xmlOptions || (this.xmlOptions = {}), {
        'lite': 'xml',
        'v2': 1
      });
      return this.fetch({
        'url': this.url,
        'dataType': 'xml',
        'data': data
      });
    },
    // parse: function (resp) {
    //   // rewrite the xml parser here
    //   return resp;
    // }
  });
  module.exports = BasicModel;
});
