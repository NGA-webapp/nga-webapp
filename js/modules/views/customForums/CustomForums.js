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
        }, '添加', ['yamie', 'biu~'], ('')); 
      }
    },
    refresh: function () {
      var forums = siteStorage.getCustomForum();
      this.$ul.html(this.tplContent({forums: forums}));
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
