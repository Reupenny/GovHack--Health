const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
    entry: './src/index.tsx',
    devtool: 'eval-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/' // This ensures assets are served from the root path
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
    rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    targets: { node: 'current' },
                                    modules: false
                                }],
                                '@babel/preset-react',
                                '@babel/preset-typescript'
                            ],
                            plugins: [
                                ['@babel/plugin-transform-runtime', {
                                    regenerator: true,
                                    corejs: 3
                                }]
                            ]
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.REACT_APP_API_URL': JSON.stringify(process.env.REACT_APP_API_URL),
            'process.env.REACT_APP_DHB_API_URL': JSON.stringify(process.env.REACT_APP_DHB_API_URL)
        })
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        port: 8080,
        historyApiFallback: true // Enable client-side routing
    }
};
