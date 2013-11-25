define(function (require, exports, module) {
  return function (ubb) {
    describe('font', function () {
      var test = function (ubb, text, output) {
        describe(text, function () {
          it('should be ' + output, function () {
            expect(ubb.toHtml(text)).to.be.equal(output);
          });
        });
      };
      text = '[b]sth here.[/b]';
      output = '<b>sth here.</b>';
      test(ubb, text, output);
      text = '[u]sth here.[/u]';
      output = '<u>sth here.</u>';
      test(ubb, text, output);
      text = '[i]sth here.[/i]';
      output = '<i>sth here.</i>';
      test(ubb, text, output);
      text = '[del]sth here.[/del]';
      output = '<del>sth here.</del>';
      test(ubb, text, output);
      text = '[h]sth here.[/h]';
      output = '<h4>sth here.</h4>';
      test(ubb, text, output);
      text = '[font=Arial]sth here.[/font]';
      output = '<span style="font-family: Arial;">sth here.</span>';
      test(ubb, text, output);
      text = '[color=coral]sth here.[/color]';
      output = '<span class="coral">sth here.</span>';
      test(ubb, text, output);
      text = '[size=120%]sth here.[/size]';
      output = '<span style="font-size: 120%;">sth here.</span>';
      test(ubb, text, output);
      text = '[align=left]sth here.[/align]';
      output = '<div style="text-align: left;">sth here.</div>';
      test(ubb, text, output);
    });
  };
});