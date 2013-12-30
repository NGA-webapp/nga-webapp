define(function (require, exports, module) {
  var EventProxy = require('utils/EventProxy');

  var Aside = function (speed) {
    if (!(this instanceof Aside)) {
      return new Aside(speed);
    }
    // 设置转场速度
    this._speed = speed || 600;
    // 初始化标记
    this._flag = {
      locked: false
    };
    // 设置可用动画
    this._animates = [
      'slide-right', 'slide-left'
    ];
    // 转场动画样式的字符串集合，用于removeClass
    this._animatesString = '';
    // 缓存转场任务，主要用于异步执行完成后的去锁
    this.mission = void 0;
    // 缓存当前视图
    this._currentAside = void 0;
    this._currentSection = void 0;
    // 初始化转场动画样式的字符串集合
    this._initializeAnimateKeys();
    // 执行自定义的初始化方法
    this.initialize();
    return this;
  };

  Aside.prototype.initialize = function () {
    return this;
  };

    /**
   * 生成转场动画样式的字符串集合
   */
  Aside.prototype._initializeAnimateKeys = function () {
    var animates = [];
    _.each(this._animates, function (animate) {
      animates.push('aside-animate-' + animate);
    });
    this._animatesString = animates.join(' ');
    return this;
  };

  /**
   * 取动画样式
   * @param  {string} name  动画名，如果留空或者找不到该动画则会返回默认的转场样式
   * @return {string}      动画样式
   */
  Aside.prototype.getAnimateClass = function (name) {
    var anyAnimate = _.any(this._animates, function (animate) {
      return animate === name;
    });
    if (typeof name === 'string' && anyAnimate) {
      return 'aside-animate-' + name;
    } else {
      return 'aside-animate-slide-left';
    }
  };

  /**
   * 取当前缓存侧边栏
   */
  Aside.prototype.getCurrentAside = function () {
    return this._currentAside;
  };

  /**
   * 设置当前缓存侧边栏视图
   */
  Aside.prototype.setCurrentAside = function (view) {
    this._currentAside = view;
    return this;
  };

  /**
   * 取当前缓存场景侧边栏
   */
  Aside.prototype.getCurrentSection = function () {
    return this._currentSection;
  };

  /**
   * 设置当前缓存场景视图
   */
  Aside.prototype.setCurrentSection = function (view) {
    this._currentSection = view;
    return this;
  };
  /**
   * 播放动画
   * @param  {Backbone.View} asideView     侧边栏视图
   * @param  {Backbone.View} sectionView    场景视图
   * @param  {string} transition 动画
   * @return {Aside}            this
   */
  Aside.prototype._playAnimate = function (asideView, sectionView, transition) {
    var self = this;
    var cls = self.getAnimateClass(transition);
    // 更新动画样式
    if (typeof sectionView !== 'undefined') {
      sectionView.$el.removeClass(self._animatesString).addClass(cls);
    }
    if (typeof asideView !== 'undefined') {
      asideView.$el.removeClass(self._animatesString).addClass(cls);
    }
    // 动画结束后即完成入场和出场的任务
    setTimeout(function () {
      self.mission.trigger('in');
      self.mission.trigger('out');
    }, self._speed);
    return self;
  };

  /**
   * 显示侧边栏
   * @param  {Backbone.View}   asideView       侧边栏的视图变量
   * @param  {string}   transition 动画，与stage的不同，aside的动画应只设置一个值
   * @param  {Function} callback   显示完成后的回调
   * @return {Aside}             this 
   */
  Aside.prototype.show = function (asideView, transition, callback) {
    var self = this;
    var sectionView, cls;
    // 判断是否被锁定
    if (self._flag.locked) {
      return false;
    }
    // 加锁，防止重复触发
    self._flag.locked = true;
    // 初始化任务(可异步)，只有当所有任务结束才可以去锁
    self.mission = new EventProxy();
    self.mission.all('transition', function () {
      self._flag.locked = false;
      callback();
    });
    // 取出要进行动画的当前视图
    sectionView = Backbone.stage.getCurrentView();
    // 进行动画任务
    cls = self.getAnimateClass(transition);
    if (typeof sectionView !== 'undefined') {
      sectionView.$el.addClass(cls);
    }
    if (typeof asideView !== 'undefined') {
      asideView.$el.addClass(cls);
    }
    self.setCurrentSection(sectionView);
    self.setCurrentAside(asideView);
    // 动画结束后即完成入场和出场的任务
    setTimeout(function () {
      self.mission.trigger('transition');
    }, self._speed);
    return self;
  };

  Aside.prototype.hide = function (transition, callback) {
    var self = this;
    var asideView, sectionView, cls;
    // 判断是否被锁定
    if (self._flag.locked) {
      return false;
    }
    // 加锁，防止重复触发
    self._flag.locked = true;
    // 初始化任务(可异步)，只有当所有任务结束才可以去锁
    self.mission = new EventProxy();
    self.mission.all('transition', function () {
      self._flag.locked = false;
      callback();
    });
    // 取出要进行动画的当前视图
    sectionView = self.getCurrentSection();
    asideView = self.getCurrentAside();
    // 进行动画任务
    cls = self.getAnimateClass(transition);
    if (typeof sectionView !== 'undefined') {
      sectionView.$el.removeClass(cls);
    }
    if (typeof asideView !== 'undefined') {
      asideView.$el.removeClass(cls);
    }
    // 动画结束后即完成入场和出场的任务
    setTimeout(function () {
      self.mission.trigger('transition');
    }, self._speed);
    return self;
  };

  return Aside;

});