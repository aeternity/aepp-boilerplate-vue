const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    port: 8081,
    historyApiFallback: true,
    host: '0.0.0.0'
  },
  output: {
    filename: 'bundle.js?[[contenthash]]',
    publicPath: '/'
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
                ]
              }
            }
          }
        ]
      }
    ]
  }
});
