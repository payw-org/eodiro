const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    'eodiro.server': ['babel-polyfill', './server/main.js']
  },
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: __dirname + '/server/lib/build/',
    filename: '[name].built.js'
  },
  resolve: {
    extensions: ['.js', 'json'],
    alias: {
      Server: __dirname + '/server/',
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
      }
    ]
  }
}
