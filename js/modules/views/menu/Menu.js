define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var ui = require('utils/ui/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var tpl = require('templates/menu/menu.tpl');
  var Navigate = require('utils/Navigate');
  var appCache = require('modules/AppCache').appCache;
  var siteStorage = require('modules/storage/site');
  var sliceSubject = require('utils/common').sliceSubject;

  var MenuView = BasicView.extend({
    el: '#menu',
    tpl: art.compile(tpl),
    events: {
      'singleTap .quickNav': function (events) {
        var $nav = $(events.currentTarget);
        if (typeof $nav.data('fid') !== 'undefined') {
          Navigate.redirect('#!/forum/' + $nav.data('fid'));
          appCache.get('forumView').$el.find('header .subject').text(sliceSubject($nav.text()));
        }
      },
      'singleTap .forums': function () {
        Navigate.redirect('#!/forums');
      },
      'singleTap .setting': function () {
        Navigate.redirect('#!/setting');
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
      var refreshQuickForum = function () {
        console.log(arguments);
      };
      this.listenTo(siteStorage, 'change:lastForum', refreshQuickForum);
      this.listenTo(siteStorage, 'change:favorForum', refreshQuickForum);
      return this.render();
    }
  });
  module.exports = MenuView;
});
