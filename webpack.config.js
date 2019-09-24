const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: __dirname + '/src/common_core/player/player.js',
    optimization: {
        minimize: false
    },
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        libraryTarget: 'var',
        library: 'PlayerWrapper'
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/common_core/templates/assets/', to: 'src/common_core/templates/assets/' },
            { from: 'src/common_core/player/assets/', to: 'src/common_core/player/assets/' },
            { from: 'src/common_core/player/fonts/', to: 'src/common_core/player/fonts/' },
            { from: 'index.html', to: 'index.html', toType: 'file' },
        ]),

    ],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'

        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
                { loader: 'style-loader' },
                { loader: 'css-loader' }
            ]
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'url-loader'
                }
            ]
        }, {
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
        }]
    },
    "devServer":{
        "host":"172.18.11.190"
    }
};
