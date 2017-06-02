import Vue from 'vue';
import Vuex from 'vuex';
import { fetchLists, fetchItem } from './api';

Vue.use(Vuex);

/**
 * Store工厂函数
 * @return {Store} Vuex的Store对象
 */
export function createStore () {
    return new Vuex.Store({
        state: {
            lists: [],
            item: {}
        },
        actions: {
            fetchLists ({ commit }) {
                return fetchLists().then(lists => {
                    commit('setLists', { lists });
                });
            },
            fetchItem ({ commit }, id) {
                return fetchItem(id).then(item => {
                    commit('setItem', { item });
                });
            }
        },
        mutations: {
            setLists (state, { lists }) {
                state.lists = lists;
            },
            setItem (state, { item }) {
                state.item = item;
            }
        }
    });
};

