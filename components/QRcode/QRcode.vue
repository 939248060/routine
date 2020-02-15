<template>
	<view v-show="isShow">
	  <!--<view class='wx-mask'></view>-->
	    <canvas class="canvas" canvas-id="qr-code" binderror="canvasIdErrorCallback"></canvas>
	</view>
</template>

<script>
	const QRCode = require("../../utils/weapp-qrcode.js");
	export default {
		data() {
			return {
				isShow: false
			};
		},
		methods:{
			creatQRcode() {
			  uni.getStorage({
				key: 'card',
				success: function (res) {
				  let card = res.data;
				  console.log(card);
				  var qrcode = new QRCode("qr-code", {
					text: card,
					width: 220,
					height: 220,
					colorDark: "#000000",
					colorLight: "#ffffff",
					correctLevel: QRCode.CorrectLevel.H,
				  });
				  var that = this;
				  console.log(qrcode);
				},
				fail: function (err) {
				  console.log(err);
				  util.showToast(err.errMsg, 'none', 3000);
				  wx.redirectTo({ url: '../login/login' });
				}
			  })
			},
			//隐藏二维码
			hideQRcode() {
			  this.setData({
				isShow: !this.$data.isShow
			  })
			},
			//展示二维码
			showQRcode() {
			  this.setData({
				isShow: !this.$data.isShow
			  })
			},
			canvasIdErrorCallback: function () {
			  console.log("什么情况啊");
			}
		}
	}
</script>

<style>

</style>
