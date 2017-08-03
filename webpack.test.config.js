const webpack = require('webpack');
const { resolve, join } = require('path');

module.exports = {
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'null-loader'
        },
        {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'null-loader'
        }, {
            test: /\.html$/,
            loader: 'raw-loader'
        },
        {
            test: /\.json$/,
            loader: 'json-loader',
            exclude: [join(__dirname, 'src/index.html')]
        },
        {
            enforce: 'pre',
            test: /\.js$/,
            loader: 'source-map-loader',
            exclude: [
                // these packages have problems with their sourcemaps
                // join(__dirname,'node_modules/rxjs'),
            ]
        },
        {
            enforce: 'post',
            test: /\.(js)$/,
            loader: 'istanbul-instrumenter-loader',
            include: resolve(__dirname, './src'),
            exclude: [/\.spec\.js$/, /\.e2e\.js$/, /node_modules/]
        }
        ]
    },
    plugins: [
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