define(function (require, exports, module) {
  var BasicCollection = require('modules/collections/abstracts/Basic');
  var PostModel = require('modules/models/data/Post');
  var PostCollection = BasicCollection.extend({
    model: PostModel
  });

  module.exports = PostCollection;
});