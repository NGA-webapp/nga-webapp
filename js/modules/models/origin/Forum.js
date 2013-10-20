define(function (require, exports, module) {
  var toInteger = require('utils/common').toInteger;
  var getNodeText = require('utils/quoUtils').getNodeText;
  var MedalModel = Backbone.Model.extend({
    defaults: {
      // 参考 http://bbs.ngacn.cc/read.php?tid=6406100&topid=116169942#pid116169942Anchor
      "fid": 0, // 当前版面id (搜索用户发帖等情况是没有当前版面id
      "toppedTopic": 0, // 置顶贴的主题ID 主题内容即为置顶信息
      "toppedTopicExtra": "", // 额外的置顶贴内容 可能没有
      "sub_forums":  {}, // 当前版面的子论坛或者联合版面等 版面图标在公共变量文件里 见2.2
      "unionForum": "", // 联合版面中默认设置的版面ID 逗号分隔
      "unionForumDefault": "", // 联合版面中默认显示的版面ID 逗号分隔
      "selectedForum": "" // 联合版面中用户选择显示的版面id 逗号分隔 (如选择了一个以上会包括联合版面本身的id)
    },
    parse: function (node) {
      var $node = $$(node);
      var obj = {
        "fid": toInteger($node.find('fid').text()),
        "toppedTopic": toInteger($node.find('topped_topic').text()),
        "toppedTopicExtra": $node.find('topped_topic_extra').text(),
        // todo
        "sub_forums":  {},
        "unionForum": $node.find('__UNION_FORUM').text(),
        "unionForumDefault": $node.find('__UNION_FORUM_DEFAULT').text(),
        "selectedForum": $node.find('__SELECTED_FORUM').text()
      };
      return obj;
    }
  });
  module.exports = MedalModel;

});