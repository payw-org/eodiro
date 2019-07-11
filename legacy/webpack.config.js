const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackMessages = require('webpack-messages')
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin')

module.exports = {
  entry: {
    styles: ['./client/scss/index.js'],
    'eodiro.app': ['./client/main.js']
  },
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    publicPath: '/assets/build/',
    path: __dirname + '/public_html/assets/build/',
    filename: '[name].built.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
      // maxInitialRequests: Infinity,
      // minSize: 0,
      // cacheGroups: {
      // 	vendor: {
      // 		test: /[\\/]node_modules[\\/]/,
      // 		name (module) {
      // 			// get the name. E.g. node_modules/packageName/not/this/part.js
      //       // or node_modules/packageName
      //       const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]

      //       // npm package names are URL-safe, but some servers don't like @ symbols
      // 			return `npm.${packageName.replace('@', '')}`
      // 		}
      // 	}
      // }
    }
  },
  resolve: {
    extensions: ['.js', '.ts', '.scss', '.css', '.vue', '.styl'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      SCSS: __dirname + '/client/scss/',
      Components: __dirname + '/client/components/',
      Modules: __dirname + '/client/modules/'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        resourceQuery: /blockType=i18n/,
        type: 'javascript/auto',
        loader: '@kazupon/vue-i18n-loader'
      },
      {
        test: [/\.tsx?$/],
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['syntax-dynamic-import']
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: [/\.js$/],
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['syntax-dynamic-import']
            }
          }
        ]
      },
      {
        test: [/\.styl$/],
        use: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: [/\.css$/],
        use: [
          'vue-style-loader',
          // MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  browsers: ['> 1%', 'last 2 versions']
                })
              ]
            }
          }
        ]
      },
      {
        test: [/\.scss$/],
        use: [
          'vue-style-loader',
          // MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  browsers: ['> 1%', 'last 2 versions']
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
    new HtmlWebpackPlugin({
      filename: '../../home.html',
      template: './public_html/home-template.ejs',
      hash: true,
      chunks: 'all'
    }),
    new VueLoaderPlugin(),
    new CleanTerminalPlugin({
      message: 'eodiro has been successfully built'
    })
    // new MiniCssExtractPlugin({
    // 	filename: '[name].built.css'
    // })
  ]
}
