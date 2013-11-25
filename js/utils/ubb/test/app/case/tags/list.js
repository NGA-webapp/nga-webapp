define(function (require, exports, module) {
  return function (ubb) {
    describe('list', function () {
      var test = function (ubb, text, output) {
        describe(text, function () {
          it('should be ' + output, function () {
            expect(ubb.toHtml(text)).to.be.equal(output);
          });
        });
      };
      text = '[list]a[/list]';
      output = '<ul><li>a</li></ul>';
      test(ubb, text, output);
      text = '[list][*]a[/list]';
      output = '<ul><li>a</li></ul>';
      test(ubb, text, output);
      text = '[list][*]a[*]b[/list]';
      output = '<ul><li>a</li><li>b</li></ul>';
      test(ubb, text, output);
      text = '[list]a[*]b[*]c[/list]';
      output = '<ul><li>a</li><li>b</li><li>c</li></ul>';
      test(ubb, text, output);
      text = '[list]a[*]b[*]c[*][/list]';
      output = '<ul><li>a</li><li>b</li><li>c</li></ul>';
      test(ubb, text, output);
    });
  };
});