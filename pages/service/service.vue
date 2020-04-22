<template>
	<view class="m15">
		<!-- 联系电话 -->
		<view class="colum p10 bg-white card txtcenter mb25">
			<view class="f18 orange">服务热线</view>
			<view class="mt5 mb10">+ 4007705180</view>
			<view class="telBtn" @click='call'>立即拨打</view>
		</view>
		<!-- 客服微信二维码 -->
		<view class="colum p10 bg-white card txtcenter mb25">
			<view class="f18 orange">客服微信</view>
			<view class="gray-9">扫一扫“二维码名片”，即可添加客服微信。</view>
			<view @longpress="saveImg()">
				<image class="img" src="../../static/images/kefu.png" mode="widthFix" @click="tapPreviewImage" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				host: ''
			}
		},
		methods: {
			// 联系我们
			call: function() {
				var that = this;
				var phone = "4007705180";
				uni.makePhoneCall({
					phoneNumber: phone,
					fail: function(err) { 
						console.log(err);
						that.$util.showToast(err.errMsg, 'none', 3000);
					}
				})
			},
			// 预览图片
			tapPreviewImage: function() {
				let that = this;
				let imgUrl = [];
				imgUrl.push(that.host+"/static/images/kefu.png");
				console.log(imgUrl)
				uni.previewImage({ // 预览图片
					urls: imgUrl // 所有要预览的图片 
				})
			},
		},
		onLoad() {
			let that = this;
			that.host = that.$app.globalData.host;
			// that.host = "http://127.0.0.1:22053/__pageframe__";//测试
		}
	}
</script>

<style>
	page {
		position: fixed;	 /* 固定页面内容不移动 */
	}
	.telBtn {
		width: 70%;
		border-radius: 10px;
		background-color: #FF8800;
		line-height: 2em;
		color: #FFFFFF;
		margin: 0 auto;
		font-size: 18px;
	}
	.img {
		width: 80%;
		pointer-events: auto !important;
	}
</style>
