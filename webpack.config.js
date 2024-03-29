/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, './docs'),
        filename: 'index.js',
        /*Switch the following 2 lines to run the project localy*/
        publicPath: '/docs/'
        // publicPath: '/'
    },
    resolve: {
        extensions: [ '.js', '.ts', '.tsx' ],
        alias: { '@material-ui/core': '@material-ui/core/es' }
    },
    devServer: {
        port: 8080,
        /*Switch the following 2 lines to run the project localy*/
        historyApiFallback: {
            rewrites: [ { from: /\//, to: '/404.html' } ],
        },
        // historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                exclude: [ /node_modules/ ],
                use: [
                    { loader:'ts-loader' }
                ]
            },
            {
                test: /\.(png|jpe?g)$/,
                use: [
                    { loader: 'url-loader' }
                ]
            },
            {
                test: /\.mp3$/,
                use: [
                    { loader: 'url-loader' }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'head',
            scriptLoading: 'defer'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/style.css', to: './' },
            ]
        }),
        new HotModuleReplacementPlugin()
    ]
};
