        <% if (lou === 0) { %>
        <% // todo: 这里未对输出的标题做encodeURI，需要检查是否在服务器已经做了防xss %>
        <h2><%== subject.replace(/(\[.*?\])/g, '<span class="tag">$1</span>') %></h2>
        <% } %>
        <% defaults_avatar = './style/images/avatar.png'; %>
        <div class="info">
          <% if (setting.downloadAvatar) { %>
            <img class="avatar" src='<%= avatar %>' onerror='javascript:this.src="<%= defaults_avatar %>";' />
          <% } else { %>
            <img class="avatar" src='<%= defaults_avatar %>' />
          <% } %>
          <span class="author"><%= authorName %></span>
          <span class="floor"><%= lou %>楼</span>
          <time><%= $format_date(postDate) %></time>
          <div class="clearfix"></div>
        </div>
        <div class="content">
          <% if (subject && lou !== 0) { %>
          <h3><%= subject %></h3>
          <% } %>
          <%== $ubb(content, setting) %>
          <% if (attachs.length > 0) { %>
          <hr/>
          <strong>附件: </strong>
          <%   for (i = 0, len = attachs.length; i < len; i++) { %>
          <%     if (attachs[i].type === 'img') { %>
          <%== $ubb('[img]http://img6.ngacn.cc/attachments/' + attachs[i].attachurl + '[/img]', setting) %>
          <%     } %>
          <%   } %>
          <% } %>
        </div>
        <% if (setting.showSignature && $trim(signature) !== '') { %>
        <div class="signature">
          <%== $trim($ubb(signature, setting)) %> 
        </div>
        <% } %>
        <div class="clearfix"></div>
