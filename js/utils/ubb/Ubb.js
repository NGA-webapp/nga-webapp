define(function (require, exports) {
  var Ubb = function () {
    if (!(this instanceof Ubb)) {
      return new Ubb();
    }
    this._type = {};
    return this;
  };

  Ubb.prototype._parse = function (content, typeName) {
    var syntax, parser;
    if (!(typeName in this._type)) {
      return content;
    }
    syntax = this._type[typeName].syntax;
    parser = this._type[typeName].parser;
    if (!content.match(syntax)) {
      return content;
    }
    return parser(content);
  };

  Ubb.prototype.parse = function (content, typeName) {
    var key;
    if (typeof typeName === 'string') {
      return this._parse(content, typeName);
    }
    for (key in this._type) {
      content = this._parse(content, key);
    }
    return content;
  };

  Ubb.prototype.set = function (key, syntax, parser) {
    var self = this;
    if (key in self._type) {
      throw new Error('the key of that type has been defined');
    }
    self._type[key] = {
      syntax: syntax,
      parser: parser
    };
    return self;
  };

  module.exports = Ubb;
});