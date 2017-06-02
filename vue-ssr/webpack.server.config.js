const webpack = require('webpack');
const merge = require('webpack-merge');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
    // 服务端入口文件
    entry: './entry-server.js',
    target: 'node',
    devtool: 'source-map',
    output: {
        libraryTarget: 'commonjs2'
    },
    externals: nodeExternals({
        whitelist: /\.css$/
    }),
    plugins: [
        new webpack.DefinePlugin({
           'process.env': {
               'VUE_ENV': '"server"'
            }
        }),
        new VueSSRServerPlugin()
    ]
});
