const merge = require('webpack-merge');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const base = require('./base');

module.exports = merge(base, {
  mode: 'production',
  entry: {
    index: './src/index.js',
    another: './src/scripts-module.js',
    },
  output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    runtimeChunk: 'single',
  },

  devtool: false,
  performance: {
    maxEntrypointSize: 900000,
    maxAssetSize: 900000,
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },

});
