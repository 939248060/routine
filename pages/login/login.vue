<template>
	<view>
		<form @submit="formBindsubmit">
			<view class="login pr10 pl10">
				<view class="top">注册 / 登录</view>
				<view class="inputbox">
					<view>
						<view class='rout icon-shouji' size="5"></view>
					</view>
					<input type="number" name="mobile" maxlength="11" @input="mobileInput" placeholder="请输入手机号" />
				</view>
				<view class="inputbox">
					<view>
						<view class='rout icon-ecurityCode' size="5"></view>
					</view>
					<input type="number" name="code" maxlength="4" @input="codeInput" class="codetext" placeholder="请输入验证码" /><button
					 class="codebtn" :disabled="disabled" @click="getCode">{{btnTxt}}</button>
				</view>
				<view class="bot">
					<button style="width: 80%;" formType="submit">注册 / 登录</button>
				</view>
			</view>
		</form>

		<!--过度遮罩-->
		<loading />
	</view>
</template>
<script>
	export default {
		data() {
			return {
				disabled: false,
				btnTxt: '获取验证码',
				currentTime: 61,
				mobile: '',
				code: '',
				sessionId: '',
				host: ''
			}
		},
		methods: {
			// 手机号输入框
			mobileInput: function(e) {
				this.$data.mobile = e.detail.value;
			},
			// 验证码输入框
			codeInput: function(e) {
				this.$data.code = e.detail.value;
			},
			// 获取验证码
			getCode: function(option) {
				let that = this;
				let mobile = that.$data.mobile;
				if (that.$stringUtil.isMobile(mobile) == false) {
					that.$util.showToast('手机号格式错误，请重新输入', 'none', 2000);
					return false;
				}
				that.$util.lockBtn(that);
				that.$showLoading(); // 显示遮罩
				that.$request.post("/getValiCode.do", {
					mobile: mobile
				}).then((res) => {
					if (res.data.status === 0) {
						that.$data.sessionId = res.data.results;
						console.log(that.$data.sessionId);
						that.$util.showToast("验证码已发送", 'none', 3000);
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err, 'none', 5000);
				}).finally(() => {
					that.$hideLoading();
				})
			},
			// 注册/登录事件
			formBindsubmit: function(e) {
				let that = this;
				let mobile = e.detail.value.mobile;
				let code = e.detail.value.code;
				let sessionId = that.$data.sessionId;
				if (that.$stringUtil.isMobile(mobile) == false) {
					that.$util.showToast('手机号格式错误，请重新输入', 'none', 2000);
					return false;
				}
				if (code == "") {
					that.$util.showToast('请输入四位验证码', 'none', 2000);
					return false;
				}
				that.$showLoading();
				that.$request.post("/loginRoutUser.do", {
					mobile,
					code,
					sessionId
				}).then((res) => {
					if (res.data.status === 0) {
						let single = JSON.parse(res.data.results);
						uni.setStorageSync('custToken', single.token);
						uni.setStorageSync('card', single.card);
						uni.switchTab({
							url: '../index/index'
						});
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err.errMsg, 'none', 5000);
				}).finally(() => {
					that.$hideLoading();
				})
			},
		}
	}
</script>

<style>
	page {
		background: #fff;
	}

	.login {
		font-size: 16px;
		box-sizing: border-box;
	}

	.login .top {
		font-size: 30px;
		margin: 30px 0px 70px 10px;
	}

	.login .inputbox {
		line-height: 40px;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		border-bottom: 1px solid #eee;
		align-items: center;
		box-sizing: border-box;
	}

	.login .inputbox>view {
		min-width: 10%;
		vertical-align: middle;
		text-align: center;
	}

	.login .inputbox>input {
		min-width: 80%;
		max-width: 90%;
	}

	.login .inputbox .codetext {
		min-width: 58%;
		max-width: 60%;
	}

	.login .inputbox .codebtn {
		margin: 0px;
		min-width: 25%;
		max-width: 46%;
	}

	.login .bot {
		margin-top: 40px;
	}

	.login .bot>button {
		font-size: 18px;
		border-radius: 6px;
		-webkit-border-radius: 6px;
		color: #fff;
		background-color: #00a2ed;
		margin: auto;
	}
</style>
