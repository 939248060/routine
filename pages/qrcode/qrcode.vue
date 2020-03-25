<template>
	<view>
		<view class="content bg-white txtcenter jccenter">
			<view class="wxinfo row aicenter jccenter txtleft">
				<!-- #ifdef MP-WEIXIN -->   
				<view class="photo mt20">
					<open-data type="userAvatarUrl" />
				</view>
				<view>
					<view class="f16 bold mt20 ml10">
						<open-data type="userNickName" />
					</view>
					<view class="ml10 gray-9 f14">{{ card }}</view>
				</view>
				<!-- #endif -->
			</view>
			<!-- <canvas class='canvas' canvas-id='canvas'></canvas> -->
			<view class="ts f14 txtcenter blue1">请将二维码对准扫描处</view>
			<image class="canvas" :src="img" />
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
		top: 55%;
		left: 50%;
		transform: translate(-50%, -60%);
		-webkit-transform: translate(-50%, -60%);
		background-image: radial-gradient(circle at -6px 100px, #00a2ed, #00a2ed 19px, transparent 20px ),
											radial-gradient(circle at 286px 100px, #00a2ed, #00a2ed 19px, transparent 20px );
	}

	.wxinfo > .photo {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: 2px solid #fff;
		overflow: hidden;
	}

	.canvas {
		width: 200px;
		height: 200px;
		margin: 20px 40px;
	}
	
	.ts {
		border: 1px solid #00a2ed;
		border-radius: 15px;
		padding: 5px 10px;
		margin: 30px 50px 0px;
	}
</style>
