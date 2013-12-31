;(function (name, definition) {
  // this is considered "safe":
  var hasDefine = typeof define === 'function',
    // hasDefine = typeof define === 'function',
    hasExports = typeof module !== 'undefined' && module.exports;

  if (hasDefine) {
    // AMD Module or CMD Module
    define(definition);
  } else {
    // Assign to common namespaces or simply the global object (window)
    this[name] = definition();
  }
})('preload', function () {
  var noop = function () {};

  var PreloadImage = function (url, onload) {
    var self = this;
    if (!(this instanceof PreloadImage)) {
      return new PreloadImage(url, onload);
    }
    this.url = url;
    this.onload = onload;
    this.image = new Image;
    this.image.src = this.url;
    this.image.onload = function () {
      self.onload.call(self);
    };
    return this;
  };

  var jQueryFactory = (function ($) {
    $.extend($.fn, {
      preloadImage: function (onload) {
        var self = this;
        var i, len;
        var url;
        for (i = 0, len = self.length; i < len; i++) {
          (function (elem) {
            if ((url = elem.getAttribute('data-preload'))) {
              PreloadImage(url, function () {
                onload.call(elem);
              });
            }
          })(self[i]);
        }
      },
      preloadSrc: function (onload) {
        $(this).preloadImage(function () {
          this.src = this.getAttribute('data-preload');
          onload.call(this);
        });
      },
      preloadBackground: function (onload) {
        $(this).preloadImage(function () {
          this.style.backgroundImage = 'url(' + this.getAttribute('data-preload') + ')';
          onload.call(this);
        });
      }
    });
  });
  if (typeof jQuery !== 'undefined') {
    jQueryFactory(jQuery);
  } else if (typeof $ !== 'undefined') {
    jQueryFactory($);
  }

  return PreloadImage;
});