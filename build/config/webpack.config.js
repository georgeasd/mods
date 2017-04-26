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
      },
      {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
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