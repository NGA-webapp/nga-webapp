define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var ui = require('utils/ui/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var tpl = require('templates/forums/forums.tpl');
  var tplContent = require('templates/forums/content.tpl');
  var Navigate = require('utils/Navigate');
  var appCache = require('modules/AppCache').appCache;
  var siteStorage = require('modules/storage/site');
  var sliceSubject = require('utils/common').sliceSubject;
  var Notification = require('utils/Notification');
  

  var ForumsView = BasicView.extend({
    el: '#forums',
    tpl: art.compile(tpl),
    tplContent: art.compile(tplContent),
    flag: {
      chooseFavor: false,
      hasRenderList: false,
    },
    events: {
      // 跳转用singleTap触发 防止手误
      'singleTap li.forum': function (e) {
        var $li = $(e.currentTarget);
        if (!this.flag.chooseFavor) {
          this.introForum($li);
        }
      },
      'tap li.forum': function (e) {
        var $li = $(e.currentTarget);
        if (this.flag.chooseFavor) {
          this.toogleFavor($li);
        }
      },
      'singleTap .action-back': function () {
        Backbone.stage.back(['bounce-right', 'bounce-right']);
      },
      'swipeRight header+article': function () {
        if (this.flag.chooseFavor) {
          Navigate.back();
        } else {
          this.openLeftSider();
        }
      },
      'swipe .asideMask': function () {
        if (!this.flag.chooseFavor) {
          this.closeSider();
        }
      },
      'tap .asideMask': function () {
        if (!this.flag.chooseFavor) {
          this.closeSider();
        }
      },
      'singleTap .action-aside': function () {
        this.openLeftSider();
      }
    },
    toogleFavor: function ($li) {
      var fid;
      if ($li.hasClass('choose')) {
        fid = $li.attr('data-fid');
        siteStorage.removeFavorForum(fid);
        this.$el.find('li.forum[data-fid="' + fid + '"]').removeClass('choose');
      } else {
        if (siteStorage.getFavorForum().length >= 3) {
          Notification.alert('只能选3个最喜爱的版面');
        } else {
          fid = $li.attr('data-fid');
          siteStorage.addFavorForum(fid);
          this.$el.find('li.forum[data-fid="' + fid + '"]').addClass('choose');
        }
      }
    },
    introForum: function ($li) {
      var fid = $li.attr('data-fid');
      Backbone.stage.change('#!/forum/' + fid, ['bounce-left', 'bounce-left']);
      appCache.get('forumView').$el.find('header .subject').text(sliceSubject($li.find('h4').text()));
      appCache.get('menuView').uiCurrentForum(fid);
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
      this.scroll = new iScroll('forums-article', {
      });
      this.$ul = this.$el.find('ul');
      return this;
    },
    // 
    open: function (chooseFavor) {
      var self = this;
      var _switch = function () {
        var favorForum;
        var i, len;
        self.flag.chooseFavor = !!chooseFavor;
        if (chooseFavor) {
          self.$el.find('header .subject').text('选择最喜爱的版面');
          self.$el.find('header>h1>a').removeClass('action-aside').addClass('action-back');
          self.$el.find('header>h1>a>.glyphicon').removeClass('glyphicon-list').addClass('glyphicon-chevron-left');
          favorForum = siteStorage.getFavorForum();
          for (i = 0, len = favorForum.length; i < len; i++) {
            self.$el.find('li.forum[data-fid="' + favorForum[i] + '"]').addClass('choose');
          }
        } else {
          self.$el.find('header .subject').text('所有版面');
          self.$el.find('header>h1>a').removeClass('action-back').addClass('action-aside');
          self.$el.find('header>h1>a>.glyphicon').removeClass('glyphicon-chevron-left').addClass('glyphicon-list');
          self.$el.find('li.forum').removeClass('choose');
        }
      };
      if (this.flag.hasRenderList) {
        _switch();
      } else {
        this.renderList(false, _switch);
      }
      return this;
    },
    renderList: function (refresh, next) {
      var self;
      var data, cats;
      self = this;
      if (typeof next !== 'function') {
        next = function () {};
      }
      // 版面数据更新率低，因此只获取一次就不再更新，具体实现为设置一个flag: hasRenderList
      // 如果需要强制更新，则设置refresh为true
      if (!refresh && this.flag.hasRenderList) {
        next.call(this);
        return this;
      }
      // 将storage中的版面列表进行分类
      data = siteStorage.getForumList();
      cats = _.chain(data).groupBy('cid').map(function (cat) {
        return _.groupBy(cat, 'gid');
      }).value();
      // 重写html会导致卡顿，可能是因为事件委托的原因，暂时以延时ui处理
      ui.Loading.open();
      _.delay(function () {
        self.$ul.html(self.tplContent({cats: cats}));
        self.scroll.refresh();
        self.flag.hasRenderList = true;
        ui.Loading.close();
        next.call(self);
      }, 600);
      return this;
    },
    /**
     * 添加全部帖子
     */
    // _addAll: function () {
    //   var self = this;
    //   this.$content.html(this.tpl(this.getForums()));
    //   _.delay(function () {
    //     ui.Loading.close();
    //   }, 600);
    //   _.delay(function () {
    //     self.scroll.refresh();
    //   }, 1000);
    // },
    // fetch: function (data, options) {
    //   ui.Loading.open();
    //   this.collection.fetchXml(data, options);
    // },
    initialize: function () {
      return this.render();
    }
  });
  module.exports = ForumsView;
});
