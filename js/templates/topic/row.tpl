        <% if (lou === 0) { %>
        <% // todo: 这里未对输出的标题做encodeURI，需要检查是否在服务器已经做了防xss %>
        <h2><%== subject.replace(/(\[.*?\])/g, '<span class="tag">$1</span>') %></h2>
        <% } %>
        <% defaults_avatar = './style/images/avatar.png'; %>
        <div class="info">
          <img class="avatar" src='<%= avatar %>' onerror='javascript:this.src="<%= defaults_avatar %>";' />
          <span class="author"><%= authorName %></span>
          <span class="floor"><%= lou %>楼</span>
          <time><%= $format_date(postDate) %></time>
        </div>
        <% 
        // 这里需要ubb一次content，同时借由ubb防止xss攻击
        %>
        <div class="content">
          <% if (subject && lou !== 0) { %>
          <h3><%= subject %></h3>
          <% } %>
          <%= content %>
        </div>
        <div class="clearfix"></div>
