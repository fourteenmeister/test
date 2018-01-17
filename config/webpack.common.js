const HtmWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch',
      path.resolve('src', 'index'),
      path.resolve('src', 'templates', 'style.scss'),
    ],
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
      {
        test: /\.(css|scss)$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
          options: {
            modules: true,
            camelCase: true,
            localIdentName: '[local]_[hash:base64:5]',
          },
        }, {
          loader: 'sass-loader',
        }],
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve('build'),
  },
  plugins: [
    new CleanWebpackPlugin(['build/*.*'], {
      root: process.cwd(),
    }),
    new HtmWebpackPlugin({
      title: 'OneTwoTrip test',
      template: path.join('src', 'templates', 'index.html'),
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
