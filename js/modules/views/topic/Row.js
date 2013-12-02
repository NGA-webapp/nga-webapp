define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var tpl = require('templates/topic/row.tpl');
  var Navigate = require('utils/Navigate');

  var RowTopicView = BasicView.extend({
    tagName: 'li',
    className: 'hide',
    events: {
      'singleTap .avatar': function () {
        Navigate.redirect('#!/user/' + this.model.get('authorId'));
      },
      'singleTap a.url': function (events) {
        var url = $(events.currentTarget).attr('data-url');
        $(document).on('deviceready', function () {
          cordova && cordova.require('org.apache.cordova.inappbrowser.InAppBrowser')(url, '_blank', 'location=yes');
        }, false);
      }
    },
    tpl: art.compile(tpl),
    render: function () {
      this.$el.html(this.tpl(this.model.toJSON()));
      return this;
    },
    initialize: function () {
      return this.render();
    }
  });
  module.exports = RowTopicView;
});
