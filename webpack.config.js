const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
	entry: {
		'eodiro.app': ['./src/main.js']
	},
	mode: 'development',
	devtool: 'inline-source-map',
	output: {
		path: __dirname + '/public_html/assets/build/',
		filename: '[name].built.js'
	},
	resolve: {
		extensions: ['.js', '.ts', '.scss', '.vue'],
		alias: {
			vue$: 'vue/dist/vue.esm.js'
		}
	},
	module: {
		rules: [
			{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
			{
				test: [/\.js$/],
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
								// '@babel/preset-react'
							]
						}
					}
				]
			},
			{
				test: [/\.css$/],
				use: [
					'style-loader',
					// MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [
								require('autoprefixer')
								({
									'browsers': ['> 1%', 'last 2 versions']
								})
							]
						}
					}
				]
			},
			{
				test: [/\.scss$/],
				use: [
					'style-loader',
					// MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [
								require('autoprefixer')
								({
									'browsers': ['> 1%', 'last 2 versions']
								})
							]
						}
					},
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		// new MiniCssExtractPlugin({
		// 	filename: '[name].built.css',
		// 	chunkFilename: '[name].built.css',
		// 	path: __dirname + '/public_html/assets/build/',
		// 	publicPath: '/public_html/assets/build/'
		// })
  ]
}
