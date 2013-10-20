define(function (require, exports, module) {
  var BasicModel = require('modules/daos/abstracts/BasicModel');

  var PostInTopicModel = BasicModel.extend({
    parse: function (data) {
      return data;
    },
  });
  module.exports = PostInTopicModel;
});
