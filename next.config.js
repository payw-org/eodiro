const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')

module.exports = {
  webpack: (config) => {
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
