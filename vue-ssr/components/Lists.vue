<template>
    <ul>
        <item 
            v-for="(item, key) in lists"
            :key="key"
            :item="item">
        </item>
    </ul>
</template>

<script>
import Item from './Item.vue';
export default {
    components: {
        Item
    },
    asyncData ({ store, route }) {
        return store.dispatch('fetchLists');
    },
    computed: {
        lists () {
            return this.$store.state.lists;
        }
    }
};
</script>
