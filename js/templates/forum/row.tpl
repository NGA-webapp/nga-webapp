        <span>
          <%= replies < 9999 ? replies : 9999 %>
        </span>
        <div class="details">
          <% // todo: 这里未对输出的标题做encodeURI，需要检查是否在服务器已经做了防xss %>
          <h4><%== subject.replace(/(\[.*?\])/g, '<span class="tag">$1</span>') %></h4>
          <%= authorName %>
          <time><%= $format_date(lastPost) %></time>
        </div>
        <div class="clearfix"></div>
        