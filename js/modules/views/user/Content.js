define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var tpl = require('templates/user/content.tpl');

  var ContentUserView = BasicView.extend({
    tagName: 'div',
    className: 'hide',
    tpl: art.compile(tpl),
    render: function () {
      this.$el.html(this.tpl(this.model.toJSON().user));
      return this;
    },
    initialize: function () {
      return this.render();
    }
  });
  module.exports = ContentUserView;
});
