const path = require('path');

const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'widget',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules\/(?!react-intl|intl-messageformat|intl-messageformat-parser)/,
      },
    ],
  },
  plugins: [
    new PeerDepsExternalsPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      react: path.resolve('./example/node_modules/react'),
      'react-dom': path.resolve('./example/node_modules/react-dom'),
    },
  },
};
