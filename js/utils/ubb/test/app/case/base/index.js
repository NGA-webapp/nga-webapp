define(function (require, exports, module) {
  return function (UbbThings, testTag, testExtraTag) {
    describe('base', function () {
      require('./getAttrs')(UbbThings.getAttrs);
      require('./reg')(UbbThings, testTag);
      require('./Ubb')(UbbThings.Ubb, testTag, testExtraTag);
    });
  };
});