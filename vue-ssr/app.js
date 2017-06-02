import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import { createRouter } from './router';
import { createStore } from './store';

/**
 * 工厂函数，每次调用创建一个新的apps实例
 * @return {Object} 返回带有app,router,store的对象
 */
export function createApp () {
    // 创建路由和Store实例
    const router = createRouter();
    const store = createStore();
    // 把路由状态同步进Store里面
    sync(store, router);

    const app = new Vue({
        // 注入路由对象
        router,
        // 注入Store对象
        store,
        // 根实例，渲染App组件
        render: h => h(App)
    });

    return { app, router, store };
};
