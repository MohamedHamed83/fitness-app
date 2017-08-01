const webpack = require("webpack");
const path = require("path");

module.exports = {
    //where the application will start
    entry:['./dist/app.js'],
    //where the bundle files will go
    output: {
        // the build folder
        path: path.resolve(__dirname, 'build'),
        // the bundle file's
        filename: 'bundle.js'
    },
    // webpack dev server configration
    devServer:{
        //if the inline is false webpack-dev-server will show the application in ifram
        inline:true,
        // //where the files will come from
        contentBase: path.join(__dirname, "build"),
        // on which port you are going to run the webpack-dev-server,
        port:3000
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
    }
}