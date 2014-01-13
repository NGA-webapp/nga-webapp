define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var BasicView = Backbone.View.extend({
    constructor: function (options) {
      var self = this;
      Backbone.View.prototype.constructor.call(this, options);
      // 控制转场流程中视图元件、事件的启用与禁用
      var elems = (function () {
        var hasCached = false;
        var enabled;
        var disable = function () {
          if (hasCached) {
            return true;
          }
          enabled = self.$el.find(':enabled');
          enabled.attr('disabled', 'disabled');
          hasCached = true;
        };
        var enable = function () {
          if (!hasCached) {
            return true;
          }
          enabled.attr('disabled', null);
          hasCached = false;
        };
        var blur = function () {
          self.$el.find(':focus').blur();
        };
        return {
          disable: disable,
          enable: enable,
          blur: blur
        };
      })();
      var cache = {};
      this.on('stage-in-start', function () {
        this.delegateEvents();
        elems.blur();
        elems.disable();
      });
      this.on('stage-in-end', function () {
        elems.enable();
      });
      this.on('stage-out-start', function () {
        this.undelegateEvents();
        elems.blur();
        elems.disable();
        // 转出的场景停止当前请求
        if (this.xhr && typeof this.xhr.abort === 'function') {
          if (!(cache.xhr && cache.xhr === this.xhr)) {
            cache.xhr = this.xhr;
            this.xhr.abort();
          }
        }
        if (this.charsetRequest && typeof this.charsetRequest.abort === 'function') {
          if (!(cache.charsetRequest && cache.charsetRequest === this.charsetRequest)) {
            cache.charsetRequest = this.charsetRequest;
            this.charsetRequest.abort();
          }
        }
      });
      this.on('aside-aside-in-start', function () {
        elems.blur();
        elems.disable();
      });
      this.on('aside-aside-in-end', function () {
        elems.enable();
      });
      this.on('aside-aside-out-start', function () {
        elems.blur();
        elems.disable();
      });
      this.on('aside-section-in-start', function () {
        elems.blur();
        elems.disable();
      });
      this.on('aside-section-out-start', function () {
        elems.blur();
        elems.disable();
      });
      this.on('aside-section-out-end', function () {
        elems.enable();
      });
    },
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

