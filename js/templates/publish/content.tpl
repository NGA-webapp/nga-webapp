    <div class="form action-publish">
      <input name="title" class="param-title" placeholder="标题" x-webkit-speech lang="zh-CN"/>
      <textarea name="content" class="param-content" placeholder="内容" rows="5" required x-webkit-speech lang="zh-CN"></textarea>
    </div>
    <div class="toolbar">
      <a class="tool action-emotion"><span class="glyphicon glyphicon-star"></span></a>
      <a class="tool action-delete">D</a>
      <a class="tool action-bold"><span class="glyphicon glyphicon-bold"></span></a>
    </div>
    <div class="emotion-panel">
      <div class="emotion-list">
      </div>
      <div id="emotion-category" class="emotion-category">
        <ul>
          <% for (key in emotions) { %>
            <li data-category="<%= key %>"><%= emotions[key].name %></li>
          <% } %>
        </ul>
      </div>
    </div>
