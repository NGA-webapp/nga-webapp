define(function (require, exports, module) {
  /**
   * css动画整理
   */
  var Transition = function () {
    return this;
  };

  Transition.prototype.base = function ($node, className, timeout, next) {
    $node.addClass('slideOutLeft');
    _.delay(function () {
      $node.removeClass('slideOutLeft');
      next();
      // $mode.css('z-index', '-500');
    }, timeout);
    return this;
  };
  Transition.prototype.slideInLeft = function ($node, next) {
    this.base($node, 'slideInLeft', 800, next);
    return this;
  };
  Transition.prototype.slideInRight = function ($node, next) {
    this.base($node, 'slideInRight', 800, next);
    return this;
  };
  Transition.prototype.slideInUp = function ($node, next) {
    this.base($node, 'slideInUp', 800, next);
    return this;
  };
  Transition.prototype.slideInDown = function ($node, next) {
    this.base($node, 'slideInDown', 800, next);
    return this;
  };
  Transition.prototype.slideOutLeft = function ($node, next) {
    this.base($node, 'slideOutLeft', 800, next);
    return this;
  };
  Transition.prototype.slideOutRight = function ($node, next) {
    this.base($node, 'slideOutRight', 800, next);
    return this;
  };
  Transition.prototype.slideOutUp = function ($node, next) {
    this.base($node, 'slideOutUp', 800, next);
    return this;
  };
  Transition.prototype.slideOutDown = function ($node, next) {
    this.base($node, 'slideOutDown', 800, next);
    return this;
  };

  module.exports = Transition;
});