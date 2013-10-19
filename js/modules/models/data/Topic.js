define(function (require, exports, module) {
  var toInteger = require('utils/common').toInteger;
  var getNodeText = require('utils/quoUtils').getNodeText;
  var TopicModel = Backbone.Model.extend({
    defaults: {
      // 参考 http://bbs.ngacn.cc/read.php?pid=118598780
      "tid": 0, // 主题id
      "fid": 0, // 所在版面id
      "quoteFrom": 0, // 被引用主题id 如果不是0 实际tid应该是这个
      "quoteTo": "", // 引用这个主题的主题id 无用
      "icon": 0, // 图标
      "titleFont": "", // 颜色和字体
      "authorName": "", // 主题作者名
      "authorId": 0, // 主题作者uid
      "subject": "", // 主题标题
      "type": 0, // 主题状态bit
      "postDate": 0, // 发布时间
      "lastPost": 0, // 最后回复时间
      "lastPoster": "", // 最后回复人的用户名
      "replies": 0, // 回复数量
      "upload": 0, // 是否有附件
      "lastModify": 0, // 最后改动时间 (主题或任何一个回复的 修改 评分 回复等
      "recommend": 0, // 推荐值 加分或加精华或置顶
      "admin": 0, // 用户是否对此主题有权限bit (列表中显示)
      "url": "", // 主题地址 (列表中显示)
    },
    parse: function (node) {
      var $node = $$(node);
      var obj = {
        "tid": toInteger($node.find('tid').text()),
        "fid": toInteger($node.find('fid').text()),
        "quoteFrom": toInteger($node.find('quote_from').text()),
        "quoteTo": $node.find('quote_to').text(),
        "icon": toInteger($node.find('icon').text()),
        "titleFont": $node.find('titlefont').text(),
        "authorName": $node.find('author').text(),
        "authorId": toInteger($node.find('authorid').text()),
        "subject": $node.find('subject').text(),
        "type": toInteger($node.find('type').text()),
        "postDate": toInteger($node.find('postdate').text()),
        "lastPost": toInteger($node.find('lastpost').text()),
        "lastPoster": $node.find('lastposter').text(),
        "replies": toInteger($node.find('replies').text()),
        "upload": toInteger($node.find('ifupload').text()),
        "lastModify": toInteger($node.find('lastmodify').text()),
        "recommend": toInteger($node.find('recommend').text()),
        "admin": toInteger($node.find('admin_ui').text()),
        "url": $node.find('tpcurl').text(),
      };
      return obj;
    }
  });
  module.exports = TopicModel;
});


