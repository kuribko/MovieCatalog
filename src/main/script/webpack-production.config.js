var devConfig = require('./webpack.config.js');

devConfig.externals = {
    'Config': JSON.stringify({
        serverUrl: "",
        env: "PROD"
    })
}

module.exports = devConfig;