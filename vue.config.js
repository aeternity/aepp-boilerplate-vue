module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/aepp-boilerplate-vue/'
    : '/',
  transpileDependencies: [
    '@aeternity'
  ],
  // added file-loader
  chainWebpack: config => {
    // .aes loader
    config.module
      .rule('aes')
      .test(/\.aes$/)
      .use('file-loader')
      .loader('file-loader')
      .end()
  }

}
