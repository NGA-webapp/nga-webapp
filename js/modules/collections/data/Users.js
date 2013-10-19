define(function (require, exports, module) {
  var BasicCollection = require('modules/collections/abstracts/Basic');
  var UserModel = require('modules/models/data/User');
  var UserCollection = BasicCollection.extend({
    model: UserModel
  });

  module.exports = UserCollection;
});