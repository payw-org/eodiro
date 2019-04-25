const merge = require('webpack-merge');
const config = require('./webpack.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(config, {
	mode: 'production',
	devtool: '',
	optimization: {
    minimizer: [new UglifyJsPlugin()],
  }
});