define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var ui = require('utils/ui/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var tpl = require('templates/customForums/customForums.tpl');
  var tplContent = require('templates/customForums/content.tpl');
  var siteStorage = require('modules/storage/site');
  var Notification = require('utils/Notification');

  var CustomForumsView = BasicView.extend({
    el: '#customForums',
    tpl: art.compile(tpl),
    tplContent: art.compile(tplContent),
    flag: {
    },
    events: {
      'singleTap .action-back': function () {
        Backbone.stage.back(['slide-left', 'slide-right']);
      },
      'singleTap .action-add': function () {
        Notification.prompt('输入指定版面号', function (result) {
          var tid;
          if (result) {
            tid = result['input1'];
            if (result['buttonIndex'] === 2 && tid) {
              siteStorage.addCustomForum(parseInt(tid, 0) + '');
            }
          }
        }, '添加', ['yamie', '就决定是你了!'], ('')); 
      },
      'longTap .forum': function (e) {
        var $forum = $(e.currentTarget);
        var fid = $forum.attr('data-fid');
        Notification.confirm('是否不再显示该自定义版面[' + fid + ']', function (result) {
          if (result === true || result == 2) {
            siteStorage.removeCustomForum(fid);
          }
        }, '移除自定义版面', 'yamie,是的呀');
      }
    },
    refresh: function () {
      var self = this;
      var forums = siteStorage.getCustomForum();
      this.$ul.html(this.tplContent({forums: forums}));
      setTimeout(function () {
        var last = self.$ul.find('li:last-child').get(0);
        self.scroll.refresh();
        if (last) {
          self.scroll.scrollToElement(last, 100);
        } else {
          self.scroll.scrollTo(0, 0, 0);
        }
      }, 0);
    },
    render: function () {
      this.$el.html(this.tpl());
      this.$el.find('.iscroll').css('height', window.innerHeight - 50);
      this.scroll = new iScroll('customForums-article', {
      });
      this.$ul = this.$el.find('ul');
      return this;
    },
    initialize: function () {
      this.listenTo(siteStorage, 'change:customForum', function () {
        this.refresh();
      });
      return this.render();
    }
  });
  module.exports = CustomForumsView;
});
