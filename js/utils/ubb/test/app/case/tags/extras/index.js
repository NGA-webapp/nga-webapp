define(function (require, exports, module) {
  return function (ubb) {
    describe('extras', function () {
      require('./font')(ubb);
      require('./br')(ubb);
      require('./smile')(ubb);
    });
  };
});