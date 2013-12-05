define(function (require, exports, module) {
  var art = require('utils/artTemplate/index');
  var ui = require('utils/ui/index');
  var BasicView = require('modules/views/abstracts/Basic');
  var tpl = require('templates/login/login.tpl');
  var tplContent = require('templates/login/content.tpl');
  var trim = require('utils/common').trim;
  var config = require('config/index');
  var RSAKey = require('utils/rsa/rsa').RSAKey;
  var appCache = require('modules/AppCache').appCache;

var inCharset = require('utils/inCharset');
  var loginUrl = config.nakeServer ? '/api/login' : 'http://bbs.ngacn.cc/nuke.php?func=login';
  var gsUrl = config.nakeServer ? '/api/gs' : 'http://bbs.ngacn.cc/nuke.php?func=login&normal_login&gs&raw=2';

  var encryptPassword = function (password, gs) {
    var m = 'ac8035fde4630e011ab3f32f85e85c8eddd7bb5519092e6788f0b6f94995ae86df7078315b00aebefdbf9ed60fdfeed5b8ff41f0899a1d9e98d34669ee88b3eb29061f646017d42970dc020eb87fba0a45c798036a4567077d83e6395b1197ccf80bd621a99dca445d90ab57a1e600e10f6427cf405b474a1933eb8dfbf5009e2f2182c9a7d78d83c1157c397c7eed73c298f8004acef65ffdf89adcc7f5415ce3c755c8ae1e17281b0bcdbfb9ed96ea947e7d25aa2d2e38be10606ed63548e928867eeb797a7c33cded8d5d0319b92a195ef3295262316f6a7114567e794ff06475f24c32442bf022e9d19cea2dd72518e4ff7a571cde7c37fe8bacda00b899';
    var e = '10001';
    var rsa = new RSAKey();
    rsa.setPublic(m, e);
    return '\t' + rsa.encrypt(password + '\t' + gs);
  };

  var LoginView = BasicView.extend({
    el: '#login',
    tpl: art.compile(tpl),
    tplContent: art.compile(tplContent),
    flag: {
      logging: false // 正在登录
    },
    nextAction: {
      success: function () {}
    },
    events: {
      'submit .action-login': 'doLogin',
      'singTap .action-register': 'doRegister'
    },
    doRegister: function (events) {
      var url = $(events.currentTarget).attr('data-url');
      $(document).on('deviceready', function () {
        cordova && cordova.require('org.apache.cordova.inappbrowser.InAppBrowser')(url, '_blank', 'location=yes');
      }, false);
    },
    doLogin: function () {
      var self, username ,password;
      if (this.flag.logging) {
        return false;
      }
      self = this;
      username = self.$el.find('.username').val();
      password = self.$el.find('.password').val();
      if (trim(username) === '' || trim(password) === '') {
        alert('用户和密码不能为空');
        return false;
      }
      self.flag.logging = true;
      console.log('connect start');
      ui.Loading.open();
      inCharset(username, 'gbk', function (username){
        $.get(gsUrl, function (gs) {
          // zepto会将object类型的param进行一次编码，所以这里直接使用字符串拼装，避免错误的编码
          var data = 'login_type=use_name' + 
            '&username=' + username + 
            '&password=' + encryptPassword(password, gs) +
            '&expires=' + 31536000;
          $.ajax({
            type: 'post',
            url: loginUrl,
            data: data,
            beforeSend: function (req) {
              req.overrideMimeType("text/html; charset=gbk"); 
              req.setRequestHeader('accept', 'text/javascript; charset=gbk');
            },
            success: function (resp) {
              var success, msg;
              console.log('connect finished');
              ui.Loading.close();
              if (resp.match(/登录成功/)) {
                success = true;
                msg = '登录成功';
                self.nextAction.success();
              } else {
                success = false;
                if (resp.match(/密码错误/)) {
                  msg = '密码错误';
                } else if (resp.match(/错误尝试过多/)) {
                  msg = '错误尝试过多，请等待1~30分钟后登录';
                } else {
                  msg = '登录失败';
                }
              }
              alert(msg);
              self.flag.logging = false;
            }
          });
        });
      });
      return false;
    },
    render: function () {
      this.$el.html(this.tpl());
      this.$content = this.$el.find('.content');
      this._refresh();
      return this;
    },
    _refresh: function () {
      var self = this;
      ui.Loading.open();
      this.$content.html(this.tplContent({}));
      this.$content.removeClass('hide').addClass('show');
      _.delay(function () {
        ui.Loading.close();
      }, 200);

    },
    initialize: function () {
      this.$content = this.$el.find('.content');
      return this.render();
    }
  });
  module.exports = LoginView;
});
