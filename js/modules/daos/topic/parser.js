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

  var getUser = function (node) {
    var $node = $(node);
    // 头像格式未确定，暂时理解为两种
    // 第一种直接返回整个url
    // 第二种返回以/*$js$*/开头，并接一个json，json中的[0][0]为url
    // 但第二种格式未确定是否正确，所以用正则取url
    var getAvatarUrl = function (text) {
      var tmp;
      if (!!text.match(/^\/\*\$js\$\*\//)) {
        tmp = text.match(/\"(http:\/\/.*?)\"/i);
        if (tmp.length > 1) {
          return tmp[1];
        }
      }
      return text;
    };
    return {
      "uid" : toInteger($node.find('uid').text()),
      "username": $node.find('username').text(),
      "medal": toInteger($node.find('medal').text()),
      "group": toInteger($node.find('groupid').text()),
      "member": toInteger($node.find('memberid').text()),
      "avatar": getAvatarUrl($node.find('avatar').text()),
      "yz": toInteger($node.find('yz').text()),
      "site": $node.find('site').text(),
      "honor": $node.find('honor').text(),
      "reg": toInteger($node.find('regdate').text()),
      "mute": toInteger($node.find('mute_time').text()),
      "post": toInteger($node.find('postnum').text()),
      "rvrc": toInteger($node.find('rvrc').text()),
      "money": toInteger($node.find('money').text()),
      "visit": toInteger($node.find('thisvisit').text()),
      "signature": $node.find('signature').text(),
      "bit": toInteger($node.find('bit_data').text())
    };
  };

  var getPost = function (node) {
    var $node = $(node);
    return {
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

  var toCustom = function (account, users, posts, topic, rows) {
    var obj;
    // 为users列表建立索引并放至usersCache
    var usersCache = _.indexBy(users, 'uid');
    var customPost = function (post) {
      return {
        // id定为楼号
        id: post.lou,
        pid: post.pid,
        subject: post.subject,
        content: post.content,
        type: post.type,
        authorId: post.authorId,
        authorName: _.has(usersCache, post.authorId) ? usersCache[post.authorId].username : '',
        avatar: _.has(usersCache, post.authorId) ? usersCache[post.authorId].avatar : '',
        lou: post.lou,
        postDate: post.postDate
      };
    };
    obj = {
      posts: _.map(posts, customPost),
      rows: rows,
      account: account,
      users: usersCache,
      topic: topic
    };
    return obj;
  };

  var parser = function (resp) {
    var $resp = $(resp);
    var $account, $users, $posts, $topic;
    var account, users, posts, topic, rows;
    $account = $resp.find('__CU').get(0);
    $users = $resp.find('__U>item');
    $posts = $resp.find('__R>item');
    $topic = $resp.find('__T');
    account = getAccount($account);
    users = [];
    for (i = 0, len = $users.length; i < len; i++) {
      users.push(getUser($users.get(i)));
    }
    posts = [];
    for (i = 0, len = $posts.length; i < len; i++) {
      posts.push(getPost($posts.get(i)));
    }
    topic = getTopic($topic);
    rows = toInteger($resp.find('__ROWS').text());
    return toCustom(account, users, posts, topic, rows);
  };

  module.exports = parser;
});