define(function (require, exports, module) {
  return function (ubb) {
    describe('brExtra', function () {
      var test = function (ubb, text, output) {
        describe(text, function () {
          it('should be ' + output, function () {
            expect(ubb.toHtml(text)).to.be.equal(output);
          });
        });
      };
      text = '<br>';
      output = '<br/>';
      test(ubb, text, output);
      text = '<br/>';
      output = '<br/>';
      test(ubb, text, output);
      text = '<br />';
      output = '<br/>';
      test(ubb, text, output);
      text = '<br    >';
      output = '<br/>';
      test(ubb, text, output);
      text = '<br    />';
      output = '<br/>';
      test(ubb, text, output);
    });
  };
});