<% for (var i = 0, len = forums.length; i < len; i++) { %>
  <li data-fid="<%= forums[i] %>" class="forum">
    <h4>
      版面[<%= forums[i] %>]
    </h4>
  </li>
<% } %>