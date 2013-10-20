        <% 
        // 这里需要ubb一次content，同时借由ubb防止xss攻击
        %>
        <% if (lou === 0) { %>
        <h2><%= subject %></h2>
        <% } %>
        <% defaults_avatar = './style/images/avatar.png'; %>
        <div class="info">
          <img class="avatar" src='<%= avatar %>' onerror='javascript:this.src="<%= defaults_avatar %>";' />
          <span class="author"><%= authorName %></span>
          <time><%= $format_date(postDate) %></time>
        </div>
        <div class="content">
          <% if (subject && lou === 0) { %>
          <h3><%= subject %></h3>
          <% } %>
          <%= content %>
        </div>
        <div class="clearfix"></div>
