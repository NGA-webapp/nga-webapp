define(function (require, exports, module) {
  return function (UbbThings, testTag) {
    describe('reg', function () {
      var buildTest = function (buildReg, isMatch) {
        return function (text) {
          var reg = buildReg('test');
          describe(text, function () {
            it('should be ' + (isMatch ? 'true' : 'false'), function () {
              if (isMatch) {
                expect(text).to.be.match(reg);
              } else {
                expect(text).to.be.not.match(reg);
              }
            });
          });
        };
      };
      describe('pairReg()', function () {
        var buildReg = UbbThings.pairReg;
        var isTrue = buildTest(buildReg, true);
        var isFalse = buildTest(buildReg, false);
        isTrue('[test]12[/test]');
        isTrue('[test=foobar]4[/test]');
        isTrue('[test=foobar,baz]4[/test]');
        isTrue('[test foo=bar baz=abc]4[/test]');
        isTrue('[test foo=bar]4[/test]');
        isTrue('[test foo bar baz]4[/test]');
        isFalse('[test]');
        isFalse('[test]123[test]');
        isFalse('[test123][/test]');
        isFalse('[test123 34]sth[/test]');
      });
      describe('singleReg()', function () {
        var buildReg = UbbThings.singleReg;
        var isTrue = buildTest(buildReg, true);
        var isFalse = buildTest(buildReg, false);
        isTrue('[test]');
        isTrue('[test]12');
        isTrue('[test=foobar]4');
        isTrue('[test=foobar,baz]4');
        isTrue('[test foo=bar baz=abc]4');
        isTrue('[test foo=bar]4');
        isTrue('[test foo bar baz]4');
        isTrue('[test]123[test]');
        isFalse('[test123 34]sth');
      });
    });
  };
});