const nodeExternals = require('webpack-node-externals');

module.exports = {
    target: "node",
    externals: [nodeExternals()],
    entry: {
        'eodiro.server': ['./server/app/server.js']
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
            Providers: __dirname + '/server/app/providers/',
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