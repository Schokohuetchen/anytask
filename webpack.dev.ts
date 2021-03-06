const { merge } = require('webpack-merge');
const common = require('./webpack.common.ts');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    open: true,
    compress: true,
    hot: true,
    port: 4000,
  },
});
