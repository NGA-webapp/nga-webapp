define(function (require, exports, module) {
  var BasicModel = require('modules/daos/abstracts/BasicModel');
  var browser = require('utils/browser');
  var parser = require('modules/daos/site/parser');
  var config = require('config/index');
  var appCache = require('modules/AppCache').appCache;
  var LocalStorageProxy = require('utils/LocalStorageProxy/index').LocalStorageProxy;

  var SiteStorage = function () {
    return LocalStorageProxy.apply(this, arguments);
  };
  _.extend(SiteStorage.prototype, LocalStorageProxy.prototype, {
    /**
     * 检查登录状态，带回调函数时将进行一次实时查询
     * @method  checkLogged
     * @param  {Function} next 回调函数
     * @async
     */
    /**
     * 检查登录状态，不带参数时则直接返回当前内存中的状态（非实时）
     * @method  checkLogged
     * @return {boolean} 
     */
    checkLogged: function (next) {
      var siteModel = appCache.get('siteModel');
      var doNext;
      if (arguments.length === 0) {
        return siteModel.get('isLogged');
      }
      doNext = function (model, isLogged, options) {
        next(!!isLogged);
        siteModel.off('change:isLogged', doNext)
      };
      siteModel.on('change:isLogged', doNext);
      siteModel.fetchXml();
    },
    // 获取初始化标记
    isInit: function () {
      return !!this.get('hasInit');
    },
    // 所有版面列表
    getForumList: function () {
      return this.get('forums') || [];
    },
    // 最喜爱的版面列表
    getFavorForum: function () {
      return this.get('favorForum') || [];
    },
    // 历史访问的版面列表
    getLastForum: function (includeFavor) {
      if (includeFavor) {
        return this.get('lastForum') || [];
      } else {
        return _.difference(this.getLastForum(true), this.getFavorForum())
      }
    },
    // 获取快速导航的版面列表
    getQuickForum: function () {
      var favor = this.getFavorForum();
      var last = this.getLastForum();
      return _.chain(favor).union(last).first(4).value();
    },
    // 增加历史访问的版面
    addLastForum: function (fid) {
      var last = this.getLastForum();
      this.set('lastForum', _.chain([fid]).union(last).first(4).value());
    },
    // 增加最喜爱的版面
    addFavorForum: function (fid) {
      var favor = this.getFavorForum();
      this.set('favorForum', _.chain(favor).union([fid]).first(4).value());
    },
    // 移除最喜爱的版面
    removeFavorForum: function (fid) {
      var favor = this.getFavorForum();
      this.set('favorForum', _.chain(favor).difference([fid]).first(4).value());
    },
    // 更新设置
    getSetting: function (key) {
      var defaults = {
        downloadAvatar: true,
        downloadImage: true
      };
      var setting = _.extend(defaults, this.get('setting'));
      return typeof key === 'undefined' ? setting : setting[key];
    },
    // 切换设置
    toggleSetting: function (key) {
      var setting = this.getSetting();
      if (key && key in setting) {
        setting[key] = !setting[key];
        this.set('setting', setting);
      }
    },
    // 获取所有登录过的用户名
    getUsers: function () {
      var users = this.get('users');
      if (users && users.length) {
        return users;
      } else {
        return [];
      }
    },
    // 增加登录的用户名
    addUser: function (username) {
      var users = this.getUsers();
      this.set('users', _.chain([username]).union(users).first(10).value())
    },
    // 获取最近一个登录的用户名
    getLastUser: function () {
      return this.getUsers()[0];
    },
  });
  var site = new SiteStorage('nga');
  module.exports = site;
});
