<ul>
  <% for (i = 0, len = category.items.length; i < len; i++) { %>
    <% emotion = category.items[i]; %>
    <% if (emotion.code) { %>
    <li data-code="<%= emotion.code %>">
    <% } else { %>
    <li data-url="<%= emotion.url %>">
    <% } %>
      <img src="./image/emotions/<%= category.path %>/<%= emotion.filename %>"/>
    </li>
  <% } %>
  <div class="clearfix"></div>
</ul>
<div class="emotion-pagination">
  <% for (i = 0, len = category.items.length; i < len; i = i + 8) { %>
    <% if (i === 0) { %>
      <span class="current"> · </span>
    <% } else { %>
      <span> · </span>
    <% } %>
  <% } %>
</div>