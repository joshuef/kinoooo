'use strict';
let path = require('path');
let port = 8000;
let srcPath = path.join(__dirname, '/../src');
let publicPath = '/assets/';
let additionalPaths = [];
module.exports = {
  additionalPaths: additionalPaths,
  port: port,
  debug: true,
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: 'app.js',
    publicPath: publicPath
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port: port,
    publicPath: publicPath,
    noInfo: false
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx'
    ],
    alias: {
      actions: srcPath + '/actions/',
      components: srcPath + '/components/',
      sources: srcPath + '/sources/',
      stores: srcPath + '/stores/',
      styles: srcPath + '/styles/',
      config: srcPath + '/config/' + process.env.REACT_WEBPACK_ENV
    }
  },
  module: {
    preLoaders: [{
        test: /\.(js|jsx)$/,
        include: srcPath,
        loader: 'eslint-loader'
      }],
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
        // loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
      // {
      //   test: /\.sass/,
      //   loader: 'style-loader!css-loader?modules!postcss-loader?outputStyle=expanded&indentedSyntax'
      // },
      // {
      //   test: /\.scss/,
      //   loader: 'style-loader!css-loader?modules!postcss-loader!sass-loader?outputStyle=expanded'
      // },
      // {
      //   test: /\.less/,
      //   loader: 'style-loader!css-loader?modules!postcss-loader!less-loader'
      // },
      // {
      //   test: /\.styl/,
      //   loader: 'style-loader!css-loader?modules!postcss-loader!stylus-loader'
      // },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  postcss: function () {
    return [
    // require('postcss-scss')(),
    require( 'precss')(),
    require('autoprefixer')(),
    require('postcss-responsive-type')()
    ];
  }
};
