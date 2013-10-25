define(function (require, exports, module) {
  var toInteger = require('utils/common').toInteger;
  var getNodeText = require('utils/quoUtils').getNodeText;
  var PostModel = Backbone.Model.extend({
    defaults: {
      // 参考 http://bbs.ngacn.cc/read.php?pid=118598780
      "content": "", // 帖子内容
      "alterInfo": "", // 修改/加分信息
      "typeBit": 0, // 帖子状态bit
      "authorId": 0, // 发帖人uid
      "subject": "", // 帖子标题
      "pid": 0, // 回复id 主贴本身为0
      "tid": 0, // 主题id
      "fid": 0, // 所在版面id
      "contentLength": 0, // 内容长度
      "orgFid": 0, // 发帖时所在版面id
      "attachs": {}, // 附件
      "lou": 0, // 楼层
      "postDate": 0 // 发帖时间
    },
    parse: function (node) {
      var $node = $$(node);
      var obj = {
        "content": $node.find('content').text(),
        "alterInfo": $node.find('alterinfo').text(),
        "typeBit": toInteger($node.find('type').text()),
        "authorId": toInteger($node.find('authorid').text()),
        "subject": $node.find('subject').text(),
        "pid": toInteger($node.find('pid').text()),
        "tid": toInteger($node.find('tid').text()),
        "fid": toInteger($node.find('fid').text()),
        "contentLength": toInteger($node.find('content_length').text()),
        "orgFid": toInteger($node.find('org_fid').text()),
        // todo: load attachs
        "attachs": {},
        "lou": toInteger($node.find('lou').text()),
        "postDate": toInteger($node.find('postdatetimestamp').text())
      };
      return obj;
    }
  });
  module.exports = PostModel;
         

});
