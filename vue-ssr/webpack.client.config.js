const webpack = require('webpack');
const merge =  require('webpack-merge');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
    entry: './entry-client.js',
    plugins: [
        new webpack.DefinePlugin({
           'process.env': {
               'VUE_ENV': '"client"'
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        new VueSSRClientPlugin()
    ]
});
