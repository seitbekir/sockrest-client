const path = require('path')

module.exports = {
    entry: './src/app.js',
    externals: {
        global: glob()
    },
    output: {
        filename: 'sockrest-client.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'SockrestClient',
        libraryTarget: 'var',
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
            query: { presets: ['env'] }
        }],
    },
}

function glob () {
    return 'typeof self !== "undefined" ? self : ' +
        'typeof window !== "undefined" ? window : ' +
        'typeof global !== "undefined" ? global : {}'
}
