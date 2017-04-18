var path = require('path');

var mainFolder = path.join(__dirname, 'components');

module.exports = {
  entry: [
    path.join(mainFolder, 'index.js')
  ],
  output: {
    path: mainFolder,
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
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './')
  }
};
