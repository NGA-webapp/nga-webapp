define(function (require, exports, module) {
  module.exports = {
    // nakeServer: window.location.protocol === 'http:',
    nakeServer: false,
    transition: {
      map: require('./transition')
    },
    emotion: require('./emotion'),
    test: false,
    version: '1.1.1'
  };
});