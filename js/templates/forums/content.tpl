<% if (custom.length > 0) { %>
<li class="category">
  自定义版面
</li> 
<% } %>
<% for (var i = 0, len = custom.length; i < len; i++) { %>
  <li data-fid="<%= custom[i] %>" class="forum">
    <h4>
      版面[<%= custom[i] %>]
      <span class="glyphicon glyphicon-ok"></span>
    </h4>
  </li>
<% } %>
<% for (cIndex = 0, cLen = cats.length; cIndex < cLen; cIndex++) { %>
  <% for (gIndex in cats[cIndex]) { %>
    <% for (fIndex = 0, fLen = cats[cIndex][gIndex].length; fIndex < fLen; fIndex++) { %>
      <% var forum = cats[cIndex][gIndex][fIndex]; %>
      <% if (fIndex === 0) { %>
        <% if (gIndex === '0') { %>
        <li class="category">
          <%= forum.cat %>
        </li> 
        <% } %>
        <% if (forum.group) { %>
        <li class="group">
          <%= forum.group %>
        </li>
        <% } %>
      <% } %>
      <li data-fid="<%= forum.fid %>" class="forum">
        <h4>
          <%= forum.name %>
          <span class="glyphicon glyphicon-ok"></span>
        </h4>
        <%= forum.info %>
      </li>
    <% } %>
  <% } %>
<% } %>
