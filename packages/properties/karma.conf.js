var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['jsdom'],
    singleRun: false,
    autoWatchBatchDelay: 300,
    browserNoActivityTimeout: 3000,
    hostname: '127.0.0.1',

    files: ['./test/*_test.js'],

    plugins: [
      'karma-chai',
      'karma-babel-preprocessor',
      'karma-mocha',
      'karma-jsdom-launcher',
      'karma-webpack',
    ],

    preprocessors: {
      './src/index.js': ['babel'],
      './test/*_test.js': ['babel'],
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true,
    },
  });
};
