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
    browsers: ['PhantomJS'],
    singleRun: false,
    autoWatchBatchDelay: 300,
    browserNoActivityTimeout: 3000000,

    files: ['./src/*_test.js'],

    plugins: [
      'karma-chai',
      'karma-babel-preprocessor',
      'karma-mocha',
      'karma-phantomjs-launcher',
      'karma-webpack',
    ],

    preprocessors: {
      './src/index.js': ['webpack'],
      './src/*_test.js': ['webpack'],
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true,
    },
  });
};
