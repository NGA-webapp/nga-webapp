define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var tpl = require('templates/forum/row.tpl');
  var appCache = require('modules/AppCache').appCache;
  var sliceSubject = require('utils/common').sliceSubject;

  var RowForumView = BasicView.extend({
    tagName: 'li',
    events: {
      'singleTap': function (e) {
        Backbone.stage.change('#!/topic/' + this.model.get('id'), ['slide-right', 'slide-left']);
        appCache.get('topicView').$el.find('header .subject').text(sliceSubject(this.$el.find('h4').text()));
      }
    },
    tpl: art.compile(tpl),
    render: function () {
      this.$el.html(this.tpl(this.model.toJSON()));
      return this;
    },
    initialize: function () {
      return this.render();
    }
  });
  module.exports = RowForumView;
});
