define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var ui = require('utils/ui/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var TopicInForumCollection = require('modules/daos/forum/TopicInForumCollection');
  var tpl = require('templates/forum/forum.tpl');
  var RowForumView = require('modules/views/forum/Row');

  var ForumView = BasicView.extend({
    el: '#forum',
    tpl: art.compile(tpl),
    events: {
      // 抖动动画测试
      'singleTap .action-search': function () {
        $self = this.$el.find('.glyphicon-search');
        $self.addClass('animated shake');
        _.delay(function () {$self.removeClass('animated');}, 1000);
      },
      // 登录调试测试
      'doubleTap .action-letter': function () {
        $.get('/api/login', function () {
          alert('connected!');
          window.location = function () {
            return '/client/';
          }();
        });
      },
      // 侧边栏测试
      'swipeLeft header+article': function () {
        this.openRightSider();
      },
      'swipeRight header+article': function () {
        this.openLeftSider();
      },
      // 'swipeLeft .sider-mask': 'closeLeftSider',
      // 'swipeRight .sider-mask': 'closeRightSider',
      // 'touchstart .sider-mask': 'closeSider',
      'swipe .sider-mask': 'closeSider',
      'tap .sider-mask': 'closeSider',
      'tap .action-aside': 'openLeftSider',
    },
    openLeftSider: function () {
      this.$el.addClass('section-sider-left');
      this.$el.find('.sider-mask').addClass('on');
    },
    closeLeftSider: function () {
      this.$el.removeClass('section-sider-left');
      this.$el.find('.sider-mask').removeClass('on');
    },
    closeSider: function () {
      this.$el.removeClass('section-sider-left');
      this.$el.removeClass('section-sider-right');
      this.$el.find('.sider-mask').removeClass('on');
    },
    openRightSider: function () {
      this.$el.addClass('section-sider-right');
      this.$el.find('.sider-mask').addClass('on');
    },
    closeRightSider: function () {
      this.$el.removeClass('section-sider-right');
      this.$el.find('.sider-mask').removeClass('on');
    },
    render: function () {
      this.$el.html(this.tpl());
      this.$el.find('.iscroll').css('height', window.innerHeight - 50);
      // this.scroll = new iScroll('.iscroll', {
      //   scrollbars: true,
      //   interactiveScrollbars: true
      // });
      this.scroll = new iScroll('forum-article', {
      });
      this.$ul = this.$el.find('ul');
      return this;
    },
    /**
     * 渲染单条帖子视图
     * @private
     * @param {TopicModel} topic
     */
    _addOne: function (topic) {
      var view = new RowForumView({model: topic});
      this.$ul.append(view.el);
      $(view.el).removeClass('hide').addClass('show');
    },
    /**
     * 添加全部帖子
     */
    _addAll: function () {
      var self = this;
      this.$ul.html('');
      this.collection.each(this._addOne, this);
      _.delay(function () {
        ui.Loading.close();
      }, 600);
      _.delay(function () {
        self.scroll.refresh();
      }, 1000);
    },
    fetch: function (data, options) {
      ui.Loading.open();
      this.collection.fetchXml(data, options);
    },
    initialize: function () {
      this.collection = new TopicInForumCollection();
      this.listenTo(this.collection, 'sync', this._addAll);
      return this.render();
    }
  });
  module.exports = ForumView;
});
