define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var tpl = require('templates/topic/row.tpl');
  var siteStorage = require('modules/storage/site');

  var RowTopicView = BasicView.extend({
    tagName: 'li',
    events: {
      'singleTap .avatar': function () {
        Backbone.stage.change('#!/user/uid/' + this.model.get('authorId'), ['slide-right', 'slide-right']);
      },
      'singleTap a.url': function (events) {
        var url = $(events.currentTarget).attr('data-url');
        $(document).on('deviceready', function () {
          cordova && cordova.require('org.apache.cordova.inappbrowser.InAppBrowser')(url, '_system', 'location=yes');
        }, false);
      },
      'singleTap .content img': function (events) {
        var url = $(events.currentTarget).attr('src');
        $(document).on('deviceready', function () {
          cordova && cordova.require('org.apache.cordova.inappbrowser.InAppBrowser')(url, '_blank', 'location=yes');
        }, false);
      },
      'singleTap .ubb-at': function (events) {
        var username = $(events.currentTarget).attr('data-username');
        Backbone.stage.change('#!/user/username/' + username, ['slide-right', 'slide-right']);
      },
      'singleTap .ubb-collapse-content': function (events) {
        var $self = $(events.currentTarget);
        $self.parent().attr('open', null);
      },
      'singleTap .ubb-flash .ubb-flash-control': function (events) {
        var $self = $(events.currentTarget);
        var $video = $self.siblings('video');
        $video.get(0).play();
      }
    },
    tpl: art.compile(tpl),
    render: function () {
      var data = this.model.toJSON();
      _.extend(data, {setting: siteStorage.getSetting()});
      this.$el.html(this.tpl(data));
      return this;
    },
    initialize: function () {
      return this.render();
    }
  });
  module.exports = RowTopicView;
});
