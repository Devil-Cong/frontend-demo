const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: '#cheap-module-eval-source-map',
    output: {
        path: path.resolve(__dirname, 'static'),
        filename: '[name].js',
        chunkFilename: '[id].[chunkhash].js',
        publicPath: '/static/'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    // 把.vue文件里面的样式单独抽离出来
                    extractCSS: true
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'common.[chunkhash].css' 
        })
    ]
};
