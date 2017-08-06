const webpack = require('webpack');
const { resolve, join } = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'null-loader'
        }, {
            test: /\.scss$/,
            loader: 'null-loader'
        },
        {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'null-loader'
        }, {
            test: /\.html$/,
            loader: 'html-loader'

        },
        {
            test: /\.json$/,
            loader: 'json-loader',
            exclude: [join(__dirname, 'src/index.html')]
        },
        {
            test: /\.js$/,
            exclude: /(node_modules|app\\spec)/,
            loader: 'istanbul-instrumenter-loader',
            enforce: 'post'
        }
        ]
    },
    plugins: [
        // //deleting the coverage folder before a fresh coverage
        new CleanWebpackPlugin(['coverage']),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Tether: 'tether',
            'window.Tether': 'tether'
        }),
        new webpack.LoaderOptionsPlugin({
            test: /\.scss$/i,
            options: {
                emitErrors: true
                // postcss: {
                //     plugins: [autoprefixer]
                // }
            }
        })
    ],
    devServer: {
        contentBase: './src',
        stats: 'minimal'
    }
};