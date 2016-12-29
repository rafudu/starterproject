var webpack = require('webpack');
var PROD = process.env.NODE_ENV == "production";

module.exports = {
  entry:
  {
    app:'./src/js/app.js'
  },
  resolve: {
    modulesDirectories: ["node_modules", "node_modules/foundation-sites/dist", "node_modules/foundation-sites/dist/plugins"]
  },
  plugins:[
      new webpack.DefinePlugin({
          'process.env':{
            'NODE_ENV': JSON.stringify('production')
          }
        }),
      new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false
      }
    })],

  output: {
    filename: '[name].js',
    publicPath: ''
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['syntax-flow', 'transform-flow-strip-types', 'transform-object-rest-spread', 'transform-class-properties']
        }
      }
    ]
  }
}
