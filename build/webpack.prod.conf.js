const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const baseConfig = require('./webpack.base.conf')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizePlugin = require('optimize-css-assets-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const CompressionPlugin = require('compression-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  optimization: {
  	splitChunks: {
      chunks: 'all',
  		cacheGroups: {
        vendor: { // 第三方插件
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          name: 'chunk-vendor',
          chunks: 'all'
        }
      }
  	},
    runtimeChunk: 'single'
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin(),
    new OptimizePlugin({
      cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
      cssProcessorOptions: {
        safe: true, discardComments: { removeAll: true }
      },
      canPrint: true
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[id].[name].[contenthash:8].css"
      // allChunks: true
    })
    // 前端开启gzip压缩
    // new CompressionPlugin({
    //   filename: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   test: new RegExp('\\.(js|css)$'),
    //   threshold: 10240,
    //   minRatio: 0.8,
    //   deleteOriginalAssets: true
    // }),
    // new BundleAnalyzerPlugin()
  ]
})
