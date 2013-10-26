define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var ui = require('utils/ui/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var tpl = require('templates/setting/setting.tpl');
  var Navigate = require('utils/Navigate');
  var appCache = require('modules/AppCache').appCache;
  var siteStorage = require('modules/storage/site');

  var SettingView = BasicView.extend({
    el: '#setting',
    tpl: art.compile(tpl),
    events: {
      'singleTap .action-settingFavor': function () {
        Navigate.redirect('#!/setting/favor');
      },
      'singleTap .select': function (e) {
        $li = $(e.currentTarget);
        $li.find('.checkbox').toggleClass('checked');
      },
      'swipeRight header+article': 'openLeftSider',
      'swipe .asideMask': 'closeSider',
      'tap .asideMask': 'closeSider',
      'tap .action-aside': 'openLeftSider',
    },
    openLeftSider: function () {
      // this.$el.addClass('section-sider-left');
      var self = this;
      Navigate.aside('#!/menu', function () {
        self.$el.find('.asideMask').removeClass('on');
      });
      self.$el.find('.asideMask').addClass('on');
    },
    closeSider: function () {
      Navigate.back();
    },
    render: function () {
      this.$el.html(this.tpl());
      this.$el.find('.iscroll').css('height', window.innerHeight - 50);
      this.scroll = new iScroll('setting-article', {
      });
      return this;
    },
    initialize: function () {
      return this.render();
    }
  });
  module.exports = SettingView;
});
