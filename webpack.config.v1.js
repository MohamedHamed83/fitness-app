var webpack = require("webpack");
var path = require("path");

module.exports = {
    //where the application will start
    entry:{
        about:"./src/about.js",
        contact:"./src/contact.js",
        vendor:["react","react-dom"]
    },
    //where the bundle files will go
    output: {
        // the build folder
        path: path.resolve(__dirname, 'build'),
        // the bundle file's
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                //don't run webpack on these files
                exclude: /(note_modules)/,
                // //run webpack only on these files
                // include:
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
                loader:'url-loader?Limit=20000'
            }
        ]
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name:"vendor",
            filename:"vendor.bundle.js"
        })
    ]
}