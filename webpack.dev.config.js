const path = require('path');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackBaseConfig = require('./webpack.base.config');

const paths = {
  example: path.resolve(__dirname, 'example'),
};

module.exports = webpackMerge(webpackBaseConfig, {
  entry: {
    app: [
      'webpack-dev-server/client?http://0.0.0.0:3000',
      'webpack/hot/only-dev-server',
      './example/index.jsx',
    ],
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    pathinfo: true,
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 3000,
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(paths.example, 'index.html'),
      inject: 'body',
    }),
  ],
});
