define(function (require, exports, module) {
  var toInteger = require('utils/common').toInteger;
  var getNodeText = require('utils/quoUtils').getNodeText;

  var Xmler = function ($node) {
    if (this instanceof Xmler) {
      this.$node = $node;
      this.text = '';
      return this;
    } else {
      return new Xmler($node);
    }
  };

  Xmler.prototype.find = function (selector) {
    return new Xml(this.$node.find(selector));
  };

  Xmler.prototype.text = function () {
    try {
      this.text = this.$node.text();
    } catch (e) {
      this.text = '';
    }
    return this;
  };

  Xmler.prototype.toString = function () {
    return this.text;
  };

  Xmler.prototype.toInteger = function () {
    return toInteger(this.text);
  };

  module.exports = Xmler;
});