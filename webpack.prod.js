const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const path = require('path');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'bundle.js?[[contenthash]]',
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('postcss-import'),
                  require('tailwindcss'),
                  require('autoprefixer'),
                  require('@fullhuman/postcss-purgecss')({
                    content: [
                      path.join(__dirname, './src/index.html'),
                      path.join(__dirname, './**/*.vue'),
                      path.join(__dirname, './src/**/*.js')
                    ],
                    whitelistPatterns: [/^ae/],
                    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
                  }),
                  require('cssnano')({
                    'preset': [
                      'default',
                      { 'discardComments': { 'removeAll': true } }
                    ]
                  })
                ]
              }
            }
          }
        ]
      }
    ]
  }
});
