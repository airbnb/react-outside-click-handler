const path = require('path');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpackBaseConfig = require('./webpack.base.config');

module.exports = webpackMerge(webpackBaseConfig, {
  entry: {
    'OutsideClickHandler': './lib/OutsideClickHandler.jsx',
    'OutsideClickHandler.min': './lib/OutsideClickHandler.jsx',
  },
  output: {
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    path: './dist',
    publicPath: '/',
    library: 'ReactOutsideClickHandler',
    libraryTarget: 'umd',
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    reactDOM: {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom'
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist/*'], {
      dry: false,
      verbose: true,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
      compress: {
        warnings: false
      },
    }),
  ],
});
