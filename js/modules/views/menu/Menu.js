define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var ui = require('utils/ui/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var tpl = require('templates/menu/menu.tpl');
  var appCache = require('modules/AppCache').appCache;
  var siteStorage = require('modules/storage/site');
  var sliceSubject = require('utils/common').sliceSubject;
  var trim = require('utils/common').trim;
  var Notification = require('utils/Notification');

  var MenuView = BasicView.extend({
    el: '#menu',
    tpl: art.compile(tpl),
    events: {
      'singleTap .quickNav': function (events) {
        var $nav = $(events.currentTarget);
        var fid = $nav.attr('data-fid');
        if (fid !== null) {
          Backbone.aside.hide(['', 'slide-left']);
          Backbone.stage.change('#!/forum/' + fid, ['slide-right', 'slide-left']);
          appCache.get('forumView').$el.find('header .subject').text(sliceSubject($nav.text()));
          this.uiCurrentForum(fid);
        }
      },
      'singleTap .forums': function (e) {
        var $nav = $(e.currentTarget);
        Backbone.aside.hide(['', 'slide-left']);
        Backbone.stage.change('#!/forums', ['slide-right', 'slide-left']);
        this.uiClearNav();
        $nav.addClass('active');
        this.cache.activeNav = '.forums';
      },
      'singleTap .favor': function (e) {
        var $nav = $(e.currentTarget);
        Backbone.aside.hide(['', 'slide-left']);
        Backbone.stage.change('#!/favor', ['slide-right', 'slide-left']);
        appCache.get('forumView').$el.find('header .subject').text(sliceSubject('收藏'));
        this.uiClearNav();
        $nav.addClass('active');
        this.cache.activeNav = '.favor';
      },
      'singleTap .setting': function (e) {
        var $nav = $(e.currentTarget);
        Backbone.aside.hide(['', 'slide-left']);
        Backbone.stage.change('#!/setting', ['slide-right', 'slide-left']);
        this.uiClearNav();
        $nav.addClass('active');
        this.cache.activeNav = '.setting';
      },
      'singleTap .logout': function (e) {
        var $nav = $(e.currentTarget);
        Backbone.aside.hide(['', 'slide-left']);
        Backbone.stage.change('#!/logout', ['slide-right', 'slide-left']);
        this.uiClearNav();
        $nav.addClass('active');
        this.cache.activeNav = '.logout';
      },
      'singleTap .action-search': function () {
        var keyword = this.$el.find('.param-key').val();
        if (!trim(keyword)) {
          Notification.alert('搜索词不能为空哟');
        } else {
          Backbone.aside.hide(['', 'slide-left']);
          Backbone.stage.change('#!/search/' + keyword, ['slide-right', 'slide-left']);
          appCache.get('forumView').$el.find('header .subject').text(sliceSubject('搜索'));
          this.uiClearNav();
          this.cache.activeNav = '';
        }
      }
    },
    cache: {
      activeNav: '',
      favorForum: [],
      lastForum: []
    },
    uiClearNav: function () {
      this.$el.find('.menu-content li').removeClass('active');
    },
    uiCurrentForum: function (fid) {
      var $navs, selector;
      selector = '.quickNav[data-fid="' + fid + '"]';
      $navs = this.$el.find(selector);
      this.uiClearNav();
      if ($navs.length > 0) {
        $navs.addClass('active');
      } else {
        this.$el.find('.forums').addClass('active');
      }
      this.cache.activeNav = selector;
    },
    uiActiveNav: function () {
      if (this.cache.activeNav !== '') {
        this.$el.find(this.cache.activeNav).addClass('active');
      }
    },
    render: function () {
      this.$el.html(this.tpl({favorForum: this.cache.favorForum, lastForum: this.cache.lastForum}));
      this.$el.find('.iscroll').css('height', window.innerHeight - 50);
      this.scroll = new iScroll('menu-list', {
      });
      return this;
    },
    initialize: function () {
      var self = this;
      var refreshQuickForum = function () {
        setTimeout(function () {
          self.cache.favorForum = _.map(siteStorage.getFavorForum(), function (fid) {
            return {
              fid: fid,
              forum: _.find(siteStorage.getForumList(), function (forum) {
                return forum.fid == fid;
              })
            };
          });
          self.cache.lastForum = _.map(siteStorage.getLastForum(), function (fid) {
            return {
              fid: fid,
              forum: _.find(siteStorage.getForumList(), function (forum) {
                return forum.fid == fid;
              })
            };
          });
          self.render();
          self.uiActiveNav();
        }, 0);
      };
      this.listenTo(siteStorage, 'change:lastForum', refreshQuickForum);
      this.listenTo(siteStorage, 'change:favorForum', refreshQuickForum);
      refreshQuickForum();
      return this.render();
    }
  });
  module.exports = MenuView;
});
