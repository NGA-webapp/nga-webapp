;(function (definition) {
  // this is considered "safe":
  var hasDefine = typeof define === 'function',
    // hasDefine = typeof define === 'function',
    hasExports = typeof module !== 'undefined' && module.exports;
  if (hasDefine) {
    // AMD Module or CMD Module
    define(definition);
  } else if (hasExports) {
    // Node.js Module
    definition(require, exports, module);
  } else {
    throw new Error('module required');
  }
})(function (require, exports, module) {
  var Ubb = require('./Ubb').Ubb;
  var font = require('./tags/font');
  var layout = require('./tags/layout');
  var list = require('./tags/list');
  var img = require('./tags/img');
  var url = require('./tags/url');
  var flash = require('./tags/flash');
  var fontExtra = require('./tags/extras/font');
  var brExtra = require('./tags/extras/br');
  var smileExtra = require('./tags/extras/smile');
  var encodeExtra = require('./tags/extras/encode');
  var atExtra = require('./tags/extras/at');
  var ubb = new Ubb();
  ubb.add([font.b, font.u, font.i, font.del, font.h, font.font, font.color, font.size, font.align]);
  ubb.add([layout.l, layout.r, layout.quote, layout.code, layout.tid, layout.pid]);
  ubb.add([img.img, img.relativeImg]);
  ubb.add(list.list);
  ubb.add(url.url);
  ubb.add(flash.flash);
  ubb.addExtra(fontExtra.h);
  ubb.addExtra(brExtra.br);
  ubb.addExtra(smileExtra.smile);
  ubb.addExtra(encodeExtra.amp);
  ubb.addExtra(atExtra.at);
  module.exports = ubb;
});