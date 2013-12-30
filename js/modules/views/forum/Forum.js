define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var ui = require('utils/ui/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var TopicInForumCollection = require('modules/daos/forum/TopicInForumCollection');
  var tpl = require('templates/forum/forum.tpl');
  var RowForumView = require('modules/views/forum/Row');
  var Navigate = require('utils/Navigate');
  var iScrollPull = require('utils/iScrollPull');
  var appCache = require('modules/AppCache').appCache;
  var sliceSubject = require('utils/common').sliceSubject;
  var inCharset = require('utils/inCharset');
  
  var ForumView = BasicView.extend({
    el: '#forum',
    tpl: art.compile(tpl),
    _currentPage: 0,
    flag: {
      favorList: false,
      searchList: false
    },
    cache: {
      keyword: ''
    },
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
      'singleTap .action-new': function () {
        Backbone.stage.change('#!/publish/' + this.collection.cache.fid, ['bounce-top', 'bounce-top']);
        appCache.get('publishView').$el.find('header .subject').text(sliceSubject('新帖'));
      },
      'singleTap .action-refresh': function (e) {
        var $btn = $(e.currentTarget);
        $btn.addClass('loading');
        this.refresh();
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
    refresh: function () {
      if (this.flag.favorList) {
        this.fetch({favor: 1, page: 1}, {remove: true});
      } else if (this.flag.searchList) {
        this.fetch({key: this.cache.keyword, fidgroup: 'user', page: 1}, {remove: true});
      } else {
        this.fetch({fid: this.collection.cache.fid, page: 1}, {remove: true});
      }
    },
    render: function () {
      var self = this;
      var pullDownAction, pullUpAction;
      this.$el.html(this.tpl());
      this.$el.find('.iscroll').css('height', window.innerHeight - 50);
      pullDownAction = function () {
        self.refresh();
      };
      pullUpAction = function () {
        if (self.flag.favorList) {
          self.fetch({favor: 1, page: self._currentPage + 1}, {remove: false});
        } else if (self.flag.searchList) {
          self.fetch({key: self.cache.keyword, fidgroup: 'user', page: self._currentPage + 1}, {remove: false});
        } else {
          self.fetch({fid: self.collection.cache.fid, page: self._currentPage + 1}, {remove: false});
        }
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
      if (this.$ul.find('[data-tid="' + topic.id + '"]').length > 0) {
        return;
      }
      var view = new RowForumView({model: topic});
      this.$ul.append(view.el);
      $(view.el).removeClass('hide').addClass('show');
    },
    /**
     * 添加全部帖子
     */
    _addAll: function (model, resp, options) {
      var self = this;
      var match;
      this.$el.find('.action-pulldown, .action-pullup, .action-refresh').removeClass('loading');
      if (typeof options.data === 'object') {
        this._currentPage = options.data.page;
      } else if (typeof options.data === 'string') {
        match = options.data.match(/&page=(\d*)/);
        if (match && match.length > 1) {
          this._currentPage = parseInt(match[1], 0);
        } else {
          this._currentPage = 1;
        }
      } else {
        this._currentPage = 1;
      }
      // 刷新时清空列表，重置滚动条位置
      if (options.remove) {
        this.$ul.html('');
        this.scroll.scrollTo(0, 0, 0);
      }
      this.collection.each(this._addOne, this);
      _.delay(function () {
        ui.Loading.close();
      }, 600);
      _.delay(function () {
        self.scroll.refresh();
      }, 1000);
    },
    /**
     * 清空列表
     */
    _clearAll: function (model, resp, options) {
      var self = this;
      var match;
      this.$el.find('.action-pulldown, .action-pullup, .action-refresh').removeClass('loading');
      this.$ul.html('');
      this.scroll.scrollTo(0, 0, 0);
      _.delay(function () {
        ui.Loading.close();
      }, 600);
      _.delay(function () {
        self.scroll.refresh();
      }, 1000);
    },
    fetch: function (data, options) {
      var self = this;
      ui.Loading.open();
      this.flag.favorList = !!data.favor;
      this.flag.searchList = !!data.key;
      this.cache.keyword = (data.key || '');
      if (this.flag.favorList || this.flag.searchList) {
        this.$el.find('.action-new').hide();
      } else {
        this.$el.find('.action-new').show();
      }
      _.defaults(options || (options = {}), {
        error: function () {
          ui.Loading.close();
        }
      });
      // 搜索列表需要对关键字转编码
      if (data.key) {
        inCharset(data.key, 'gbk', function (key) {
          var obj = _.extend({}, data, {key: key});
          options = _.extend({}, options, {urlEncoded: true});
          self.collection.fetchXml(obj, options);
        });
      } else {
        this.collection.fetchXml(data, options);
      }
    },
    initialize: function () {
      this.collection = new TopicInForumCollection();
      this.listenTo(this.collection, 'sync', this._addAll);
      this.listenTo(this.collection, 'error', this._clearAll);
      return this.render();
    }
  });
  module.exports = ForumView;
});
