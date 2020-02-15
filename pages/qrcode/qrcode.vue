<template>
	<view>
		<view class="content">
			<view class="wxinfo">
				<!-- #ifdef MP-WEIXIN -->   
				<view class="photo">
					<open-data type="userAvatarUrl"></open-data>
				</view>
				<view class="name">
					<open-data type="userNickName"></open-data>
				</view>
				<!-- #endif -->
			</view>
			<!-- <canvas class='canvas' canvas-id='canvas'></canvas> -->
			<image class='canvas' :src="img"></image>
			<view class="card">{{ card }}</view>
		</view>
		<!--自定义tabbar-->
		<!-- <tabbar id="tabbar" :tabbar="tabbar" @showQRcodeEvent="_showQRcodeEvent"></tabbar> -->
	</view>
</template>

<script>
	import QR from "../../utils/wxqrcode.js"
	
	export default {
		data() {
			return {
				card: '',
				img:''
			}
		},
		onLoad() {
			// 隐藏系统tabBar
			// uni.hideTabBar();
			// 绘制新的tabbar
			// app.editTabbar();
			var that = this;
			that.creatQRcode();
		},
		onReady() {
			
		},
		methods: {
			creatQRcode: function() {
				var that = this;
				uni.getStorage({
					key: 'card',
					success: function(res) {
						var card = res.data;
						that.card = card;
						// var qrcode = new QRCode('canvas', {
						// 	text: card,
						// 	width: 260,
						// 	height: 260,
						// 	colorDark: "#000000",
						// 	colorLight: "#ffffff",
						// 	correctLevel: QRCode.CorrectLevel.H,
						// });
						let img = QR.createQrCodeImg(card, {  
						     size: parseInt(300)//二维码大小  
						})
						that.img = img;
						console.log(img)
						//console.log(token);
					},
					fail: function(err) {
						console.log(err);
						that.$util.showToast(err.errMsg, 'none', 3000);
						uni.redirectTo({
							url: '../login/login'
						});
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background: #00a2ed;
	}

	.content {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -60%);
		-webkit-transform: translate(-50%, -60%);
		background-color: #FFFFFF;
		justify-content: center;
		text-align: center;
		border-radius: 20px;
		padding: 18px;
	}

	.wxinfo {
		display: flex;
		justify-content: left;
		align-items: flex-start;
		flex-direction: row;
		padding: 0px 0px 20px 0px;
	}

	.wxinfo .photo {
		width: 50px;
		height: 50px;
		border: 2px solid #fff;
		border-radius: 10px;
	}

	.wxinfo .name {
		font-size: 16px;
		font-weight: 700;
		margin: 10px 0px 0px 10px;
	}

	.canvas {
		width: 260px;
		height: 260px;
	}

	.card {
		margin-top: 20px;
		color: #000;
		font-size: 18px;
	}
</style>
