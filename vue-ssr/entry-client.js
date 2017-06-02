import { createApp } from './app';

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}

// 当路由准备好后，挂在实例到id="app"的元素上
router.onReady(() => {

    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to);
        const prevMatched = router.getMatchedComponents(from);

        // 这段逻辑不明白为什么
        let diffed = false;
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c));
        });
        if (!activated.length) {
            return next();
        }

        // 如有需要，这里可以弹出Loading

        Promise.all(activated.map(c => {
            if (c.asyncData) {
                return c.asyncData({ store, route: to });
            }
        })).then(() => {
            // 停止Loading
            next();
        }).catch(next);
    });

    app.$mount('#app');
});
