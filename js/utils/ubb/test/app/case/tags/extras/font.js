define(function (require, exports, module) {
  return function (ubb) {
    describe('fontExtra', function () {
      var test = function (ubb, text, output) {
        describe(text, function () {
          it('should be ' + output, function () {
            expect(ubb.toHtml(text)).to.be.equal(output);
          });
        });
      };
      describe('hExtra', function () {
        text = '======';
        output = '<h4></h4>';
        test(ubb, text, output);
        text = '===========';
        output = '<h4></h4>';
        test(ubb, text, output);
        text = '===sth here.===';
        output = '<h4>sth here.</h4>';
        test(ubb, text, output);
        text = '======sth here.===';
        output = '<h4>sth here.</h4>';
        test(ubb, text, output);
        text = '======sth here.=======';
        output = '<h4>sth here.</h4>';
        test(ubb, text, output);
        text = '=== ===sth here.=== ===';
        output = '<h4> </h4>sth here.<h4> </h4>';
        test(ubb, text, output);
      });
    });
  };
});