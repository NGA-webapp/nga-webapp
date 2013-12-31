define(function (require, exports, module) {
  var EventProxy = require('utils/EventProxy');

  var Aside = function (speed) {
    if (!(this instanceof Aside)) {
      return new Aside(speed);
    }
    // 设置转场速度
    this._speed = speed || 400;
    // 初始化标记
    this._flag = {
      locked: false
    };
    // 设置可用动画
    this._animates = [
      'right', 'left',
      'slide-right', 'slide-left'
    ];
    // 转场动画样式的字符串集合，用于removeClass
    this._asideAnimates = '';
    this._sectionAnimates = '';
    // 缓存转场任务，主要用于异步执行完成后的去锁
    this.mission = void 0;
    // 缓存当前视图
    this._currentAside = void 0;
    this._currentSection = void 0;
    // 初始化关闭侧边栏触发的任务
    this._onceAfterHide = function () {};
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
    var self = this;
    var asides = [];
    var sections = [];
    _.each(['in', 'out'], function (direction) {
      asides.push('aside-animate-aside-' + direction);
      sections.push('aside-animate-section-' + direction);
      _.each(self._animates, function (animate) {
        asides.push('aside-animate-aside-' + direction + '-' + animate);
        sections.push('aside-animate-section-' + direction + '-' + animate);
      });
    });
    this._asideAnimates = asides;
    this._sectionAnimates = sections;
    return this;
  };

  Aside.prototype._getRemoveClass = function (type, without) {
    var cls;
    if (type === 'aside') {
      cls = this._asideAnimates;
    } else if (type === 'section') {
      cls = this._sectionAnimates;
    } else {
      return [];
    }
    without = without || '';
    return _.without(cls, without).join(' ');
  };

  /**
   * 设置侧边栏别名->视图的映射
   * @param {object} map 映射{name: view}
   */
  Aside.prototype.setMap = function (map) {
    this._map = map;
    return this;
  };

  /**
   * 取动画样式
   * @param {string} type 类型，aside或者section
   * @param  {string} name  动画名，如果留空或者找不到该动画则会返回默认的转场样式
   * @return {string}      动画样式
   */
  Aside.prototype.getAnimateClass = function (type, name) {
    if (typeof type !== 'string' || (type !== 'aside-in' && type !== 'aside-out' && type !== 'section-in' && type !== 'section-out')) {
      throw new Error('the type have to be "aside-in", "aside-out", "section-in" or "section-out"');
    }
    var anyAnimate = _.any(this._animates, function (animate) {
      return animate === name;
    });
    if (typeof name === 'string' && anyAnimate) {
      return 'aside-animate-' + type + '-' + name;
    } else {
      return 'aside-animate-' + type;
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
   * 接受不同形式的transitions设置，返回数组格式
   * @param {string} direction in或者out
   * @param  {array|object|string} transition 转场动画
   * @return {array}             数组格式的动画设置
   */
  Aside.prototype.getTransitions = function (direction, transitions) {
    var self = this;
    var first, second;
    var aside = 'aside-' + direction;
    var section = 'section-' + direction;
    // 取转场动画
    if (transitions instanceof Array) {
      // 当transition形式为[aside, section] || [aside] || []
      first = self.getAnimateClass(aside, transitions[0]);
      second = self.getAnimateClass(section, transitions[1]);
    } else if (typeof transitions === 'object') {
      // 当transitions形式为{aside: aside, section: section} || {aside: aside} || {section: section} || {}
      first = self.getAnimateClass(aside, transitions['aside']);
      second = self.getAnimateClass(section, transitions['section']);
    } else if (typeof transitions === 'string') {
      // 当transitions形式为"IN OUT" || "IN" || ""
      transitions = transitions.split(' ');
      first = self.getAnimateClass(aside, transitions[0]);
      second = self.getAnimateClass(section, transitions[1]);
    } else {
      // 当tansition为空
      first = self.getAnimateClass(aside);
      second = self.getAnimateClass(section);
    }
    return [first, second];
  };

  /**
   * 显示侧边栏
   * @param  {Backbone.View}   asideName       侧边栏的别名
   * @param  {array} transition 动画，长度为二的数组，对应侧边栏和场景
   * @param  {Function} callback   显示完成后的回调
   * @return {Aside}             this 
   */
  Aside.prototype.show = function (asideName, transitions, callback) {
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
      // 触发视图上的转场结束事件
      asideView.trigger('aside-aside-in-end');
      sectionView.trigger('aside-section-in-end');
      // 解锁
      self._flag.locked = false;
      typeof callback === 'function' && callback();
    });
    // 取出要进行动画的当前视图
    asideView = self._map[asideName];
    sectionView = Backbone.stage.getCurrentView();
    // 触发视图上的转场开始事件
    asideView.trigger('aside-aside-in-start');
    sectionView.trigger('aside-section-in-start');
    // 获取动画设置
    transitions = self.getTransitions('in', transitions);
    // 进行动画任务
    if (typeof asideView !== 'undefined') {
      asideView.$el.removeClass(self._getRemoveClass('aside')).addClass(transitions[0]);
    }
    if (typeof sectionView !== 'undefined') {
      sectionView.$el.removeClass(self._getRemoveClass('section')).addClass(transitions[1]);
    }
    self.setCurrentAside(asideView);
    self.setCurrentSection(sectionView);
    // 动画结束后即完成入场和出场的任务
    setTimeout(function () {
      self.mission.trigger('transition');
    }, self._speed);
    return self;
  };

  /**
   * 绑定最近一次关闭侧边栏后执行的任务
   * @param  {Function} callback 
   * @return {Aside} this            
   */
  Aside.prototype.onceAfterHide = function (callback) {
    this._onceAfterHide = function () {
      callback();
      this._onceAfterHide = function(){};
    };
    return this;
  };

  Aside.prototype.hide = function (transitions, callback) {
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
      // 触发视图上的转场结束事件
      asideView.trigger('aside-aside-out-end');
      sectionView.trigger('aside-section-out-end');
      // 解锁
      self._flag.locked = false;
      self._onceAfterHide();
      typeof callback === 'function' && callback();
    });
    // 取出要进行动画的当前视图
    sectionView = self.getCurrentSection();
    asideView = self.getCurrentAside();
    // 触发视图上的转场开始事件
    asideView.trigger('aside-aside-out-start');
    sectionView.trigger('aside-section-out-start');
    // 获取动画设置
    transitions = self.getTransitions('out', transitions);
    // 进行动画任务
    if (typeof asideView !== 'undefined') {
      asideView.$el.removeClass(self._getRemoveClass('aside')).addClass(transitions[0]);
    }
    if (typeof sectionView !== 'undefined') {
      sectionView.$el.removeClass(self._getRemoveClass('section')).addClass(transitions[1]);
    }
    // 动画结束后即完成入场和出场的任务
    setTimeout(function () {
      asideView.$el.removeClass(self._getRemoveClass('aside')).addClass('aside-animate-aside-out');
      sectionView.$el.removeClass(self._getRemoveClass('section'));
      self.mission.trigger('transition');
    }, self._speed);
    return self;
  };

  return Aside;

});