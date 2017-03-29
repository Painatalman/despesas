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
      includes: path.,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-0']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
