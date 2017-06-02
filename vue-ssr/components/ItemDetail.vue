<template>
    <ul>
        <li>id: {{ item.id }}</li>
        <li>title: {{ item.title }}</li>
        <li>price: {{ item.price }}</li>
        <li>inventory: {{ item.inventory }}</li>
    </ul>
</template>

<script>
import titleMixin from '../title-mixin';
export default {
    mixins: [titleMixin],
    title () {
        return this.item.title;
    },
    asyncData ({ store, route }) {
        return store.dispatch('fetchItem', route.params.id);
    },
    computed: {
        item () {
            return this.$store.state.item;
        }
    }
};
</script>
