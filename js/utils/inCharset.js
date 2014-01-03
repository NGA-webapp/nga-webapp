;(function (name, definition) {
  // this is considered "safe":
  var hasDefine = typeof define === 'function';

  if (hasDefine) {
    // AMD Module or CMD Module
    define(definition);
  } else {
    // Assign to common namespaces or simply the global object (window)
    this[name] = definition();
  }
})('inCharset', function(require, exports, module) {
  var InCharset = function () {
    this._options = {
      // the location of getEncodeStr.html
      action: './getEncodeStr.html',
      // this variable will be setted in window
      namespace: '_inCharset',
      // the name of iframe
      iframeName: '_urlEncode_iframe_',
      // timeout
      timeout: 10000,
    };
    this._tasks = [];
    return this;
  };
  InCharset.prototype._initNamescape = function () {
    var ns = this._options.namespace;
    if (!window[ns]) {
      window[ns] = {
        success: {},
      };
    }
    return this;
  };
  InCharset.prototype.options = function (opts) {
    if (typeof opts === 'object') {
      if (typeof opts.action === 'string') {
        this._options.action = opts.action;
      }
      if (typeof opts.namespace === 'string') {
        this._options.namespace = opts.namespace;
      }
      if (typeof opts.iframeName === 'string') {
        this._options.iframeName = opts.iframeName;
      }
      if (typeof opts.timeout === 'number') {
        this._options.timeout = opts.timeout;
      }
    }
    return this;
  };
  InCharset.prototype.get = function(str, charset, success, error) {
    var self = this;
    // location.search would be '?id=' + id + '&str=' + str
    // just get a random value
    var id = (new Date()).getTime().toString(32) + '.' + Math.floor(Math.random() * 1024).toString(32);
    var iframeName = self._options.iframeName + '.' + id;
    var idInput = (function () {
      var input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'id';
      input.value = id;
      return input;
    })();
    var strInput = (function () {
      var input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'str';
      input.value = str;
      return input;
    })();
    var form = (function () {
      var f = document.createElement('form');
      f.method = 'get';
      f.style.display = 'none';
      f.acceptCharset = charset;
      f.appendChild(idInput);
      f.appendChild(strInput);
      f.target = iframeName;
      f.action = self._options.action;
      document.body.appendChild(f);
      return f;
    })();
    var iframe = (function () {
      var ifr = document.createElement('iframe');
      ifr.setAttribute('name', iframeName);
      ifr.style.display = 'none';
      ifr.width = "0";
      ifr.height = "0";
      ifr.scrolling = "no";
      ifr.allowtransparency = "true";
      ifr.frameborder = "0";
      ifr.src = 'about:blank';
      document.body.appendChild(ifr);
      return ifr;
    })();
    var clear, abort, timeoutObject, called;
    called = false;
    clear = function () {
      delete window[self._options.namespace]['success'][id];
      clearTimeout(timeoutObject);
    };
    self._initNamescape();
    window[self._options.namespace]['success'][id] = function (str) {
      if (typeof success === 'function') {
        success(str);
      }
      called = true;
      clear();
    };
    abort = function (err) {
      if (called) {
        return false;
      }
      if (typeof error === 'function') {
        error((err || 'abort'));
      }
      called = true;
      clear();
    };
    form.submit();
    timeoutObject = setTimeout(function () {
      abort('timeout');
    }, self._options.timeout);
    setTimeout(function() {
      form.parentNode.removeChild(form);
      if (typeof iframe !== 'undefined') {
        iframe.parentNode.removeChild(iframe);
      }
    }, 500);
    return {
      abort: abort
    };
  };

  return new InCharset();
});