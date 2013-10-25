define(function (require, exports, module) {
  var toInteger = require('utils/common').toInteger;
  var getNodeText = require('utils/quoUtils').getNodeText;
  var AttachModel = Backbone.Model.extend({
    defaults: {
      // 参考 http://bbs.ngacn.cc/read.php?pid=118598780
       "-46468_514ad8ec10795":{ 
          "aid":"-46468_514ad8ec10795", 
          "url_utf8_org_name":"vk2_1.jpg",//文件的原名 urlencode的utf8编码 
          "path":"mon_201303/21", 
          "dscp":"", 
          "size":155, 
          "ext":"jpg", 
          "name":"-46468_514ad8ec10795.jpg", 
          "thumb":1, 
          "attachurl":"mon_201303/21/-46468_514ad8ec10795.jpg",//附件地址 
          "type":"img", 
          "subid":0 
          }, 
    },
    parse: function (node) {
      var $node = $$(node);
      var obj = {
        // todo
      };
      return obj;
    }
  });
  module.exports = AttachModel;
});


