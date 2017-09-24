const webpack = require('webpack')
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: 'src/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'index.bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  devServer: {
    hot: true, 
    contentBase: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  module: {
        rules: [
            {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: 'babel-loader'
            },
            {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader']
            },
            {
            test: /\.(sass|scss)$/,
            use: [
                'style-loader',
                'css-loader',
                {
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    plugins: () => [
                    autoprefixer({
                        browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9'
                        ]
                    }),
                    ],
                }
                },
                'sass-loader'
            ]
            }
        ]
  },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        HtmlWebpackPluginConfig
    ]
}