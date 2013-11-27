define(function (require, exports, module) {
  var IScrollPull = function (id, pullDownAction, pullUpAction) {
    var self = this;
    var $pullDownEl, $pullUpEl, pullDownOffset, pullUpOffset;
    $pullDownEl = this.$el.find('.action-pulldown');
    $pullUpEl = this.$el.find('.action-pullup');
    pullDownOffset = $pullDownEl.offset().height;
    pullUpOffset = $pullUpEl.offset().height;
    this.scroll = new iScroll(id, {
      topOffset: pullDownOffset,
      onScrollMove: function () {
        if (this.y > 5 && !$pullDownEl.hasClass('flip')) {
          $pullDownEl.addClass('flip');
          this.minScrollY = 0;
        } else if (this.y < 5 && $pullDownEl.hasClass('flip')) {
          $pullDownEl.removeClass('flip');
          this.minScrollY = -pullDownOffset;
        } else if (this.y < (this.maxScrollY - 5) && !$pullUpEl.hasClass('flip')) {
          $pullUpEl.addClass('flip');
          this.maxScrollY = this.maxScrollY;
        } else if (this.y > (this.maxScrollY + 5) && $pullUpEl.hasClass('flip')) {
          $pullUpEl.removeClass('flip');
          this.maxScrollY = pullUpOffset;
        }
      },
      onScrollEnd: function () {
        if ($pullDownEl.hasClass('flip')) {
          $pullDownEl.removeClass('flip').addClass('loading');
          pullDownAction(); // Execute custom function (ajax call?)
        } else if ($pullUpEl.hasClass('flip')) {
          $pullUpEl.removeClass('flip').addClass('loading');
          pullUpAction(); // Execute custom function (ajax call?)
        }
      }
    });
  };
  return IScrollPull;
});
