define(function (require, exports, module) {
  var toInteger = require('utils/common').toInteger;
  
  var get = function (node) {
    var $node = $(node);
    var $cats, $cat, catId, catName, $grps, $grp, grpId, grpName, $frms, $frm, frmId, frmName, frmInfo, frmIcon, frmNameshort, frmHeightlight;
    var i, iLen, j, jLen, k, kLen;
    var result = {};
    $cats = $node.find('category');
    for (i = 0, iLen = $cats.length; i < iLen; i++) {
      $cat = $cats.eq(i);
      catId = toInteger($cat.attr('id'));
      catName = $cat.attr('name');
      result[catId] = {cid: catId, name: catName, groups: {}};
      $grps = $cat.find('group');
      grpId = 0;
      for (j = 0, jLen = $grps.length; j < jLen; j++) {
        $grp = $grps.eq(j);
        grpName = $grp.attr('name') || '';
        result[catId]['groups'][grpId] = {gid: grpId, name: grpName, forums: {}};
        $frms = $grp.find('forum');
        for (k = 0, kLen = $frms.length; k < kLen; k++) {
          $frm = $frms.eq(k);
          frmId = toInteger($frm.attr('fid'));
          frmName = $frm.attr('name');
          frmInfo = $frm.attr('info');
          frmIcon = $frm.attr('icon');
          frmNameshort = $frm.attr('nameshort');
          frmHeightlight = $frm.attr('heightlight');
          result[catId]['groups'][grpId]['forums'][frmId] = {fid: frmId, name: frmName, info: frmInfo, icon: frmIcon, nameshort: frmNameshort, heightlight: frmHeightlight};
        }
        grpId++;
      }
    }
    return result;
  };

  var parser = function (resp) {
    return get(resp);
  };

  module.exports = parser;
});