        <span>
          <%= replies < 9999 ? replies : 9999 %>
        </span>
        <div class="details">
          <h4><%= subject %></h4>
          <%= authorName %>
          <time><%= $format_date(lastPost) %></time>
        </div>
        <div class="clearfix"></div>
