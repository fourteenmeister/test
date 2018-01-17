const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = merge(common, {
  devtool: 'source-map',
  devServer: {
    hot: true,
    contentBase: 'build',
    port: 3000,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HotModuleReplacementPlugin(),
  ],
});
