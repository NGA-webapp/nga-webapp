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
    // bootup
    {
      from: 'firstTime',
      to: '#bootup',
      before: {to: 'noop'},
      animate: {to: 'section-fadeIn'},
      after: {to: 'noop'},
      duration: 600,
      aside: ''
    },
    {
      from: '#bootup',
      to: '#forum',
      before: {from: 'noop', to: 'noop'},
      animate: {from: 'section-fadeOutLeft', to: 'section-bounceInRight'},
      after: {from: 'behind', to: 'noop'},
      duration: 600,
      aside: ''
    },
    {
      from: '#bootup',
      to: '#login',
      before: {from: 'noop', to: 'noop'},
      animate: {from: 'section-fadeOutLeft', to: 'section-bounceInRight'},
      after: {from: 'behind', to: 'noop'},
      duration: 600,
      aside: ''
    },
    // normal
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
      from: '#forum',
      to: '#publish',
      before: {from: 'noop', to: 'noop'},
      animate: {from: 'section-bounceOutUp', to: 'section-bounceInDown'},
      after: {from: 'behind', to: 'noop'},
      duration: 600,
      aside: ''
    },
    {
      from: '#forums',
      to: '#forum',
      before: {from: 'noop', to: 'noop'},
      animate: {from: 'section-bounceOutDown', to: 'section-bounceInUp'},
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
      from: '#topic',
      to: '#publish',
      before: {from: 'noop', to: 'noop'},
      animate: {from: 'section-bounceOutUp', to: 'section-bounceInDown'},
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
    {
      from: '#setting',
      to: '#forums',
      before: {from: 'noop', to: 'noop'},
      animate: {from: 'section-bounceOutLeft', to: 'section-bounceInRight'},
      after: {from: 'behind', to: 'noop'},
      duration: 600,
      aside: ''
    },
    {
      from: '#publish',
      to: '#forum',
      before: {from: 'noop', to: 'noop'},
      animate: {from: 'section-bounceOutDown', to: 'section-bounceInUp'},
      after: {from: 'behind', to: 'noop'},
      duration: 600,
      aside: ''
    },
    {
      from: '#publish',
      to: '#topic',
      before: {from: 'noop', to: 'noop'},
      animate: {from: 'section-bounceOutDown', to: 'section-bounceInUp'},
      after: {from: 'behind', to: 'noop'},
      duration: 600,
      aside: ''
    },
    {
      from: '#forums',
      to: '#setting',
      before: {from: 'noop', to: 'noop'},
      animate: {from: 'section-bounceOutRight', to: 'section-bounceInLeft'},
      after: {from: 'behind', to: 'noop'},
      duration: 600,
      aside: ''
    },
    {
      from: '#login',
      to: '#forum',
      before: {from: 'noop', to: 'noop'},
      animate: {from: 'section-bounceOutDown', to: 'section-bounceInUp'},
      after: {from: 'behind', to: 'noop'},
      duration: 600,
      aside: ''
    },
    {
      from: '#logout',
      to: '#login',
      before: {from: 'noop', to: 'noop'},
      animate: {from: 'section-bounceOutDown', to: 'section-bounceInUp'},
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
      from: '#forums',
      to: '#menu',
      before: {from: 'noop', to: 'noop'},
      animate: {from: 'section-openLeftAside', to: 'noop'},
      after: {from: 'leanRight', to: 'noop'},
      duration: 600,
      aside: ''
    },
    {
      from: '#setting',
      to: '#menu',
      before: {from: 'noop', to: 'noop'},
      animate: {from: 'section-openLeftAside', to: 'noop'},
      after: {from: 'leanRight', to: 'noop'},
      duration: 600,
      aside: ''
    },
    {
      from: '#logout',
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
      from: '#forums',
      to: '#forums',
      before: {to: 'noop'},
      animate: {to: 'section-closeLeftAsideOutAndIn'},
      after: {from: 'noop', to: 'noop', aside: 'behind'},
      duration: 600,
      aside: '#menu'
    },
    {
      from: '#setting',
      to: '#setting',
      before: {to: 'noop'},
      animate: {to: 'section-closeLeftAsideOutAndIn'},
      after: {from: 'noop', to: 'noop', aside: 'behind'},
      duration: 600,
      aside: '#menu'
    },
    {
      from: '#logout',
      to: '#logout',
      before: {to: 'noop'},
      animate: {to: 'section-closeLeftAsideOutAndIn'},
      after: {from: 'noop', to: 'noop', aside: 'behind'},
      duration: 600,
      aside: '#menu'
    },
    {
      from: '#forum',
      to: '#forums',
      before: {to: 'leanRight'},
      animate: {to: 'section-closeLeftAsideOutAndIn'},
      after: {from: 'behind', to: 'noop', aside: 'behind'},
      duration: 600,
      aside: '#menu'
    },
    {
      from: '#forum',
      to: '#setting',
      before: {to: 'leanRight'},
      animate: {to: 'section-closeLeftAsideOutAndIn'},
      after: {from: 'behind', to: 'noop', aside: 'behind'},
      duration: 600,
      aside: '#menu'
    },
    {
      from: '#forum',
      to: '#logout',
      before: {to: 'leanRight'},
      animate: {to: 'section-closeLeftAsideOutAndIn'},
      after: {from: 'behind', to: 'noop', aside: 'behind'},
      duration: 600,
      aside: '#menu'
    },
    {
      from: '#forums',
      to: '#forum',
      before: {to: 'leanRight'},
      animate: {to: 'section-closeLeftAsideOutAndIn'},
      after: {from: 'behind', to: 'noop', aside: 'behind'},
      duration: 600,
      aside: '#menu'
    },
    {
      from: '#forums',
      to: '#setting',
      before: {to: 'leanRight'},
      animate: {to: 'section-closeLeftAsideOutAndIn'},
      after: {from: 'behind', to: 'noop', aside: 'behind'},
      duration: 600,
      aside: '#menu'
    },
    {
      from: '#forums',
      to: '#logout',
      before: {to: 'leanRight'},
      animate: {to: 'section-closeLeftAsideOutAndIn'},
      after: {from: 'behind', to: 'noop', aside: 'behind'},
      duration: 600,
      aside: '#menu'
    },
    {
      from: '#setting',
      to: '#forum',
      before: {to: 'leanRight'},
      animate: {to: 'section-closeLeftAsideOutAndIn'},
      after: {from: 'behind', to: 'noop', aside: 'behind'},
      duration: 600,
      aside: '#menu'
    },
    {
      from: '#setting',
      to: '#forums',
      before: {to: 'leanRight'},
      animate: {to: 'section-closeLeftAsideOutAndIn'},
      after: {from: 'behind', to: 'noop', aside: 'behind'},
      duration: 600,
      aside: '#menu'
    },
    {
      from: '#setting',
      to: '#logout',
      before: {to: 'leanRight'},
      animate: {to: 'section-closeLeftAsideOutAndIn'},
      after: {from: 'behind', to: 'noop', aside: 'behind'},
      duration: 600,
      aside: '#menu'
    },
    {
      from: '#logout',
      to: '#forum',
      before: {to: 'leanRight'},
      animate: {to: 'section-closeLeftAsideOutAndIn'},
      after: {from: 'behind', to: 'noop', aside: 'behind'},
      duration: 600,
      aside: '#menu'
    },
    {
      from: '#logout',
      to: '#forums',
      before: {to: 'leanRight'},
      animate: {to: 'section-closeLeftAsideOutAndIn'},
      after: {from: 'behind', to: 'noop', aside: 'behind'},
      duration: 600,
      aside: '#menu'
    },
    {
      from: '#logout',
      to: '#setting',
      before: {to: 'leanRight'},
      animate: {to: 'section-closeLeftAsideOutAndIn'},
      after: {from: 'behind', to: 'noop', aside: 'behind'},
      duration: 600,
      aside: '#menu'
    },
  ];

  module.exports = map;
});
