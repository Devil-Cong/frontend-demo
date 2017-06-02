<template>
   <li @click="goToDetail">{{ item.id }} - {{ item.title }}</li>
</template>

<script>
export default {
	name: 'item',
	props: ['item'],
	serverCacheKey (props) {
		return props.item.id;
	},
	methods: {
		goToDetail () {
			this.$router.push('/item/' + this.item.id);	
		}
	}
};
</script>