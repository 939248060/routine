<template>
	<view>
		<view v-show="isShow">
			<view class="vmask"></view>
			<image class="load" src='../../staitc/images/timg1.gif' style="width: 110px; height: 110px"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false
			};
		},
		methods: {
			//隐藏遮罩
			hideMask() {
				this.isShow = false;
			},
			//展示遮罩
			showMask() {
				this.isShow = true;
			}
		}
	}
</script>

<style>
	.vmask {
		position: fixed;
		z-index: 999;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background-color: #000;
		opacity: 0.3;
	}

	.load {
		position: fixed;
		z-index: 1000;
		top: 45%;
		left: 50%;
		border-radius: 20px;
		box-shadow: 0px 0px 10px #666;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}
</style>
