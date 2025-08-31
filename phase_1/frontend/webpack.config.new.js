const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/index.tsx',
        devtool: isProduction ? 'source-map' : 'eval-source-map',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProduction ? 'bundle.[contenthash].js' : 'bundle.js',
            publicPath: isProduction ? './' : '/',
            clean: true // Clean the dist folder before each build
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
                template: './public/index.html',
                minify: isProduction ? {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                } : false
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(argv.mode),
                'process.env.REACT_APP_API_URL': JSON.stringify(process.env.REACT_APP_API_URL),
                'process.env.REACT_APP_DHB_API_URL': JSON.stringify(process.env.REACT_APP_DHB_API_URL),
                'process.env.REACT_APP_GROQ_API_KEY': JSON.stringify(process.env.REACT_APP_GROQ_API_KEY),
                'process.env.REACT_APP_GEMINI_API_KEY': JSON.stringify(process.env.REACT_APP_GEMINI_API_KEY)

            })
        ],
        devServer: {
            static: path.join(__dirname, 'dist'),
            port: 8080,
            historyApiFallback: true, // Enable client-side routing
            hot: true, // Enable hot module replacement
            compress: true, // Enable gzip compression
            client: {
                overlay: true // Show errors in browser
            }
        },
        performance: {
            hints: isProduction ? 'warning' : false
        },
        optimization: {
            minimize: isProduction,
            splitChunks: isProduction ? {
                chunks: 'all',
                name: false
            } : false
        }
    };
};
