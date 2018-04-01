const path = require('path');
const {
  HotModuleReplacementPlugin,
  NamedModulesPlugin,
  NoEmitOnErrorsPlugin,
} = require('webpack');

const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: [
      'webpack-dev-server/client?http://0.0.0.0:3000',
      'webpack/hot/only-dev-server',
      './index.jsx',
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
    new HotModuleReplacementPlugin(),
    new HtmlPlugin({
      template: path.join(__dirname, 'index.html'),
      inject: 'body',
    }),
    new NamedModulesPlugin(),
    new NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  stats: {
    colors: true,
    reasons: true,
  },
};
