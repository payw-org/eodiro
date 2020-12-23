const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
const path = require('path')

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      // Noop resolution of @prisma/client in the browser
      // since setting an alias to false does not work
      config.resolve.alias['@prisma/client'] = path.join(
        __dirname,
        'prisma/noop.js'
      )
    }

    config.plugins.push(
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
      })
    )

    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
    })

    return config
  },
}
