const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    target: 'node',
    entry: './src/client/index.js',
    output: {
        libraryTarget: 'var',
        library: 'Client',
        assetModuleFilename: '[name][ext]'
    },
    mode: 'production',
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.s[ac]ss$/i,
                use: [ 
                    {
                      loader: MiniCssExtractPlugin.loader,
                      options: { publicPath: "" }
                    },
                     'css-loader', 'sass-loader' ],
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',  
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        
        new WorkboxPlugin.GenerateSW({
            swDest: './dist/sw.js',
            clientsClaim: true,
            skipWaiting: true,
          }),
    ],
}
