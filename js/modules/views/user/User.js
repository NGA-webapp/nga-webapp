define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var ui = require('utils/ui/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var tpl = require('templates/user/user.tpl');
  var Navigate = require('utils/Navigate');
  var UserModel = require('modules/daos/user/UserModel');
  var ContentUserView = require('modules/views/user/Content');

  var UserView = BasicView.extend({
    el: '#user',
    tpl: art.compile(tpl),
    events: {
      'tap .action-back': function () {
        Navigate.back();
      }
    },
    render: function () {
      this.$el.html(this.tpl());
      this.$el.find('.iscroll').css('height', window.innerHeight - 50);
      this.scroll = new iScroll('user-article', {
      });
      this.$content = this.$el.find('.content');
      return this;
    },
    _refresh: function () {
      var self = this;
      var view = new ContentUserView({model: this.model});
      this.scroll.scrollTo(0, 0, 0);
      this.$content.html(view.el);
      $(view.el).removeClass('hide').addClass('show');
      _.delay(function () {
        ui.Loading.close();
      }, 200);
      _.delay(function () {
        se1f.scroll.refresh();
      }, 400);

    },
    fetch: function (data, options) {
      ui.Loading.open();
      this.model.fetchXml(data, options);
    },
    initialize: function () {
      this.model = new UserModel();
      this.$content = this.$el.find('.content');
      this.listenTo(this.model, 'sync', this._refresh);
      return this.render();
    }
  });
  module.exports = UserView;
});
