const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
// Cleans dist folder before building for fresh build
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const webpack = require('webpack');

const distFolder = path.resolve(__dirname, 'dist');

module.exports = {
  target: ['web'],
  output: {
    assetModuleFilename: 'assets/[name].[ext]',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.vue', '.css', '.js'],
    alias: {
      process: 'process/browser',
      '~': path.resolve(__dirname, 'src')
    },
    fallback: {
      fs: false,
      stream: require.resolve("stream-browserify"),
      path: require.resolve("path-browserify"),
      crypto: require.resolve("crypto-browserify")
    }
  },
  entry: {
    'main': path.resolve(__dirname, 'src/main.js')
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
    new HtmlWebpackPlugin({
      inject: true,
      // chunks: ['main'],
      title: 'Example Aepp',
      template: './src/index.html',
      filename: distFolder + '/index.html',
      // Avoids building twice for dev
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin(),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, 'src/assets/logo.svg'),
      mode: 'webapp', // optional can be 'webapp' or 'light' - 'webapp' by default
      devMode: 'webapp', // optional can be 'webapp' or 'light' - 'light' by default
      publicPath: '/',
      favicons: {
        start_url: '/',
        appName: 'Example Aepp',
        appDescription: 'Example Description.',
        developerName: 'Aeternity Developers',
        developerURL: 'https://github.com/kenodressel/aepp-boilerplate',
        background: '#ff0d6a',
        theme_color: '#ff0d6a',
        icons: {
          coast: false,
          yandex: false,
          windows: false
        }
      }
    })
  ],
  module: {
    rules: [
      // this will apply to both plain `.js` files
      // AND `<script>` blocks in `.vue` files
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules/@aeternity"),
          path.resolve(__dirname, "node_modules/rlp"),
          // Contains "const" or "let"
          path.resolve(__dirname, "node_modules/base-x"),
        ],
        loader: 'babel-loader'
      },
      {
        type: 'javascript/auto',
        test: /\.mjs$/,
        include: [
          path.resolve(__dirname, "node_modules/@download/blockies")
        ],
        loader: 'babel-loader'
      },
      // allows vue compoents in '<template><html><script><style>' syntax
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader!standard-loader?error=true'
          }
          // extractCSS: true
          // other vue-loader options go here
        }
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader', // translates CSS into CommonJS
          'sass-loader' // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.aes$/,
        type: 'asset/source'
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource'
      }
    ]
  }
};
