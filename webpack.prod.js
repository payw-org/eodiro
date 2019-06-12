const merge = require('webpack-merge')
const config = require('./webpack.config.js')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')

module.exports = merge(config, {
	mode: 'production',
	devtool: '',
	optimization: {
    minimizer: [
			new TerserJSPlugin({}),
			new OptimizeCSSAssetsPlugin({})
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.GA_TRACKING_ID': JSON.stringify('UA-140443623-1')
		}),
	]
})