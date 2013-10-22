define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var ui = require('utils/ui/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var PostInTopicCollection = require('modules/daos/topic/PostInTopicCollection');
  var tpl = require('templates/topic/topic.tpl');
  var RowTopicView = require('modules/views/topic/Row');
  var Navigate = require('utils/Navigate');

  var sliceSubject = function (subject) {
    var limit = 14; // 标题最长长度
    if (subject.length > limit ) {
      return subject.slice(0, limit - 2) + '...';
    } else {
      return subject;
    }
  };

  var TopicView = BasicView.extend({
    el: '#topic',
    tpl: art.compile(tpl),
    events: {
      'tap .action-back': function () {
        Navigate.back();
      },
      'swipeUp': function () {
        this.$el.find('footer').addClass('hide').addClass('behind');
      },
      'swipeDown': function () {
        this.$el.find('footer').removeClass('hide').removeClass('behind');
      },
      'singleTap': function () {
        this.$el.find('footer').removeClass('hide').removeClass('behind');
      }
    },
    render: function () {
      this.$el.html(this.tpl());
      this.$el.find('.iscroll').css('height', window.innerHeight - 50);
      this.scroll = new iScroll('topic-article', {
      });
      this.$ul = this.$el.find('ul');
      this.$subject = this.$el.find('header span.subject');
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
      this.listenTo(this.collection, 'sync', this._addAll);
      return this.render();
    }
  });
  module.exports = TopicView;
});
