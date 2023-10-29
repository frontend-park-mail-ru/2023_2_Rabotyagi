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
    publicPath: '/public/build/',
    filename: "bundle.js",
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }, 
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
            // {
            //     loader: 'postcss-loader',
            //     options: {
            //         plugins: () => [
            //             require('autoprefixer')
            //         ],
            //         sourceMap: true
            //     }
            // },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
            },
          ]
      },
      { test: /\.ttf$/, use: 'url-loader?limit=100000' },
      // {
      //   test: /\.ttf$/i,
      //   loader: "file-loader",
      //   options: {
      //     name(file) {
      //       return "[hash].[ext]";
      //     },
      //   },
      // },
      // {
      //   test: /\.css$/i,
      //   use: [MiniCssExtractPlugin.loader, "css-loader"],
      // },
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