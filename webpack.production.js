const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
   output: {
      filename: 'bundle.prod.js' //[1]
   },
    plugins: [new CleanWebpackPlugin()], //[2]
};