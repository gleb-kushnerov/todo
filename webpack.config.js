const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const SRC_DIR = 'src';
const DIST_DIR = 'dist';

module.exports = {
    context: path.resolve(__dirname, SRC_DIR),
    entry: {
        app: './app.js'
    },
    output: {
        path: path.resolve(__dirname, DIST_DIR),
        filename: '[name].[hash].js'
    },
    resolve: {
        extensions: ['.js']
    },
    mode: 'development',
    devServer: {
        contentBase: DIST_DIR,
        compress: true,
        port: 9000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(path.resolve(__dirname, DIST_DIR))
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
};
