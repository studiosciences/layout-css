var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: `(typeof self !== 'undefined' ? self : this)`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
  stats: {
    colors: true,
  },
  devtool: 'source-map',
};
