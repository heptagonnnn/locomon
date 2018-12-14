const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseConfig = require('./webpack.base.config.js');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const {resolvePath} = require("./util/resolvePath");

module.exports = merge(baseConfig, {
  plugins: [
    new CleanWebpackPlugin('dist', {
      root: resolvePath(),
      verbose: true,
      dry: false
    }),
    new BundleAnalyzerPlugin(),
    new WebpackParallelUglifyPlugin({
      uglifyJS: {
        output: {
          beautify: false, //不需要格式化
          comments: false //不保留注释
        },
        compress: {
          warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
          drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器}
        }
      }
    })
  ]
});

