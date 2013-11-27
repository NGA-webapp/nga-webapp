define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var tpl = require('templates/topic/row.tpl');
  var Navigate = require('utils/Navigate');

  var RowTopicView = BasicView.extend({
    tagName: 'li',
    className: 'hide',
    events: {
      'singleTap .avatar': function () {
        Navigate.redirect('#!/user/' + this.model.get('authorId'));
      },
      'singleTap a.url': function (events) {
        var $a = $(events.currentTarget, '_blank');
        window.open($a.attr('href'));
        return event.preventDefault();
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
  module.exports = RowTopicView;
});
