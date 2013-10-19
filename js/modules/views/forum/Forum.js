define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var ui = require('utils/ui/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var ThreadModel = require('modules/models/integrations/Thread');
  var tpl = require('templates/forum/forum.tpl');
  var RowForumView = require('modules/views/forum/Row');

  var ForumView = BasicView.extend({
    el: '#forum',
    tpl: art.compile(tpl),
    events: {
      // 抖动动画测试
      'singleTap .glyphicon-search': function () {
        $self = this.$el.find('.glyphicon-search');
        $self.addClass('animated shake');
        _.delay(function () {$self.removeClass('animated');}, 1000);
      },
      // 登录调试测试
      'doubleTap .glyphicon-pencil': function () {
        $.get('/api/login', function () {
          alert('connected!');
          window.location = function () {
            return window.location;
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
      'tap header>h1>a': 'openLeftSider',
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
      this.scroll = new IScroll('.iscroll', {
        scrollbars: true,
        interactiveScrollbars: true
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
    },
    /**
     * 添加全部帖子
     */
    _addAll: function () {
      var self = this;
      ui.Loading.open();
      this.$ul.html('');
      this.model.get('topics').each(this._addOne, this);
      _.delay(function () {
        ui.Loading.close();
        self.$el.find('img').removeClass('hide');
        self.$ul.find('li').removeClass('hide');
      }, 1000);
      _.delay(function () {
        self.scroll.refresh();
      }, 1200);
    },
    fetch: function (options) {
      this.model.fetchXml(options);
    },
    initialize: function () {
      ui.Loading.open();
      this.model = new ThreadModel();
      this.$ul = this.$el.find('ul');
      this.listenTo(this.model, 'change', this._addAll);
      ui.Loading.close();
      return this.render();
    }
  });
  module.exports = ForumView;
});
