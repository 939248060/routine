<template>
	<view>
		<image src="../../static/images/visit_banner.png" mode="widthFix" style="width: 100%;"/>
		<view class="column m15 txtcenter">
			<view class="gray-9 mb15">————<text class="f16 bold mb10 gray-6 ml5 mr5 "> 选择回收类型 </text>————</view>
			<navigator url="../recyclable/recyclable" class="list row">
				<view class="m10"><image src="../../static/images/tu5.png" mode="widthFix" /></view>
				<view class="column txtleft" style="width: 80%;">
					<view class="row jcbetween">
						<text class="f16 bold gray-3 mb5 mt10">可回收物</text>
						<view class="appoint asstart">立即预约</view>
					</view>
					<text class="gray-9">高效便捷，值得信赖的回收品牌</text>
				</view>
			</navigator>
			<view class="list row" @click="toPage('家电回收')">
				<view class="m10"><image src="../../static/images/tu2.png" mode="widthFix" /></view>
				<view class="column txtleft" style="width: 80%;">
					<view class="row jcbetween">
						<text class="f16 bold gray-3 mb5 mt10">家电回收</text>
						<view class="appoint asstart">立即预约</view>
					</view>
					<text class="gray-9">居民线上下单，废旧家电便捷回收</text>
				</view>
			</view>
			<view class="list row" @click="toPage('家具清运')">
				<view class="m10"><image src="../../static/images/tu3.png" mode="widthFix" /></view>
				<view class="column txtleft" style="width: 80%;">
					<view class="row jcbetween">
						<text class="f16 bold gray-3 mb5 mt10">家具清运</text>
						<view class="appoint asstart">立即预约</view>
					</view>
					<text class="gray-9">大件家具上门清运，省心省时省力</text>
				</view>
			</view>
		</view>
		<!--弹出框-->
		<dialogs id='dialog' ref="dialogs" title=' ' content='您还未登录,是否登录？' cancelText='取消' confirmText='确定' @cancelEvent="_cancelEvent"
		 @confirmEvent="_confirmEvent" />
	</view>
</template>

<script>
	import dialogs from "@../../components/dialog/dialog.vue";
	
	export default {
		components:{
			dialogs
		},
		data() {
			return {
				card: '',			//用户卡号，用于判断用户是否登录
			}
		},
		methods: {
			//页面跳转前判断是否登录 
			toPage(num) {
				let that = this;
				if (that.card == '') {	//用户未登录
					that.$refs['dialogs'].showDialog();
				}else {
					if (num == "家电回收") {	//家电回收
						uni.navigateTo({
							url: "../electrical/electrical"
						});
					}else if (num == "家具清运") {	//家具清运
						uni.navigateTo({ 
							url: "../furniture/furniture"
						});
					}
				}
			},
			// 弹出框选确定登录
			_confirmEvent() {
				var that = this;
				uni.redirectTo({
					url: '../login/login'
				});
			},
			// 弹出框选取消隐藏弹出框
			_cancelEvent() {
				this.$refs['dialogs'].hideDialog();
			}
		},
		onLoad() {
			let that = this;
		},
		onShow() {
			let that = this;
			that.card = uni.getStorageSync("card");	//获取用户卡号，用于判断用户是否登录
		}
	}
</script>

<style>
	page {
		position: fixed;	 /* 固定页面内容不移动 */
	}
	.list {
		background: #FFFFFF;
		margin-bottom: 15px;
		border-radius: 10px;
	}
	.list > view:nth-of-type(1) {
		height: 50px;
		width: 50px;
	}
	.list > view > image {
		width: 100%;
	}
	.appoint {
		color: #FFFFFF;
		background: #00A2ED;
		padding: 3px 8px;
		border-radius: 12px 0 12px 0;
		min-width: 52px;
	}
	/* 政府回收和合伙人回收弹出框样式 */
	.dialog {
		position: fixed;
		z-index: 101;
		width: 85%;
		max-width: 300px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
	}
	
	/* 收货地址样式 */
	.address {
		height: 55px;
		vertical-align: middle;
		border: 2px dashed #ccc;
		text-align: left;
	}
	
	.address>view:nth-child(1) {
		width: 14%;
	}
	
	.address>view:nth-child(2) {
		width: 76%;
	}
	
	.address>view:nth-child(3) {
		width: 10%;
	}
</style>
