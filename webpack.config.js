var webpack = require('webpack');
var PROD = process.env.NODE_ENV == "production";

module.exports = {
  entry:
  {
    app:'./src/js/app.js'
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
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react&plugins[]=transform-object-rest-spread' }
    ]
  }
}
