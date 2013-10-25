define(function (require, exports, module) {
  var toDataURL = function (elem, width, height) {
    var canvas, context, result;
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    context.drawImage(elem, 0, 0, width, height);
    result = canvas.toDataURL();
    canvas = null;
    context = null;
    return result;
  };


  module.exports = toDataURL;
});