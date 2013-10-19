# nga-webapp
dev version  

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

