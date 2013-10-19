define(function (require, exports, module) {
  var BasicCollection = require('modules/collections/abstracts/Basic');
  var TopicModel = require('modules/models/data/Topic');
  var TopicCollection = BasicCollection.extend({
    model: TopicModel
  });

  module.exports = TopicCollection;
});