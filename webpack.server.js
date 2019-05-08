const nodeExternals = require('webpack-node-externals');

module.exports = {
    target: "node",
    externals: [nodeExternals()],
    entry: {
        'eodiro.server': ['./server/server.js']
    },
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        path: __dirname + '/server/lib/build/',
        filename: '[name].built.js'
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            Server: __dirname + '/server/',
            Configs: __dirname + '/server/configs/',
            Database: __dirname + '/server/database/',
            Routes: __dirname + '/server/routes/',

            Provider: __dirname + '/server/app/Provider/',
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
                            presets: [
                                '@babel/preset-env'
                            ]
                        }
                    }
                ]
            }
        ]
    }
}
