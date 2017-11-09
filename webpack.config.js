let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
//let CopyWebpackPlugin = require('copy-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//let git = require('git-rev-sync');
let path = require('path');

module.exports = function (env) {
  env = env || {};

  let vendorFiles = ['angular',
    'angular-ui-router',
  ];

  let config = {
    externals: {
      'ascendon': 'ascendon',
    },
    entry: {
      'html-storefront-ui': ['babel-polyfill', './src/app.js'],
      vendor: vendorFiles
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [/src/],
          enforce: 'pre',
          loader: 'eslint-loader',
          options: {
            failOnError: true,
          }
        },
        {
          test: /\.js$/,
          include: [/src/],
          use: [
            'ng-annotate-loader',
            'babel-loader'
          ]
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
          options: {
            attrs: false
          }
        },
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                }
              },
              {
                loader: 'less-loader',
                options: {
                  sourceMap: true,
                }
              }
            ],
            fallback: 'style-loader'
          })
        },
        {
          test: /\.((png)|(gif)|(svg))$/,
          loader: 'file-loader',
          options: {name: '[path][name].[ext]'}
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html',
        chunks: ['html-storefront-ui', 'vendor'],
        //favicon: 'app/favicon.ico',
//        revision: git.short(),
//      version: getVersion(),
        buildDate: new Date().toLocaleString()
      }),
      // new CopyWebpackPlugin([
      //   {from: 'app/locale', to: 'locale/'},
      //   {from: 'app/images', to: 'images/'}
      // ]),
      new ExtractTextPlugin('html-storefront-ui.css'),
      new webpack.optimize.CommonsChunkPlugin({name: 'vendor'})
    ],
    devtool: 'source-map',
    devServer: {
      contentBase: 'dist',
      inline: true,
      port: '8080',
      watchOptions: {
        poll: true,
        ignored: /node_modules/
      }
    }
  };

  if (env.prod) {
    config.devtool = '';
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
    config.plugins.push(new OptimizeCssAssetsPlugin({ assetNameRegExp: /\.css$/}));
  }

  return config;
};

// function getJsFileName() {
//   return '[name]-' + getVersion() + '.min.js';
// }
// function getCssFileName() {
//   return '[name]-' + getVersion() + '.min.css';
// }

// function getVersion() {
//   let result = git.branch();
//
//   if (result === 'develop') {
//     result = 'edge';
//   }
//
//   result = result.replace('release-', '');
//
//   return result;
// }
