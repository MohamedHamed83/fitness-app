const webpack = require("webpack");
const { resolve, join } = require("path");

module.exports = {
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
        path: resolve(__dirname, 'build'), // Path of output file
        // the bundle file's
        filename: '[name].bundle.js',
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
        inline: true,
        hot: true, // Live-reload
        //if the inline is false webpack-dev-server will show the application in ifram
        inline: true,
        // //where the files will come from
        contentBase: join(__dirname, "build"),
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
                loader: "babel-loader",
                query: {
                    presets: ["es2015", "react"]
                }
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?Limit=10000'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.bundle.js"
        }),
        // Minify the bundle
        new webpack.optimize.UglifyJsPlugin({
            mininize:true
        })
    ]
}