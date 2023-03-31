const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  configureWebpack: {
    module: {
      rules: [{
        test: /\.aes$/,
        use: {
          loader: '@aeternity/contract-builder',
        },
      }],
    },
  },
});
