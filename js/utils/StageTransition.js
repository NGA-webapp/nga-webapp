define(function (require, exports, module) {
  /**
   * 转场动画设置
   * @type {Array}
   * obj.from 源跳转视图的selector，为'firstTime'则表示是第一次跳转没有源视图
   * obj.to 目标跳转视图的selector
   * obj.before.from/obj.before.to 转场前预设样式，如将z-index提高或降低
   * obj.animate.from/obj.animate.to 转场动画的样式
   *
   * 此外，约定以下样式名
   * noop: 不带任何样式
   * pop: z-index略高于正常情况
   * dive: z-index略低于正常情况
   * 
   * 另外说明，以下样式名在转场实现时会被使用，并建议不要用作设置任何选项
   * behide: z-index低于overlay，即代表不显示的视图；不带有该样式则说明正在台前。
   */
  var map = [
    {
      from: 'firstTime',
      to: '#forum',
      before: {to: 'noop'},
      animate: {to: 'section-bounceInRight'},
      duration: 600
    },
    {
      from: 'firstTime',
      to: '#topic',
      before: {to: 'noop'},
      animate: {to: 'section-bounceInRight'},
      duration: 600
    },
    {
      from: '#forum',
      to: '#topic',
      before: {from: 'noop', to: 'noop'},
      animate: {from: 'section-bounceOutLeft', to: 'section-bounceInRight'},
      duration: 600
    },
    {
      from: '#topic',
      to: '#forum',
      before: {from: 'noop', to: 'noop'},
      animate: {from: 'section-bounceOutRight', to: 'section-bounceInLeft'},
      duration: 600
    }
  ];
  // var zIndex = {
  //   overlay: 100,
  //   aside: 200,
  //   section: 300,
  // };
  /**
   * css动画整理
   */
  var StageTransition = function (map) {
    this.currentView = void 0;
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
  StageTransition.prototype._switch = function (fromView, toView) {
    var fromSelector, toSelector;
    var set, before, animate, duration;
    var isFirstTime;
    // 如果fromView为undefined则是第一次执行跳转
    isFirstTime = typeof fromView === 'undefined';
    fromSelector = isFirstTime ? 'firstTime' : fromView.$el.selector;
    toSelector = toView.$el.selector;
    set = _.chain(this.map)
      .findWhere({from: fromSelector, to: toSelector})
      .pick('before', 'animate', 'duration')
      .value();
    before = set.before;
    animate = set.animate;
    duration = set.duration;
    if (!isFirstTime) {
      // 当前section添加动画前的预设样式
      fromView.$el.addClass(before.from);
      // 当前section执行动画
      this._transition(fromView.$el, animate.from, duration, function () {
        // 当前section动画执行结束后移除动画前预设样式，并推至幕后
        fromView.$el.removeClass(before.from).addClass('behind');
      });
    }
    // 目标section添加动画前的预设样式，并推至幕前
    toView.$el.addClass(before.to).removeClass('behind');
    // 目标section执行动画
    this._transition(toView.$el, animate.to, duration, function () {
      // 目标section动画执行结束后移除动画前预设样式
      toView.$el.removeClass(before.to);
    });
    return this;
  };
  /**
   * 从记录中的当前场景，跳转至目标场景
   * @chainable
   * @param  {View} toView 目标视图
   * @return {StageTransition}        this
   */
  StageTransition.prototype.switchTo = function (toView) {
    this._switch(this.currentView, toView);
    this.currentView = toView;
    this.history.push(this.currentView);
    return this;
  };
  StageTransition.prototype.switchBack = function() {
    if (this.history.length > 1) {
      this._switch(this.history.pop(), this.history[this.history.length - 1]);
      this.currentView = this.history[history.length - 1];
    }
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