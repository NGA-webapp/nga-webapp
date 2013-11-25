define(function (require, exports, module) {
  return function (ubb) {
    describe('smileExtra', function () {
      var test = function (ubb, text, output) {
        describe(text, function () {
          it('should be ' + output, function () {
            expect(ubb.toHtml(text)).to.be.equal(output);
          });
        });
      };
      text = '[s:7]';
      output = '<img src="http://img4.ngacn.cc/ngabbs/post/smile/cool.gif" />';
      test(ubb, text, output);
      text = '[s:499]';
      output = '<img src="" />';
      test(ubb, text, output);
    });
  };
});