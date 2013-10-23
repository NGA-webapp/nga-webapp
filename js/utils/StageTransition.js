define(function (require, exports, module) {
  var map = require('config/index').transition.map;

  // var zIndex = {
  //   overlay: 100,
  //   aside: 200,
  //   section: 300,
  // };
  /**
   * 需要在动画开始前移除的样式
   * @type {Array}
   */
  var clearBeforeAnimate = 'behind leanRight leanLeft';
  /**
   * css动画整理
   */
  var StageTransition = function (map) {
    this.currentView = void 0;
    this.currentAside = void 0;
    this.cache = {};
    this.map = map;
    this.history = [];
    return this;
  };
  /**
   * 在两个场景间跳转
   * @private
   * @chainable
   * @param  {View} fromView 当前视图
   * @param  {View} toView   目标视图
   * @return {StageTransition}          this
   */
  StageTransition.prototype._switchSectionToAnything = function (fromView, toView) {
    var self = this;
    var fromSelector, toSelector;
    var set, before, animate, duration;
    var isFirstTime;
    try {
      // 如果fromView为undefined则是第一次执行跳转
      isFirstTime = typeof fromView === 'undefined';
      fromSelector = isFirstTime ? 'firstTime' : fromView.$el.selector;
      toSelector = toView.$el.selector;
      set = _.chain(self.map)
        .findWhere({from: fromSelector, to: toSelector, aside: ''})
        .pick('before', 'animate', 'after', 'duration')
        .value();
      before = set.before;
      animate = set.animate;
      after = set.after;
      duration = set.duration;
      if (!isFirstTime) {
        // 当前section添加动画前的预设样式，并移除上一个转场保留的样式
        fromView.$el.removeClass(clearBeforeAnimate).addClass(before.from);
        // 当前section执行动画
        self._transition(fromView.$el, animate.from, duration, function () {
          // 当前section动画执行结束后移除动画前预设样式，并推至幕后
          fromView.$el.removeClass(before.from).addClass(after.from);
        });
      }
      _.delay(function () {
        // 目标section添加动画前的预设样式，并移除上一个转场保留的样式
        toView.$el.removeClass(clearBeforeAnimate).addClass(before.to);
        // 目标section执行动画
        self._transition(toView.$el, animate.to, duration, function () {
          // 目标section动画执行结束后移除动画前预设样式
          toView.$el.removeClass(before.to).addClass(after.to);
        });
      }, 0);
    } catch (e) {
      console.error(arguments);
    }
    return this;
  };

  /**
   * 从记录中的当前场景，跳转至目标场景
   * @chainable
   * @param  {View} toView 目标视图
   * @return {StageTransition}        this
   */
  StageTransition.prototype.toSection = function (toView) {
    if (this.currentAside) {
      return this.closeAside(toView);
    }
    this._switchSectionToAnything(this.currentView, toView);
    this.currentView = toView;
    this.history.push(this.currentView);
    return this;
  };

  /**
   * 返回上一个场景
   * @chainable
   * @return {StageTransition} this
   */
  StageTransition.prototype.switchBack = function() {
    if (this.history.length > 0 && this.currentAside) {
      return this.closeAside(this.history.slice(-1)[0]);
    }
    if (this.history.length > 1) {
      this._switchSectionToAnything(this.history.slice(-1)[0], this.history.slice(-2)[0]);
      this.currentView = this.history.slice(-2)[0];
      if (this.history.length > 2) {
        this.previousView = this.history.slice(-3)[0];
      }
      this.history.pop();
    }
    return this;
  };

  StageTransition.prototype._switchAsideToSection = function (fromView, toView, asideView, whenAsideClose) {
    var self = this;
    var fromSelector, toSelector, asideSelector;
    var set, before, animate, duration;
    var isFirstTime;
    isFirstTime = typeof fromView === 'undefined';
    fromSelector = isFirstTime ? 'firstTime' : fromView.$el.selector;
    toSelector = toView.$el.selector;
    asideSelector = asideView.$el.selector;
    set = _.chain(self.map)
      .findWhere({from: fromSelector, to: toSelector, aside: asideSelector})
      .pick('before', 'animate', 'after', 'duration')
      .value();
    before = set.before;
    animate = set.animate;
    after = set.after;
    duration = set.duration;
    if (!isFirstTime) {
      // 移除from的保留样式，并添加after样式，如behind
      fromView.$el.removeClass(clearBeforeAnimate).addClass(after.from);
    }
    // 移除to的保留样式，并添加before样式
    toView.$el.removeClass(clearBeforeAnimate).addClass(before.to);
    // 对to执行动画
    self._transition(toView.$el, animate.to, duration, function () {
      // 动画结束后对to移除before并添加after样式
      toView.$el.removeClass(before.to).addClass(after.to);
    });
    // 移除aside的保留样式
    asideView.$el.removeClass(clearBeforeAnimate);
    _.delay(function () {
      // 动画结束后对aside添加after样式，如behind
      asideView.$el.addClass(after.aside);
      if (whenAsideClose) {
        // 如果有设置关闭时的回调，则执行，然后移除该回调
        whenAsideClose();
        // self.cache.whenAsideClose = void 0;
      }
    }, duration);

    return this;
  };

  StageTransition.prototype.setWhenAsideClose = function (whenAsideClose) {
    this.cache.whenAsideClose = whenAsideClose;
    return this;
  };
 
  StageTransition.prototype.openAside = function (toAside) {
    this._switchSectionToAnything(this.currentView, toAside);
    this.currentAside = toAside;
    return this;
  };
  StageTransition.prototype.closeAside = function (toView) {
    this._switchAsideToSection(this.currentView, toView, this.currentAside, this.cache.whenAsideClose);
    this.currentAside = void 0;
    // delete this.cache.whenAsideClose;
    this.currentView = toView;
    this.history.push(this.currentView);
    return this;
  };

  /**
   * 执行动画
   * @private
   * @chainable
   * @param  {jQuery}   $node     执行动画的node
   * @param  {string}   className 动画的class名
   * @param  {number}   timeout   动画时长，应与class中设置相同
   * @param  {Function} next      动画结束后的回调函数
   * @return {StageTransition}             this
   */
  StageTransition.prototype._transition = function ($node, className, timeout, next) {
    $node.addClass(className);
    _.delay(function () {
      $node.removeClass(className);
      next();
    }, timeout);
    return this;
  };


  var transition = new StageTransition(map);
  module.exports = transition;
});