const webpack           = require("webpack");
const path              = require("path");
const env               = process.env.NODE_ENV;

const reactExternal = {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react'
};

const config = {
    entry: [
        path.resolve("index.js")
    ],

    externals: {
        'react': reactExternal
    },

    output: {
        path: path.resolve("dist"),
        filename: "rxjs-react.js",
        library: 'rxjs-react',
        libraryTarget: 'umd'
    },

    resolve: {
        extensions: ["", ".js"]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        })
    ],

    module: {
        loaders: [
            { test: /\.js?$/, exclude: /node_modules/, loader: "babel" }
        ]
    }
};

module.exports = config;
