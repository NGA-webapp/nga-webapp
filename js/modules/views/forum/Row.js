define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var tpl = require('templates/forum/row.tpl');
  var Navigate = require('utils/Navigate');
  var appCache = require('modules/AppCache').appCache;
  var sliceSubject = require('utils/common').sliceSubject;

  var RowForumView = BasicView.extend({
    tagName: 'li',
    className: 'hide',
    events: {
      'singleTap': function (e) {
        Navigate.redirect('#!/topic/' + this.model.get('id'));
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
