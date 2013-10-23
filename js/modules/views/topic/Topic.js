define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var ui = require('utils/ui/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var PostInTopicCollection = require('modules/daos/topic/PostInTopicCollection');
  var tpl = require('templates/topic/topic.tpl');
  var RowTopicView = require('modules/views/topic/Row');
  var Navigate = require('utils/Navigate');
  var sliceSubject = require('utils/common').sliceSubject;


  var TopicView = BasicView.extend({
    el: '#topic',
    tpl: art.compile(tpl),
    events: {
      'tap .action-back': function () {
        Navigate.back();
      },
      'singleTap .action-previous': function () {
        var tid, page;
        if (this.collection.cache.page <= 1) {
          alert('已经是第一页');
          return false;
        }
        tid = this.collection.cache.tid;
        page = this.collection.cache.page - 1;
        Backbone.history.navigate('#!/topic/' + tid + '/p' + page);
        this.fetch({tid: tid, page: page});
      },
      'singleTap .action-next': function () {
        var tid, page;
        if (this.collection.cache.pageCount <= this.collection.cache.page) {
          alert('已经到了最后一页');
          return false;
        }
        tid = this.collection.cache.tid;
        page = this.collection.cache.page + 1;
        Backbone.history.navigate('#!/topic/' + tid + '/p' + page);
        this.fetch({tid: tid, page: page});
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
    render: function () {
      this.$el.html(this.tpl());
      this.$el.find('.iscroll').css('height', window.innerHeight - 50);
      this.scroll = new iScroll('topic-article', {
      });
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
