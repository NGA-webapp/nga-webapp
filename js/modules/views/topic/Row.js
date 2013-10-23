define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var tpl = require('templates/topic/row.tpl');

  var RowTopicView = BasicView.extend({
    tagName: 'li',
    className: 'hide',
    events: {
      'singleTap': function () {
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
