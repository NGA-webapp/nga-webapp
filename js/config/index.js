define(function (require, exports, module) {
  module.exports = {
    nakeServer: window.location.protocol === 'http:',
    transition: {
      map: require('./transition')
    }
  };
});