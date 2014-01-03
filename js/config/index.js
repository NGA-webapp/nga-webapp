define(function (require, exports, module) {
  module.exports = {
    // nakeServer: window.location.protocol === 'http:',
    nakeServer: false,
    transition: {
      map: require('./transition')
    },
    test: false
  };
});