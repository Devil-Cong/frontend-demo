const path = require('path');
const express = require('express');
const LRU = require('lru-cache');
const { createBundleRenderer } = require('vue-server-renderer');

const template = require('fs').readFileSync('./index.tpl', 'utf-8');
const serverBundle = require('./static/vue-ssr-server-bundle.json');
const clientManifest = require('./static/vue-ssr-client-manifest.json');

const renderer = createBundleRenderer(serverBundle, {
    cache: LRU({
        max: 10000,
        maxAge: 1000 * 60 * 30
    }),
    runInNewContext: false,
    template,
    clientManifest
});

const server = express();
server.use('/static', express.static(path.join(__dirname, 'static')));

const microCache = LRU({
    max: 100,
    maxAge: 1000 * 60 * 30 // 缓存时间30分钟
});

// 判断页面是否需要缓存的函数
const isCacheable = req => {
    // 这里暂时所有页面都缓存
    return true;
};

server.get('*', (req, res) => {
    const s = new Date();

    const cacheable = isCacheable(req);
    if (cacheable) {
        const hit = microCache.get(req.url);
        if (hit) {
            res.end(hit);
            console.log(`whole request: ${Date.now() - s} ms`);
            return;
        }
    }

    const context = { 
        title: 'Vue-SSR', // 默认标题
        url: req.url 
    };

    renderer.renderToString(context, (err, html) => {
        if (err) {
            if (err.code === 404) {
                res.status(404).end('Page Not Found');
            } else {
                res.status(500).end('Internal Server Error');
                console.log(err.stack);
            }
        } else {
            // 往客户端输出渲染后HTML
            res.end(html);
            console.log(`whole request: ${Date.now() - s} ms`);
            // 如果需要缓存，则保存缓存数据
            if (cacheable) {
                microCache.set(req.url, html);
            }
        }
    });
});

server.listen(8888, function (err) {
    console.log('serve is now running on PORT 8888');
});
