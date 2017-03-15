var path = require("path");

var DIST_DIR = path.resolve(__dirname, "../resources/static");
var SRC_DIR = path.resolve(__dirname, "src");


var config = {
    entry: SRC_DIR + "/app/index.js",
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/app"
    },
    externals: {
        'Config': JSON.stringify({
            args: process.argv,
            serverUrl: "http://localhost:8080",
            env: "DEV"
        })
    },
    module: {
        loaders: [
            {
                test: /\.js?/,
                include: SRC_DIR,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-2"]
                }
            }
        ]
    }
}

module.exports = config;