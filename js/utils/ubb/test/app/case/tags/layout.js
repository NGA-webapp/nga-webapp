define(function (require, exports, module) {
  return function (ubb) {
    describe('layout', function () {
      var test = function (ubb, text, output) {
        describe(text, function () {
          it('should be ' + output, function () {
            expect(ubb.toHtml(text)).to.be.equal(output);
          });
        });
      };
      text = '[l]sth[/l]';
      output = '<div class="left">sth</div>';
      test(ubb, text, output);
      text = '[r]sth[/r]';
      output = '<div class="right">sth</div>';
      test(ubb, text, output);
      text = '[quote]sth[/quote]';
      output = '<blockquote>sth</blockquote>';
      test(ubb, text, output);
      text = '[code]sth[/code]';
      output = '<pre class="prettyprint"><code>sth</code></pre>';
      test(ubb, text, output);
      
    });
  };
});