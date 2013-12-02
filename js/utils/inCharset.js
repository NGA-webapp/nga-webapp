define(function(require, exports, module) {
  // 参考http://zciii.com/blogwp/front-end-urldecode-gbk/
  module.exports = function(str, charset, callback) {
    //创建form通过accept-charset做encode
    var form = document.createElement('form');
    form.method = 'get';
    form.style.display = 'none';
    form.acceptCharset = charset;
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'str';
    input.value = str;
    form.appendChild(input);
    form.target = '_urlEncode_iframe_';
    document.body.appendChild(form);
    //隐藏iframe截获提交的字符串
    if (!window['_urlEncode_iframe_']) {
      var iframe = document.createElement('iframe');
      //iframe.name = '_urlEncode_iframe_';
      iframe.setAttribute('name', '_urlEncode_iframe_');
      iframe.style.display = 'none';
      iframe.width = "0";
      iframe.height = "0";
      iframe.scrolling = "no";
      iframe.allowtransparency = "true";
      iframe.frameborder = "0";
      iframe.src = 'about:blank';
      document.body.appendChild(iframe);
    }
    //
    window._urlEncode_iframe_callback = callback;
    //设置回调编码页面的地址，这里需要用户修改
    form.action = './getEncodeStr.html';
    form.submit();
    setTimeout(function() {
      form.parentNode.removeChild(form);
      iframe.parentNode.removeChild(iframe);
    }, 500);
  };
});