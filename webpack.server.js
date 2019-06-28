const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    'eodiro.server': ['babel-polyfill', './server/main.ts']
  },
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: __dirname + '/server/build/',
    filename: '[name].built.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      Configs: __dirname + '/server/configs/',
      Database: __dirname + '/server/database/',
      Resources: __dirname + '/server/resources/',
      Routes: __dirname + '/server/routes/',

      Controller: __dirname + '/server/app/controller/',
      DB: __dirname + '/server/app/db/',
      Middleware: __dirname + '/server/app/middleware/',
      Provider: __dirname + '/server/app/provider/'
    }
  },
  module: {
    rules: [
      {
        test: [/\.js$/],
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      {
        test: [/\.tsx?$/],
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  }
}
