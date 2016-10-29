var path = require('path');
var webpack = require('webpack');

module.exports = {
  cache: true,
  context: __dirname,
  entry: {
    jsx: "./jsx/index.jsx",
    css: "./src/main.css",
    html: "./src/index.html",
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    preLoaders: [
      { test: /\.jsx$/, loader: "eslint" },
    ],
    loaders: [
      { test: /\.html$/, loader: "file?name=[name].[ext]" },
      { test: /\.css$/, loader: "file?name=[name].[ext]" },
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel' },
    ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': process.env.NODE_ENV,
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  eslint: {
    configFile: './.eslintrc'
  }
};
