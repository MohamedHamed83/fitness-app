const webpack = require("webpack");
const { resolve, join } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ROOT_PATH = resolve(__dirname);
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const localPath = 'http://localhost:3000/';
module.exports = {
    // watch: true,
    // cache: true,

    //where the application will start
    entry: {
        // only- means to only hot reload for successful updates
        main: [
            'webpack/hot/only-dev-server',
            './src/app.js',
        ],
        vendor: ["react", "react-dom"]

    },
    //where the bundle files will go
    output: {
        // the build folder
        path: join(__dirname, "build"),
        //tilling webpack dev server where to serve bundle files from "will be injected in the html"
        publicPath: localPath,
        // the bundle file's inclunding hash for long term caching "name of the entry files"
        filename: "[name].[chunkhash].bundle.js",
        //the name of non-entry chunk files
        chunkFilename: "[name].[chunkhash].bundle.js"
    },
    //devtools options:
    //eval: will have the generated code for the bundle "No sourcemap no devtools faster for build and rebuild"
    //cheap-eval-source-map: remove the webpack bundle code 
    //cheap-source-map: 
    //cheap-module-eval-source-map: Similar to cheap-eval-source-map, however in this case this case loaders are able to process the mapping for better results.
    //cheap-module-source-map: original code not the transpiled  "source map smaller and correct file name and line number provided"
    //eval-source-map: 
    // source-map: produces separate source map file
    devtool: 'cheap-module-source-map',
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
        noInfo: true, //  --no-info option
        //if the inline is false webpack-dev-server will show the application in ifram
        inline: true,
        // //where the files will come from
        contentBase: ROOT_PATH,
        // on which port you are going to run the webpack-dev-server,
        port: 3000,
        host: 'localhost', // Change to '0.0.0.0' for external facing server
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // run webpack only on these files
                // include:<file or directory>
                //don't run webpack on these files
                exclude: /(note_modules)/,
                loaders: [
                    {
                        loader: "babel-loader",
                        query: {
                            presets: ["es2015", "react"]
                        }
                    },
                    {
                        loader: 'eslint-loader',
                        options: {
                            emitError: false,
                            fix: true,                            // // default value
                            formatter: require("eslint/lib/formatters/stylish"),


                            // community formatter
                            formatter: require("eslint-friendly-formatter"),
                        }

                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'images/[name].[ext]'
                }

            }
        ]
    },
    plugins: [
        // Enables Hot Modules Replacement " HMR is a feature to inject updated modules into the active runtime like LiveReload for every module"
        new webpack.HotModuleReplacementPlugin(),

        new webpack.optimize.OccurrenceOrderPlugin(),

        new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks: true
        }),

        //exclude all the common code from modules and bundle them in on file
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.[hash].bundle.js"
        }),
        //creation of HTML files to serve the webpack bundles
        new HtmlWebpackPlugin({
            path: './build',
            template: './index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        // new CopyWebpackPlugin([
        //     {
        //         from: './index.html',
        //         to: '../'
        //     }
        // ]),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
        // // merge multiple entry files into on bundle
        //new CommonsChunkPlugin("admin-commons.js", ["entryfile1", "entryfile2"]),
        // //Limit the maximum chunk count with --optimize-max-chunks 15 
        // new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15})
        // //Limit the minimum chunk size with --optimize-min-chunk-size 10000 
        //new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000})
    ]
}