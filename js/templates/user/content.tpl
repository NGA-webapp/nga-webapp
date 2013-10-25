    <% defaults_avatar = './style/images/avatar_150.png'; %>
    <div class="avatar">
        <img src="<%= avatar %>" onerror='javascript:this.src="<%= defaults_avatar %>";' />
    </div>
    <h4><%= username %></h4>
    <hr class="inset" />
    <table>
      <tbody>
        <tr><td class="title">UID</td><td class="value"><%= uid %></td></tr>
        <tr><td class="title">级别</td><td class="value"><%= groupName %></td></tr>
        <tr><td class="title">发帖数</td><td class="value"><%= posts %></td></tr>
        <tr><td class="title">威望</td><td class="value"><%= $decimal(fame / 10, 0).floor %></td></tr>
        <tr><td class="title">注册时间</td><td class="value"><%= $format_date(reg) %></td></tr>
      </tbody>
    </table>
