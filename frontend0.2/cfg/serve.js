'use strict';

let path = require('path');
let webpack = require('webpack');
let _ = require('lodash');

let baseConfig = require('./base');
let publicPath = '/assets/';
let srcPath = path.join(__dirname, '/../src');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = _.merge( {}, {
  entry: path.join(__dirname, '../src/routes'),

  target: 'node',

  externals: /^[a-z][a-z\.\-0-9]*$/,

  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.local'],
  alias: {
      actions: srcPath + '/actions/',
      components: srcPath + '/components/',
      sources: srcPath + '/sources/',
      stores: srcPath + '/stores/',
      styles: srcPath + '/styles/',
      config: srcPath + '/config/' + process.env.REACT_WEBPACK_ENV
    },
  },


  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: 'server-routes.js',
    publicPath: publicPath,
    libraryTarget: 'commonjs2'
  },

  node: {
    __filename: true,
    __dirname: true,
    console: true
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      // { test: /\.jsx?$/, exclude: /node_modules\/normalize\.css/, loader: 'null-loader' },
      // { test: /\.local$/, exclude: /node_modules/, loader: 'css-loader/locals?module!less-loader' },
      { test: /\.(css|sass|scss|less|styl)$/, loader: 'null-loader' },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'null-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }



// config.module.loaders = [{
//   test: /\.(js|jsx)$/,
//   loader: 'babel',
//   include: [].concat(
//     config.additionalPaths,
//     [ path.join(__dirname, '/../src') ]
//   )
// },
//  {
//         test: /\.(png|jpg|gif|woff|woff2)$/,
//         loader: 'url-loader?limit=8192'
//       },{
//     test: /\.css$/,
//     loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
// }
//       ];


} );


module.exports = config;
