
var webpack = require('webpack');
const SystemBellPlugin = require('system-bell-webpack-plugin');


module.exports = {
    output: {
        filename: 'bundle.js', //[2]
    },
    devServer: { //[3]
        compress: false,
        open: 'chrome',
        stats: 'errors-only',
        overlay: true,
    },
    plugins: [new SystemBellPlugin()], //[1]
};