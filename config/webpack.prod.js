const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { DefinePlugin, optimize: { UglifyJsPlugin, CommonsChunkPlugin } } = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
  entry: {
    polyfill: '@babel/polyfill',
    vendor: ['react', 'react-dom', 'moment'],
  },
  plugins: [
    new CommonsChunkPlugin({
      names: ['vendor', 'polyfill'],
      filename: '[name].[chunkhash].js',
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      allChunks: true,
    }),
    new UglifyJsPlugin({
      sourceMap: true,
      output: {
        comments: false,
      },
    }),
  ],
});
