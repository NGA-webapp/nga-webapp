define(function (require, exports, module) {
  var createPullabledScroll = function (iScroll, elem, options) {
    var scroll, pullDownReady, pullUpReady;
    // scope variable
    pullDownReady = false;
    pullUpReady = false;
    // setup the scroll object
    options.probeType = options.probeType || 2;
    scroll = new iScroll(elem, options);
    // pullDown
    if (typeof options.pullDownOffset === 'number') {
      scroll.on('scroll', function () {
        if (this.y > options.pullDownOffset && !pullDownReady) {
          pullDownReady = true;
          this._execEvent('pullDownReady');
        } else if (this.y < options.pullDownOffset && pullDownReady) {
          pullDownReady = false;
          this._execEvent('pullDownCancel');
        }
      });
      scroll.on('scrollEnd', function () {
        if (pullDownReady) {
          this._execEvent('pullDown');
          pullDownReady = false;
        }
      });
    }
    if (typeof options.pullUpOffset === 'number') {
      scroll.on('scroll', function () {
        if (this.y < (this.maxScrollY - options.pullUpOffset) && !pullUpReady) {
          pullUpReady = true;
          this._execEvent('pullUpReady');
        } else if (this.y > (this.maxScrollY - options.pullUpOffset) && pullUpReady) {
          pullUpReady = false;
          this._execEvent('pullUpCancel');
        }
      });
      scroll.on('scrollEnd', function () {
        if (pullUpReady) {
          this._execEvent('pullUp');
          pullDownReady = false;
        }
      });
    }
    return scroll;
  };

  var iScrollPull = function (id, pullDownAction, pullUpAction) {
    var self = this;
    var $pullDownEl, $pullUpEl, pullDownOffset, pullUpOffset;
    var $scroller = this.$el.find('#' + id + ' > .scroller');
    $pullDownEl = this.$el.find('.action-pulldown');
    $pullUpEl = this.$el.find('.action-pullup');
    pullDownOffset = $pullDownEl.offset().height;
    pullUpOffset = $pullUpEl.offset().height;
    if (this.scroll && typeof this.scroll.destroy === 'function') {
      this.scroll.destroy();
    }
    this.scroll = createPullabledScroll(IScroll, '#' + id, {
      scrollbars: true,
      fadeScrollbars: true,
      probeType: 2,
      pullDownOffset: pullDownOffset,
      pullUpOffset: pullUpOffset
    });
    this.scroll.on('pullDownReady', function () {
      $pullDownEl.addClass('flip');
    });
    this.scroll.on('pullDownCancel', function () {
      $pullDownEl.removeClass('flip');
    });
    this.scroll.on('pullDown', function () {
      $pullDownEl.removeClass('flip').addClass('loading');
      pullDownAction(); // Execute custom function (ajax call?)
    });
    this.scroll.on('pullUpReady', function () {
      $pullUpEl.addClass('flip');
    });
    this.scroll.on('pullUpCancel', function () {
      $pullUpEl.removeClass('flip');
    });
    this.scroll.on('pullUp', function () {
      $pullUpEl.removeClass('flip').addClass('loading');
      pullUpAction(); // Execute custom function (ajax call?)
    });
  };
  return iScrollPull;
});
