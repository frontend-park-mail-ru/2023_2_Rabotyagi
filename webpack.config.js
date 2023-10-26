const path = require('path');
const webpack = require('webpack');
require('dotenv').config( {
  path: path.join(__dirname, '.env')
} );

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index'),
  watch: true,
  output: {
    path: path.join(__dirname, 'public/js'),
    publicPath: '/public/js/',
    filename: "bundle.js",
    chunkFilename: '[name].js'
  },
  module: {
    rules: [ 
      {
        test: /.jsx?$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        loader: 'babel-loader',
        options: {
          presets: [
            [ "@babel/env", {
              "targets": {
                  "browsers": "last 2 chrome versions"
                }
              } 
            ]
          ]
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
        test: /\.(scss|css)$/, 
        use: [ 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader' ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader'
      }
  ],
  },
  plugins: [
    new webpack.DefinePlugin( {
      "process.env": JSON.stringify(process.env)
    } ),
  ],
  resolve: {
    extensions: [ '.json', '.js', '.jsx', '.hbs' ],
    modules: [ 'node_modules' ]
  },
  devtool: 'source-map',
};