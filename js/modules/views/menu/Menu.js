define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var ui = require('utils/ui/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var tpl = require('templates/menu/menu.tpl');
  var Navigate = require('utils/Navigate');
  var appCache = require('modules/AppCache').appCache;
  var sliceSubject = require('utils/common').sliceSubject;

  var MenuView = BasicView.extend({
    el: '#menu',
    tpl: art.compile(tpl),
    events: {
      'singleTap .quickNav': function (events) {
        var $nav = $(events.target);
        if (typeof $nav.data('fid') !== 'undefined') {
          Navigate.redirect('#!/forum/' + $nav.data('fid'));
          appCache.get('forumView').$el.find('header .subject').text(sliceSubject($nav.text()));
        }
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
