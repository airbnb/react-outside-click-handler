const path = require('path');

const webpack = require('webpack');

process.env.BABEL_ENV = 'test';

module.exports = (config) => {
  let browsers = ['Firefox'];
  let reporters = ['mocha'];
  let preprocessors = ['webpack', 'sourcemap'];

  if (config.coverage) {
    browsers = ['PhantomJS'];
    reporters = ['mocha', 'coverage', 'coveralls'];
    preprocessors = ['webpack'];
  }

  config.set({
    frameworks: ['mocha', 'chai'],
    files: ['test/*.spec.jsx'],
    preprocessors: {
      'test/*.spec.jsx': preprocessors,
      'lib/*.jsx?': preprocessors,
    },
    webpack: {
      entry: './test/OutsideClickHandler.spec.jsx',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /.jsx?$/,
            exclude: /node_modules/,
            enforce: 'pre',
            loader: 'eslint-loader',
          },
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
          },
          {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader'],
          },
        ],
      },
      resolve: {
        extensions: ['.js', '.jsx'],
      },
      externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
    },
    webpackMiddleware: { noInfo: true },
    plugins: [
      'karma-chai',
      'karma-coverage',
      'karma-coveralls',
      'karma-firefox-launcher',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],
    reporters: reporters,
    coverageReporter: {
      reporters: [
        { type: 'lcov', dir: 'coverage/', subdir: '.' },
        { type: 'json', dir: 'coverage/', subdir: '.' },
        { type: 'text-summary' },
      ],
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: browsers,
    singleRun: true,
    concurrency: Infinity
  })
};
