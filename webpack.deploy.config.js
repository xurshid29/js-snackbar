'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname + '/src',

  entry: [
    // js entry
    './snackbar/index.js'
  ],

  module: {
    preLoaders: [],

    loaders: [
      {
        loader: 'babel',

        test: /\.js$/,

        exclude: /node_modules/,

        /**
         * babel config options
         *
         * transform-runtime: Externalise references to helpers and builtins, automatically polyfilling
         *    your code without polluting globals. (This plugin is recommended in a library/tool)
         */
        query: {
          plugins: ['transform-runtime']
        }
      },

      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('snackbar.css')
  ],

  output: {
    filename: 'snackbar.js',

    path: __dirname + '/dist',

    /**
     * export the bundle as library (output.library is the name)
     * Use this, if you are writing a library and want to publish it as single file.
     */
    library: 'snackbar',

    /**
     *  means using universal module definition for the final result
     *  this piece of code recognizes the environment and provides a proper bootstrapping mechanism
     */
    libraryTarget: 'umd',

    /**
     * true will name the AMD module
     *    if libraryTarget = umd and library is set
     */
    umdNamedDefine: true
  },

  devtool: 'eval'
};
