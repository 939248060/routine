<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		methods: {
			
		},
		onLoad(options) {
			let that = this;
			let ran = Math.random().toString(36).substr(2,15);
			if (that.$stringUtil.isNotEmpty(options.nav)) {
			  that.url = that.$app.globalData.host + '/html/' + options.nav + '.html?ver=' + ran
			}
		}
	}
</script>

<style>

</style>
