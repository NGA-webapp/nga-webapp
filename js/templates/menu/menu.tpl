<div class="search-box">
  <input class="param-key" type="text" value="" placeholder="搜索" /> <span class="action-search glyphicon glyphicon-search"></span>
</div>
<div class="menu-content">
  <div id="menu-list" class="iscroll">
    <div class="scroller">
      <ul>
        <li class="title">快速导航</li>
        <% var i, len; %>
        <% for (i = 0, len = favorForum.length; i < len; i++) { %>
          <li class="quickNav" data-fid="<%= favorForum[i].fid %>">
            <% if (favorForum[i].forum) { %>
              <span class="glyphicon glyphicon-pushpin"></span> <%= favorForum[i].forum.name %>
            <% } else { %>
              <span class="glyphicon glyphicon-pushpin"></span> 版面[<%= favorForum[i].fid %>]
            <% } %>
          </li>
        <% } %>
        <% for (i = 0, len = lastForum.length; i < len; i++) { %>
          <li class="quickNav" data-fid="<%= lastForum[i].fid %>">
            <% if (lastForum[i].forum) { %>
              <span class="glyphicon glyphicon-time"></span> <%= lastForum[i].forum.name %>
            <% } else { %>
              <span class="glyphicon glyphicon-time"></span> 版面[<%= lastForum[i].fid %>]
            <% } %>
          </li>
        <% } %>
        <li class="forums"><span class="glyphicon glyphicon-th-list"></span> 其他版面</li>
        <li class="title">工具</li>
        <li class="favor"><span class="glyphicon glyphicon-heart"></span> 收藏</li>
        <li class="setting"><span class="glyphicon glyphicon-cog"></span> 设置</li>
        <li class="logout"><span class="glyphicon glyphicon-user"></span> 登出账号</li>
      </ul>
    </div>
  </div>
</div>
<div class="menu-foot"></div>
