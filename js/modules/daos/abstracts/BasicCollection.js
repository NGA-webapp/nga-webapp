define(function (require, exports, module) {
  var BasicCollection = Backbone.Collection.extend({
    fetchXml: function (data, options) {
      _.defaults(data || (data = {}), {
        'lite': 'xml',
        'v2': 1
      });
      _.defaults(options || (options = {}), {
        'url': this.url,
        'dataType': 'xml',
        'data': data
      });
      console.log(options);
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