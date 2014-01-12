define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var ui = require('utils/ui/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var tpl = require('templates/publish/publish.tpl');
  var tplContent = require('templates/publish/content.tpl');
  var inCharset = require('utils/inCharset');
  var appCache = require('modules/AppCache').appCache;
  var Notification = require('utils/Notification');
  
  var postUrl = 'http://bbs.ngacn.cc/post.php';
  // var postUrl = '';

  var PublishView = BasicView.extend({
    el: '#publish',
    tpl: art.compile(tpl),
    tplContent: art.compile(tplContent),
    flag: {
      init: true, // 初始化
      // active 主要用于back的操作，避免重复触发后退动作
      active: false,
      // request 用于发送请求，避免重复触发请求动作
      request: false
    },
    cached: {
      tid: 0,
      fid: 0,
      pid: 0,
      action: ''
    },
    events: {
      'singleTap .action-back': function () {
        if (this.flag.active) {
          this.flag.active === false;
          this.$el.find('input, textarea').blur();
          Backbone.stage.back(['slide-left', 'slide-right']);
        }
      },
      'singleTap .action-ok': function (e) {
        var self = this;
        var $btn = $(e.currentTarget);
        var title = self.$el.find('.param-title').val();
        var content = self.$el.find('.param-content').val();
        var complete;
        if (self.flag.request) {
          return;
        }
        self.flag.request = true;
        his.$el.find('input, textarea').blur();
        $btn.addClass('loading').find('.glyphicon').removeClass('glyphicon-ok').addClass('glyphicon-refresh');
        ui.Loading.open();
        complete = function () {
          self.flag.request = false;
          $btn.removeClass('loading').find('.glyphicon').addClass('glyphicon-ok').removeClass('glyphicon-refresh');
          ui.Loading.close();
        };
        self.charsetRequest = inCharset.get(content, 'gbk', function (content) {
          self.charsetRequest = inCharset.get(title, 'gbk', function (title) {
            var data = 'tid=' + self.cached.tid + '&fid=' + self.cached.fid + '&pid=' + self.cached.pid + 
              '&action=' + self.cached.action + '&step=2' + '&lite=xml' +
              '&post_subject=' + title + '&post_content=' + content;
            self.xhr = $.ajax({
              url: postUrl,
              data: data,
              timeout: 20000,
              complete: complete,
              success: function (data) {
                var target;
                var jump = $(data).find('__JUMP').text();
                var $messages = $(data).find('__MESSAGE > item');
                var readUrl = $(data).find('item > item').eq(0).text();
                var i, len, tmp, msg;
                if ($messages.length > 0) {
                  for (i = 0, len = $messages.length; i < len; i++) {
                    // 跳过无用的纯数字的提示
                    if (!((tmp = $messages.eq(i).text()).match(/^\d*$/))) {
                      msg = tmp;
                      break;
                    }
                  }
                  Notification.alert(msg ? msg.slice(0, 50) : '网络错误');
                }
                jump = jump || readUrl;
                if (jump) {
                  // /read.php?tid=6726209&_ff=335&page=e#a 
                  if ((target = jump.match(/tid=(\d+)/)) && target.length === 2) {
                    Backbone.stage.back(['slide-bottom', 'slide-bottom'], {trigger: true});
                  }
                }
              },
              error: function (xhr, err) {
                var msg;
                if (xhr.responseText) {
                  msg = xhr.responseText.match(/<__MESSAGE><item>\d+<\/item><item>(.*?)<\/item>/);
                  if (!(msg && msg.length === 2)) {
                    msg = xhr.responseText.match(/<__MESSAGE><item>(.*?)<\/item><item>\d+<\/item>/);
                  }
                  if (msg && msg.length === 2) {
                    Notification.alert(msg[1].slice(0, 50));
                    return;
                  }
                }
                if (err) {
                  if (err === 'timeout') {
                    Notification.alert('网络连接超时');
                    return;
                  }
                }
                Notification.alert('网络错误.');
              },
              type: 'post',
              dataType: 'xml'
            });
          }, function () {
            complete();
          });
        }, function () {
          complete();
        });
      },
    },
    open: function (fid, tid) {
      var action;
      this.flag.active = true;
      this.cached.action = tid ? 'reply' : 'new';
      this.cached.tid = tid;
      this.cached.fid = fid;
      this._refresh();
    },
    render: function () {
      this.$el.html(this.tpl());
      this.$content = this.$el.find('.content');
      this._refresh();
      return this;
    },
    _refresh: function () {
      var self = this;
      if (!self.flag.init) {
        ui.Loading.open();
      }
      this.$content.html(this.tplContent({}));
      this.$content.removeClass('hide').addClass('show');
      if (!self.flag.init) {
        _.delay(function () {
          ui.Loading.close();
        }, 200);
      }
      self.flag.init = false;
    },
    initialize: function () {
      this.$content = this.$el.find('.content');
      return this.render();
    }
  });
  module.exports = PublishView;
});
