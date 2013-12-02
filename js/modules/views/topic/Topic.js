define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var ui = require('utils/ui/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var PostInTopicCollection = require('modules/daos/topic/PostInTopicCollection');
  var tpl = require('templates/topic/topic.tpl');
  var RowTopicView = require('modules/views/topic/Row');
  var Navigate = require('utils/Navigate');
  var sliceSubject = require('utils/common').sliceSubject;
  var iScrollPull = require('utils/iScrollPull');

  var TopicView = BasicView.extend({
    el: '#topic',
    tpl: art.compile(tpl),
    events: {
      'singleTap .action-back': function () {
        Navigate.back();
      },
      'singleTap .action-skip': function () {
        var maxPage = this.collection.cache.pageCount;
        var page = window.prompt('跳转到指定页', maxPage);
        var tid = this.collection.cache.tid;
        if (page) {
          page = page > maxPage ? maxPage : page;
          Backbone.history.navigate('#!/topic/' + tid + '/p' + page);
          this.fetch({tid: tid, page: page});
        }
      },
      'singleTap .action-share': function () {
        var url = 'http://bbs.ngacn.cc/read.php?tid=' + this.collection.cache.tid;
        $(document).on('deviceready', function () {
          cordova && cordova.require('com.verso.cordova.clipboard.Clipboard').copy(url, function () {
            alert('帖子地址已复制到粘贴板');
          }, function () {
            alert('分享失败');
          });
        }, false);
      },
      'swipeUp': function () {
        var $footer = this.$footer;
        $footer.addClass('hide');
        _.delay(function () {
          $footer.addClass('behind');
        }, 400);
      },
      'swipeDown': function () {
        var $footer = this.$footer;
        $footer.removeClass('behind').removeClass('hide');
      },
      'singleTap': function () {
        var $footer = this.$footer;
        $footer.removeClass('behind').removeClass('hide');
      }
    },
    _refreshScroll: function () {
      this.$el.find('.action-pulldown, .action-pullup').removeClass('loading');
      this.scroll.refresh();
    },
    prevPage: function () {
      var tid, page;
      if (this.collection.cache.page <= 1) {
        this._refreshScroll();
        alert('已经是第一页');
        return false;
      }
      tid = this.collection.cache.tid;
      page = this.collection.cache.page - 1;
      Backbone.history.navigate('#!/topic/' + tid + '/p' + page);
      this.fetch({tid: tid, page: page});
    },
    nextPage: function () {
      var tid, page;
      if (this.collection.cache.pageCount <= this.collection.cache.page) {
        this._refreshScroll();
        alert('已经到了最后一页');
        return false;
      }
      tid = this.collection.cache.tid;
      page = this.collection.cache.page + 1;
      Backbone.history.navigate('#!/topic/' + tid + '/p' + page);
      this.fetch({tid: tid, page: page});
    },
    render: function () {
      var self = this;
      var pullDownAction, pullUpAction;
      this.$el.html(this.tpl());
      this.$el.find('.iscroll').css('height', window.innerHeight - 50);
      pullDownAction = function () {
        self.prevPage();
      };
      pullUpAction = function () {
        self.nextPage();
      };
      iScrollPull.call(this, 'topic-article', pullDownAction, pullUpAction);
      this.$ul = this.$el.find('ul');
      this.$subject = this.$el.find('header span.subject');
      this.$footer = this.$el.find('footer');
      return this;
    },
    /**
     * 渲染单层楼视图
     * @private
     * @param {TopicModel} post
     */
    _addOne: function (post) {
      var view = new RowTopicView({model: post});
      this.$ul.append(view.el);
      $(view.el).removeClass('hide').addClass('show');
    },
    /**
     * 添加全部楼层
     */
    _addAll: function () {
      var self = this;
      this._refreshScroll();
      this.$ul.html('');
      this.scroll.scrollTo(0, 0, 0);
      console.log(this.collection);
      this.collection.each(this._addOne, this);
      this.$subject.text(sliceSubject(this.collection.cache.subject));
      _.delay(function () {
        ui.Loading.close();
      }, 600);
      _.delay(function () {
        self.scroll.refresh();
      }, 1000);
    },
    fetch: function (data, options) {
      ui.Loading.open();
      _.defaults(options || (options = {}), {
        error: function () {
          ui.Loading.close();
          _.delay(function (){
            Navigate.back();
          }, 400);
        }
      });
      this.collection.fetchXml(data, options);
    },
    initialize: function () {
      this.collection = new PostInTopicCollection();
      this.$ul = this.$el.find('ul');
      this.$subject = this.$el.find('header span.subject');
      this.$footer = this.$el.find('footer');
      this.listenTo(this.collection, 'sync', this._addAll);
      return this.render();
    }
  });
  module.exports = TopicView;
});
