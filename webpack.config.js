const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

require('dotenv').config( {
  path: path.join(__dirname, '.env/.env.frontend'),
} );

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index'),
  watch: true,
  output: {
    path: path.join(__dirname, 'public/build'),
    publicPath: '/build/',
    filename: 'bundle.js',
    chunkFilename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ],
      },
      {
        test: /\.(svg)$/,
        use: [ 'raw-loader' ],
      },
  ],
  },
  plugins: [
    new webpack.DefinePlugin( {
      'process.env': JSON.stringify(process.env),
    } ),
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    extensions: [ '.json', '.ts', '.scss', '.svg', '' ],
    modules: [ 'node_modules' ],
  },
  devtool: 'source-map',
};
