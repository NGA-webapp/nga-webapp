define(function (require, exports, module) {
  return function (ubb) {
    describe('tags', function () {
      require('./font')(ubb);
      require('./layout')(ubb);
      require('./list')(ubb);
      require('./img')(ubb);
      require('./extras/index')(ubb);
    });
  };
});