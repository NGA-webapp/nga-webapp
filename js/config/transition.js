define(function (require, exports, module) {
  /**
   * 转场动画设置
   * @type {Array}
   * obj.from 源跳转视图的selector，为'firstTime'则表示是第一次跳转没有源视图
   * obj.to 目标跳转视图的selector
   * obj.before.from/obj.before.to 转场前预设样式，如将z-index提高或降低
   * obj.animate.from/obj.animate.to 转场动画的样式
   * obj.after.from/obj.after.to 转场后样式，如将z-index降低至幕后
   *
   * 此外，约定以下样式名
   * noop: 不带任何样式
   * pop: z-index略高于正常情况
   * dive: z-index略低于正常情况
   * 
   * 另外，以下样式会在转场开始前移除，并建议设置时只用在after选项
   * behide: z-index低于overlay，即代表不显示的视图；不带有该样式则说明正在台前
   * leanLeft: 倚在左侧边，用在aside打开后的section
   * leanRight: 倚在右侧边，用在aside打开后的section
   */
  var map = [
    {
      from: 'firstTime',
      to: '#forum',
      before: {to: 'noop'},
      animate: {to: 'section-bounceInRight'},
      after: {to: 'noop'},
      duration: 600,
      aside: ''
    },
    {
      from: 'firstTime',
      to: '#topic',
      before: {to: 'noop'},
      animate: {to: 'section-bounceInRight'},
      after: {to: 'noop'},
      duration: 600,
      aside: ''
    },
    {
      from: '#forum',
      to: '#topic',
      before: {from: 'noop', to: 'noop'},
      animate: {from: 'section-bounceOutLeft', to: 'section-bounceInRight'},
      after: {from: 'behind', to: 'noop'},
      duration: 600,
      aside: ''
    },
    {
      from: '#topic',
      to: '#forum',
      before: {from: 'noop', to: 'noop'},
      animate: {from: 'section-bounceOutRight', to: 'section-bounceInLeft'},
      after: {from: 'behind', to: 'noop'},
      duration: 600,
      aside: ''
    },
    {
      from: '#topic',
      to: '#user',
      before: {from: 'noop', to: 'noop'},
      animate: {from: 'section-bounceOutUp', to: 'section-bounceInUp'},
      after: {from: 'behind', to: 'noop'},
      duration: 600,
      aside: ''
    },
    {
      from: '#user',
      to: '#topic',
      before: {from: 'noop', to: 'noop'},
      animate: {from: 'section-bounceOutDown', to: 'section-bounceInDown'},
      after: {from: 'behind', to: 'noop'},
      duration: 600,
      aside: ''
    },
    // {
    //   from: 'firstTime',
    //   to: '#menu',
    //   before: {to: 'noop'},
    //   animate: {to: 'noop'},
    //   after: {to: 'noop'},
    //   duration: 600,
    //   aside: '#menu'
    // },
    {
      from: '#forum',
      to: '#menu',
      before: {from: 'noop', to: 'noop'},
      animate: {from: 'section-openLeftAside', to: 'noop'},
      after: {from: 'leanRight', to: 'noop'},
      duration: 600,
      aside: ''
    },
    {
      from: '#forum',
      to: '#forum',
      before: {to: 'noop'},
      animate: {to: 'section-closeLeftAsideOutAndIn'},
      after: {from: 'noop', to: 'noop', aside: 'behind'},
      duration: 600,
      aside: '#menu'
    },
    {
      from: '#forum',
      to: '#setting',
      before: {from: 'noop', to: 'noop', menu: 'noop'},
      animate: {from: 'section-closeLeftAside', to: 'section-bounceInRight', menu: 'noop'},
      after: {from: 'behind', to: 'noop', menu: 'behind'},
      duration: 600,
      aside: '#menu'
    }
  ];

  module.exports = map;
});
