<header>
  <h1><a class="action-aside"><span class="glyphicon glyphicon-list"></span> <span class="subject">设置</span></a></h1>
</header>
<article id="setting-article" class="iscroll">
  <div class="scroller">
    <ul>
      <li class="action-settingFavor link">
        <h4>设置最喜爱的版面<span class="glyphicon glyphicon-chevron-right"></span></h4>
      </li>
      <li class="action-customForums link">
        <h4>管理自定义版面<span class="glyphicon glyphicon-chevron-right"></span></h4>
      </li>
    </ul>
    <ul>
      <li class="select" data-key="downloadAvatar">
        <h4>
          下载头像
          <% if (setting.downloadAvatar) { %>
            <span class="checkbox checked"></span>
          <% } else { %>
            <span class="checkbox"></span>
          <% } %>
        </h4>
      </li>
      <li class="select" data-key="downloadImage">
        <h4>
          显示贴内图片
          <% if (setting.downloadImage) { %>
            <span class="checkbox checked"></span>
          <% } else { %>
            <span class="checkbox"></span>
          <% } %>
        </h4>
      </li>
      <li class="select" data-key="showSignature">
        <h4>
          显示签名
          <% if (setting.showSignature) { %>
            <span class="checkbox checked"></span>
          <% } else { %>
            <span class="checkbox"></span>
          <% } %>
        </h4>
      </li>
    </ul>
    <ul>
      <li class="link disabled">
        <h4>更多设置<span class="glyphicon glyphicon-chevron-right"></span></h4>
      </li>
    </ul>
  </div>
</article>
<div class="asideMask"></div>
