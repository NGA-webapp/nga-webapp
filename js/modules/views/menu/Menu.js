define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var ui = require('utils/ui/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var tpl = require('templates/menu/menu.tpl');
  var Navigate = require('utils/Navigate');

  var MenuView = BasicView.extend({
    el: '#menu',
    tpl: art.compile(tpl),
    events: {
      'tap .action-back': function () {
        Navigate.back();
      }
    },
    render: function () {
      this.$el.html(this.tpl());
      this.$el.find('.iscroll').css('height', window.innerHeight - 50);
      this.scroll = new iScroll('menu-list', {
      });
      return this;
    },
    initialize: function () {
      return this.render();
    }
  });
  module.exports = MenuView;
});
