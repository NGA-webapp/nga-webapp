define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var tpl = require('templates/forum/row.tpl');
  var Navigate = require('utils/Navigate');
  var RowForumView = BasicView.extend({
    tagName: 'li',
    className: 'hide',
    events: {
      'singleTap': function () {
        Navigate.redirect('#!/topic/' + this.model.get('id'));
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
