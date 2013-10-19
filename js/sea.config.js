seajs.config({

  plugins: ['text', 'shim'],

  debug: true,

  base: './js/',

  charset: 'utf-8',

  shim: {
    // 'quo': {
    //   src: 'libs/quo.js',
    //   exports: 'Quo'
    // },
    // 'md5': {
    //   src: 'utils/md5.js',
    //   exports: 'CryptoJS'
    // }
  }

});