var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {

  },
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
      }
    ]
  },
  resolve: {
    alias: {
      theme: ""
    }
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor' // Specify the common bundle's name.
    }),
    new ExtractTextPlugin("[name].css")
  ]
};