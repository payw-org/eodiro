const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	entry: {
		'eodiro.app': ['./src/main.js']
	},
	mode: 'development',
	devtool: 'inline-source-map',
	output: {
		path: __dirname + '/public_html/assets/built/js',
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
				test: [/\.scss$/],
				use: [
					'style-loader',
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
    new VueLoaderPlugin()
  ]
}
