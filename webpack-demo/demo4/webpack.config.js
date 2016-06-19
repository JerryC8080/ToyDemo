const webpack =  require("webpack");
module.exports = {
  entry: "./src/app.js",
  output: {
    path: './bin',
    filename: 'app.bunble.js'
  },
  module: {
    loaders: [{
      loader: 'babel-loader',
      test: /.js$/,
      exclude: /node_modules/
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
        },
        output: {
            comments: false,
        },
    }),
  ]
}