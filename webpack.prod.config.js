const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

require('dotenv').config( {
  path: path.join(__dirname, '.env/.env.frontend'),
} );

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'src', 'index'),
  watch: false,
  // mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
            keep_fnames: true, // Preserve function names
            keep_classnames: true, // Preserve class names
            compress: {
              keep_classnames: true, // Preserve class names during compression
              keep_fnames: true // Preserve function names during compression
            },
            mangle: false // Do not mangle variable and function names
        },
      }),
    ],
  },
  output: {
    path: path.join(__dirname, 'public/build'),
    publicPath: '/build/',
    filename: 'bundle.js',
    chunkFilename: '[name].js',
  },
  cache: {
    type: 'filesystem',
    maxAge: 1,
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
    extensions: [ '.json', '.ts', '.scss', '.svg', '', '.js' ],
    modules: [ 'node_modules' ],
  },
  devtool: 'source-map',
};
