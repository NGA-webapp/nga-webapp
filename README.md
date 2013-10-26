# nga-webapp
dev version  

## todo
- todo list
  - 设置喜爱版面时，将显示当前选中的版面集中显示在顶部，或在header显示数量
  - 主题列表pull & refresh, pull & next page
  - 帖子列表pull & previous or next page
  - 开发letter模块，用于新建或回复主题
  - 开发设置页数据绑定
  - 推进ubb重写进度
  - 开发收藏主题列表模块
  - 开发搜索主题模块
  - 重写bootup界面
  - 补全登录页面逻辑
  - 用storage缓存登陆用户头像，并显示在查看当前登录账号的页面
  - 开发letter模块的表情键入

## dev logs
### 视图结构
- body
  - .splash: 启动画面 1500
  - .notification: 通知组件区域 1000
  - main: 主画布 0
    - .overlay: 场景(/侧边栏)背景布 100
    - aside(*): 侧边栏 200
    - section(*): 主要场景 300
      - .asideMask: 开启Aside时在Section接受触摸事件的覆盖物 500 
      - header: 顶部菜单栏 400
      - footer: 底部菜单栏 400
      - .loading: 加载状态组件区域 300
      - article: 主要内容区域 200
      - .overlay: 内容背景布 100

- aside
  - #menu
  - #user
- section
  - #forum
  - #topic
  - #login
  - #letter

