const webpack = require('webpack');
const config = require('./index');
const utils = require('../utils');
const compact = require('lodash/compact');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const packageConfig = config.package;
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: devMode? "development" : "production",
  entry: {

  },
  output: {
    filename: devMode ? 'js/[name].js' : 'js/[name].[hash].js',
    chunkFilename: "js/[name].[hash].js"
  },
  resolve: {
    alias: {
      themePath: ""
    }
  },
  module: {
    rules: [      
      {
        test: /\.(sa|sc|c)ss$/,
        oneOf: utils.getStyleLoaders(packageConfig)
      },
      {
        test: /(\.(woff2?|ttf|eot|otf)$|font.*\.svg$)/,
        loader: "file-loader",
        options: {
          name: 'fonts/[name].[ext]?[hash]'
        }
      },
      { 
        test: /(\.(png|jpe?g|gif)$|^((?!font).)*\.svg$)/,
        loader: "file-loader",
        options: {
          name: 'img/[name].[ext]?[hash]'
        }
      },      
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',          
          options: utils.getBabelConfig(packageConfig)
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
        cacheGroups: {
            commons: {
              name: "commons",
              chunks: "all",
              minChunks: 2,
              reuseExistingChunk: true              
            },
            vendor: {
              name: "vendor",
              test: module => /[\\/]node_modules[\\/]/.test(module.context),
              chunks: "all",              
              priority: 10,
              enforce: true,
              reuseExistingChunk: true,
              minChunks: 1
            }           
        }
    }
  },
  plugins: compact([
    packageConfig.vue? new VueLoaderPlugin() : false,
    new MiniCssExtractPlugin({
      filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
      chunkFilename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
    })
  ])
};