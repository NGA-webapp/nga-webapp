define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var BasicView = Backbone.View.extend({
    templateFile: '',
    template: function () {
      return art.compile(this.templateFile);
    },
    render: function () {
      $el.html(this.template()(this.model));
      return this;
    }
  });
  module.exports = BasicView;
});

