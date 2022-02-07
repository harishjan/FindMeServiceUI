/*const { merge } = require('webpack-merge'); //[1]

const commonConfig = require('./webpack.common'); //[2]
module.exports = (env) => {
    const config = require('./webpack.' + 'development'); //[3]
    return merge(commonConfig, config); //[4]
};*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssPlugin = require("mini-css-extract-plugin")
const webpack = require("webpack")
let mode = 'development'
if(process.env.NODE_ENV === 'production')
    mode = 'production'
    
module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path:path.resolve(__dirname, "dist"),
    publicPath:"/"
  }, 
  module: {
    rules: [
      {
        test: /\.?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
          test: /\.s?css$/i,
          use: [MiniCssPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ['file-loader'],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
    new MiniCssPlugin() ,
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") })
  ],
  devtool:"source-map",
  devServer:{
    liveReload: true,
    hot:true,
    historyApiFallback: true,
   
  },
  mode: mode
}
