define(function (require, exports, module) {
  var toInteger = require('utils/common').toInteger;
  
  var getAccount = function (node) {
    var $node = $(node);
    return {
      "uid": toInteger($node.find('uid').text()),
      "groupBit": toInteger($node.find('group_bit').text()),
      "admin": toInteger($node.find('admincheck').text()),
      "rvrc": toInteger($node.find('rvrc').text())
    };
  };

  var getForum = function (node) {
    var $node = $(node);
    return {
      "fid": toInteger($node.find('fid').text()),
      "toppedTopic": toInteger($node.find('topped_topic').text()),
      "toppedTopicExtra": $node.find('topped_topic_extra').text(),
      // todo
      "sub_forums":  {},
      "unionForum": $node.find('__UNION_FORUM').text(),
      "unionForumDefault": $node.find('__UNION_FORUM_DEFAULT').text(),
      "selectedForum": $node.find('__SELECTED_FORUM').text()
    };
  };

  var getTopic = function (node) {
    var $node = $(node);
    return {
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
  };


  var toCustom = function (account, forum, topics, rows) {
    var obj;
    var customTopic = function (topic) {
      return {
        id: topic.tid,
        subject: topic.subject,
        type: topic.type,
        authorId: topic.authorId,
        authorName: topic.authorName,
        postDate: topic.postDate,
        lastPost: topic.lastPost,
        lastPoster: topic.lastPoster,
        replies: topic.replies,
        titleFont: topic.titleFont,
        recommend: topic.recommend,
        admin: topic.admin,
        quoteFrom: topic.quoteFrom
      };
    };
    obj = {
      topics: _.map(topics, customTopic),
      rows: rows,
      account: account,
      forum: forum
    };
    return obj;
  };

  var parser = function (resp) {
    var $resp = $(resp);
    var $account, $forum, $topics;
    var account, forum, topics, rows;
    $account = $resp.find('__CU').get(0);
    $forum = $resp.find('__F').get(0);
    $topics = $resp.find('__T>item');
    account = getAccount($account);
    forum = getForum($forum);
    topics = [];
    for (i = 0, len = $topics.length; i < len; i++) {
      topics.push(getTopic($topics.get(i)));
    }
    rows = toInteger($resp.find('__ROWS').text());
    return toCustom(account, forum, topics, rows);
  };

  module.exports = parser;
});