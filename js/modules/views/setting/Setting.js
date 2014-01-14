define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var ui = require('utils/ui/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var tpl = require('templates/setting/setting.tpl');
  var appCache = require('modules/AppCache').appCache;
  var siteStorage = require('modules/storage/site');
  var Notification = require('utils/Notification');

  var SettingView = BasicView.extend({
    el: '#setting',
    tpl: art.compile(tpl),
    events: {
      'singleTap .action-settingFavor': function () {
        Backbone.stage.change('#!/setting/favor', ['slide-right', 'slide-left']);
      },
      'singleTap .action-customForums': function () {
        Backbone.stage.change('#!/customForums', ['slide-right', 'slide-left']);
      },
      'singleTap .action-clearLastForums': function () {
        Notification.confirm('真的要清空版面历史记录吗历史记录吗？', function (result) {
          if (result === true || result == 2) {
            siteStorage.clearLastForum();
          }
        }, '清空版面历史记录', '手抖,是的呀');
      },
      'singleTap .select': function (e) {
        $li = $(e.currentTarget);
        $li.find('.checkbox').toggleClass('checked');
        siteStorage.toggleSetting($li.attr('data-key'));
      },
      'swipeRight header+article': 'openLeftSider',
      'swipe .asideMask': 'closeSider',
      'tap .asideMask': 'closeSider',
      'tap .action-aside': 'openLeftSider',
    },
    openLeftSider: function () {
      var self = this;
      self.$el.find('.asideMask').addClass('on');
      Backbone.aside.onceAfterHide(function () {
        self.$el.find('.asideMask').removeClass('on');
      });
      Backbone.aside.show('menu', ['', 'slide-left']);
    },
    closeSider: function () {
      Backbone.aside.hide(['', 'slide-left']);
    },
    render: function () {
      var setting = siteStorage.getSetting();
      this.$el.html(this.tpl({setting: setting}));
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
