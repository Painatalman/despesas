var path = require('path');

var mainFolder = path.join(__dirname, 'components');
var publicFolder = path.join(__dirname, 'public/scripts');

module.exports = {
  entry: [
    path.join(mainFolder, 'index.js')
  ],
  output: {
    path: publicFolder,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      include: mainFolder,
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-0']
      }
    }]
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './')
  }
};
