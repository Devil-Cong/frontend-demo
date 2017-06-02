const getTitle = function (vm) {
	const { title }	= vm.$options;
	if (title) {
		return typeof title === 'function' ? title.call(vm) : title;
	}
};

// 服务端标题Mixin
const serverTitleMixin = {
	created () {
		const title = getTitle(this);
		if (title) {
			this.$ssrContext.title = title;
		}
	}
};

// 客户端标题Mixin
const clientTitleMixin = {
	mounted () {
		const title = getTitle(this);
		if (title) {
			document.title = title;
		}
	}
};

// 分环境导出不同的Mixin
export default process.env.VUE_ENV  === 'server' ? serverTitleMixin : clientTitleMixin;