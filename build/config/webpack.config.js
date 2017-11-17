const webpack = require('webpack')
const config = require('./index')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {

  },
  output: {
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
      },
      {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: 'postcss-loader',
                    options: {
                      plugins: function () { 
                        return [
                          require('precss'),
                          require('autoprefixer')
                        ];
                      }
                    }
                }, {
                    loader: "sass-loader"
                }],
                fallback: "style-loader"
            })
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "file-loader",
        options: {
          name: 'fonts/[name].[ext]?[hash]'
        }
      },
      { 
        test: /\.svg$/, 
        loader: "svg-inline-loader" 
      }
    ]
  },
  resolve: {
    alias: {
      themePath: ""
    }
  },
  plugins: [
    new UglifyJSPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
    }),
    new ExtractTextPlugin({
      filename:"css/[name].css",
      allChunks: true
    })
  ]
};