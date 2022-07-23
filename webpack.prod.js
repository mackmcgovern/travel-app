const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
<<<<<<< HEAD
||||||| parent of c75976d... initial commit
const WorkboxPlugin = require('workbox-webpack-plugin');
=======
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin');
>>>>>>> c75976d... initial commit

module.exports = {
    target: 'node',
    entry: './src/client/index.js',
<<<<<<< HEAD
||||||| parent of c75976d... initial commit
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
=======
    output: {
        libraryTarget: 'var',
        library: 'Client',
        assetModuleFilename: '[name][ext]'
    },
>>>>>>> c75976d... initial commit
    mode: 'production',
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
<<<<<<< HEAD
            }
        ]
||||||| parent of c75976d... initial commit
            },
            {
                test: /\.s[ac]ss$/i,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ],
            },
        ],
=======
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
>>>>>>> c75976d... initial commit
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
<<<<<<< HEAD
        })
    ]
||||||| parent of c75976d... initial commit
        }),
        new WorkboxPlugin.GenerateSW({
            swDest: './dist/sw.js',
            clientsClaim: true,
            skipWaiting: true,
          }),

    ],
=======
        }),
        
        new WorkboxPlugin.GenerateSW({
            swDest: './dist/sw.js',
            clientsClaim: true,
            skipWaiting: true,
          }),
    ],
>>>>>>> c75976d... initial commit
}
