const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.base.conf')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
    
  ],
  devServer: {
    port: 8080,
    inline:true,
    hot: true,
    compress: true,
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: {
      index: '/dist/index.html'
    },
    proxy : {
      '/*': {
        target: 'https://qutanmusic.xyz',
        changeOrigin : true
      }
    }
  }
})
