import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/**
 * 路由工厂函数
 * @return {VueRouter} 返回vue-router对象
 */
export function createRouter () {
    return new Router({
        mode: 'history',
        routes: [
            { path: '/', component: () => import('./components/Home.vue') },
            { path: '/lists', component: () => import('./components/Lists.vue') },
            { path: '/item/:id', component: () => import('./components/ItemDetail.vue') }
        ]
    });
};
