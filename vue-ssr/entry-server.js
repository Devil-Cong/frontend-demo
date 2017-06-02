import { createApp }  from './app';

export default context => {
    /**
     * 这里可能会存在异步的路由钩子或者组件
     * 所以返回一个Promise，等到服务端所有工作都准备好再返回
     */
     return new Promise((resolve, reject) => {
        // 获取全新的app,router,store
        const { app, router, store } = createApp();

        // 设置服务端路由为当前状态(与客户端需要的一致)
        router.push(context.url);

        // 等待路由去执行可能存在的异步路由钩子或者组件
        router.onReady(() => {
            // 返回目标位置或是当前路由匹配的组件数组
            const matchedComponents = router.getMatchedComponents();
            // 如果没有匹配到对应的路由，就返回404
            if (!matchedComponents) {
                reject({ code: 404 });
            }

            Promise.all(matchedComponents.map(Component => {
                if (Component.asyncData) {
                    return Component.asyncData({
                        store,
                        route: router.currentRoute
                    });
                }
            })).then(() => {
                // 当所有的数据预处理钩子都处理完成，所有的状态都存放在Store里面
                // 当传递到客户端的时候，该状态会自动保存到window.__INITIAL_STATE__里面去
                context.state = store.state;

                // 预处理完所有的数据后，即可渲染
                resolve(app);
            }).catch(reject);

        }, reject);
    });
};
