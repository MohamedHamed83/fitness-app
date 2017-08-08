const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const { resolve, join } = require('path');

module.exports = {
    //where the application will start
    entry: {
        // only- means to only hot reload for successful updates
        main: [
            'webpack/hot/only-dev-server',
            '../src/app.js',
        ],
        vendor: ['react', 'react-dom']

    },
    //where the bundle files will go
    output: {
        path: resolve(__dirname, './build'),// Path of output file
        publicPath: './',// the bundle file's
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].[hash].js'
        //tilling webpacl dev server where to serve bundle files from
        // publicPath: '/build/'
    },
    //devtools options:
    //eval: will have the generated code for the bundle "No sourcemap no devtools faster for build and rebuild"
    //cheap-eval-source-map: remove the webpack bundle code
    //cheap-source-map:
    //cheap-module-eval-source-map: Similar to cheap-eval-source-map, however in this case this case loaders are able to process the mapping for better results.
    //cheap-module-source-map: original code not the transpiled  "source map smaller and correct file name and line number provided"
    //eval-source-map:
    // source-map: produces separate source map file
    devtool: 'source-map',
    // webpack dev server configration
    devServer: {
        stats: {
            cached: true,
            cachedAssets: true,
            chunks: true,
            chunkModules: false,
            colors: true,
            hash: false,
            reasons: true,
            timings: true,
            version: false
        },
        historyApiFallback: true,
        // //where the files will come from
        contentBase: join(__dirname, 'build'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // run webpack only on these files
                // include:<file or directory>
                //don't run webpack on these files
                exclude: /(note_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'images/[name].[ext]'
                }

            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            }
        ]

    },
    plugins: [
        // //deleting the build folder before a fresh build
        new CleanWebpackPlugin(['build']),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/vendor.[hash].bundle.js'
        }),
        new ProgressPlugin(),
        new HtmlWebpackPlugin({
            path: './build',
            template: './index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new webpack.NoErrorsPlugin(),
        // Minify the bundle
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                dead_code: true,
                screw_ie8: true,
                unused: true,
                warnings: false
            },
            mangle: {
                screw_ie8: true
            }
        })
    ]
};
