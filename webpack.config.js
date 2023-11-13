const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

require('dotenv').config( {
  path: path.join(__dirname, '.env')
} );

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index'),
  watch: true,
  output: {
    path: path.join(__dirname, 'public/build'),
    publicPath: '/build/',
    filename: "bundle.js",
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
      { 
        test: /\.hbs$/,
        include: [
          path.resolve(__dirname, 'src')
        ], 
        loader: 'handlebars-loader',
      },
      { 
        test: /\.(css|sass|scss)$/, 
        use: [ 
          MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 2,
                    sourceMap: true
                }
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
            },
          ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
  ],
  },
  plugins: [
    new webpack.DefinePlugin( {
      "process.env": JSON.stringify(process.env)
    } ),
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    extensions: [ '.json', '.js', '.jsx', '.hbs', '.scss' ],
    modules: [ 'node_modules' ]
  },
  devtool: 'source-map',
};