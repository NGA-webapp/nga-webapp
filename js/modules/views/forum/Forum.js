define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var ui = require('utils/ui/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var TopicInForumCollection = require('modules/daos/forum/TopicInForumCollection');
  var tpl = require('templates/forum/forum.tpl');
  var RowForumView = require('modules/views/forum/Row');
  var Navigate = require('utils/Navigate');
  var iScrollPull = require('utils/iScrollPull');
  
  var ForumView = BasicView.extend({
    el: '#forum',
    tpl: art.compile(tpl),
    _currentPage: 0,
    events: {
      // 抖动动画测试
      'singleTap .action-shake': function () {
        $self = this.$el.find('.glyphicon-search');
        $self.addClass('animated shake');
        _.delay(function () {$self.removeClass('animated');}, 1000);
      },
      // 登录调试测试
      'doubleTap .action-autologin': function () {
        $.get('/api/autoLogin', function () {
          alert('connected!');
          window.location = function () {
            return '/client/';
          }();
        });
      },
      'singleTap .action-refresh': function (e) {
        var $btn = $(e.currentTarget);
        $btn.addClass('loading');
        this.fetch({fid: this.collection.cache.fid, page: 1});
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
      var self = this;
      var pullDownAction, pullUpAction;
      this.$el.html(this.tpl());
      this.$el.find('.iscroll').css('height', window.innerHeight - 50);
      pullDownAction = function () {
        self.fetch({fid: self.collection.cache.fid, page: (self._currentPage > 1 ? self._currentPage - 1 : 1)});
      };
      pullUpAction = function () {
        self.fetch({fid: self.collection.cache.fid, page: self._currentPage + 1});
      };
      iScrollPull.call(this, 'forum-article', pullDownAction, pullUpAction);
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
    _addAll: function (model, resp, options) {
      var self = this;
      this.$el.find('.action-pulldown, .action-pullup, .action-refresh').removeClass('loading');
      this.$ul.html('');
      this._currentPage = options.data.page;
      if (this._currentPage > 1) {
        this.$el.find('.action-pulldown .text').text('上一页');
      } else {
        this.$el.find('.action-pulldown .text').text('刷新');
      }
      this.scroll.scrollTo(0, 0, 0);
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
