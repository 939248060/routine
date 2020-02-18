<template>
	<view>
		<view class="authPage">
			<view>
				<image class="image" src="../../static/images/logo.png"></image>
				<view class='txt'>需要您的授权才能使用哦！</view>
				<button class="btn" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">立即授权</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			//
			bindGetUserInfo: function(e) {
				let that = this;
				that.$showLoading();    //显示遮罩
				that.$util.login().then((res) => {
					let code = res.code;
					if (that.$stringUtil.isEmpty(code)) {
						util.showToast("未能获取code");
						return false;
					}
					that.$util.getUserInfo().then((res) => {
						// console.log(res);
						let data = {
							code,
							encryptedData: res.encryptedData,
							iv: res.iv
						};
						that.$request.postToken("/customer/user/getRoutineOpenId.do", data).then((res) => {
							if (res.data.status === 0) {
								that.$util.showToast(res.data.results, "none", 3000);
								let pages = getCurrentPages(); // 获取当前页面的页帧
								if (pages.length > 1) {
									let prePage = pages[pages.length - 2];
									prePage.onShow();
									setTimeout(function() {
										uni.navigateBack({
											delta: 1
										});
									}, 2500);
								}
							} else {
								that.$util.showToast(res.data.results, "none", 5000);
							}
						}).catch((err) => {
							console.log(err);
							that.$util.showToast(err.errMsg, "none", 5000);
						})
					}).catch((err) => {
						console.log(err);
						that.$util.showToast(err.errMsg, "none", 5000);
					})
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err.errMsg, "none", 5000);
				}).finally(() => {
					that.$showLoading();
				})
			}
		},
		onLoad() {
			let that = this;
			that.host = that.$app.globalData.host;
		}
	}
</script>

<style>
	page {
		background: #fff;
	}

	.authPage {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 100%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		text-align: center;
	}

	.authPage>view .image {
		width: 200px;
		height: 200px;
	}

	.authPage>view .txt {
		margin-top: 100px;
	}

	.authPage>view .btn {
		margin-top: 50px;
		width: 70%;
		color: #fff;
		background: #00a2ed;
	}
</style>
