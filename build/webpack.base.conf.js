const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'
const ENV = WEBPACK_ENV === 'dev'

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/app.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: ENV ? '/' : '/xcx/admin/',
    filename: ENV ? 'js/[name].js' : 'js/[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          hotReload: true // 热重载
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [
          path.resolve(__dirname, '../src/assets/icons')
        ],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        exclude: [
          path.resolve(__dirname, '../src/assets/icons')
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'img/[name].[hash:7].[ext]',
              publicPath: ENV ? '/' : '/xcx/admin/'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
                limit: 5000,
                name: 'fonts/[name].[hash:7].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, '../src/components'),
      router: path.resolve(__dirname, '../src/router'),
      service: path.resolve(__dirname, '../src/service'),
      pages: path.resolve(__dirname, '../src/pages'),
      utils: path.resolve(__dirname, '../src/utils'),
      store: path.resolve(__dirname, '../src/store'),
      assets: path.resolve(__dirname, '../src/assets'),
      config: path.resolve(__dirname, '../config'),
      'vue$': ENV ? 'vue/dist/vue.esm.js' : 'vue/dist/vue.runtime.esm.js'
    },
    extensions: ['.js', '.vue']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      chunksSortMode: 'none',
      inject: true,
      hash: true,
      favicon: path.resolve(__dirname, '../public/sencha.ico'),
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new VueLoaderPlugin()
  ]
}
