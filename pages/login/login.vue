<template>
	<view>
		<form @submit="formBindsubmit">
			<!-- css3 波浪效果 -->
			<view class="wave" >
				<view class="waveInner" />
				<view class="waveInner" /> 
				<view class="waveInner" />
			</view>
			<view class="login">
				<view class="column aicenter">
					<view class="logo mt15 bg-white">
						<image src="../../static/images/logo_1.png" />
					</view>
					<text class="f14 mt10 white">量心回收</text> 
				</view>
				<view class="column lh40 pr10 pl10" style="margin-top: 120px;">
					<view class="inputbox row wrap aicenter btmeee"> 
						<view class='rout icon-mobilefill blue1' size="5" />
						<input type="number" name="mobile" maxlength="11" @input="mobileInput" placeholder="请输入手机号" />
					</view>
					<view class="inputbox row wrap aicenter btmeee">
						<view class='rout icon-ecurityCode blue1' size="5" />
						<input type="number" name="code" maxlength="4" @input="codeInput" class="codetext" placeholder="请输入验证码" />
						<text class="codebtn blue1" @click="getCode">{{btnTxt}}</text>
					</view>
				</view>
				<view class="bot">
					<button formType="submit">注册 / 登录</button>
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
				btnTxt: '获取验证码',
				currentTime: 61,		//验证码倒计时
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
				console.log()
				if (that.btnTxt != "获取验证码") {
					that.$util.showToast('请勿重复点击', 'none', 1000);
					return false;
				}
				that.lockBtn();	//切换获取验证码文本btnTxt
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
			// 验证码按钮锁定
			lockBtn() {
				let that = this;
			  // 设置封锁时间
			  let currentTime = that.currentTime;
			  let timer = null;
			  timer = setInterval(function () {
			    currentTime--;
			    that.btnTxt = currentTime+'s后重新获取';
			    if (currentTime <= 0) {
			       clearInterval(timer);
			       that.currentTime = 61,
			       that.btnTxt = '获取验证码'
			    }
			  }, 1000);
			}
		}
	}
</script>

<style>
	page {
		background: linear-gradient(#00a2ed, #00a2ed 1px, #fff 260px, #fff);
		position: fixed;
	}
	.login {
		position: relative;
	}
	.login .logo {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: 4px solid rgba(255, 255, 255, 0.4);
		overflow: hidden;
	}
	.logo > image {
		width: 40px;
		height: 40px;
		border: 5px solid #fff;
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
		width: 70%;
		line-height: 2em;
		border-radius: 20px;
		-webkit-border-radius: 20px;
		color: #fff;
		background-color: #00a2ed;
		margin: auto;
	}
	/* 波浪动画 */
	.wave {
		height: 30px;
		align-items: center;
		overflow: hidden;
	}
	.waveInner {
		position: absolute;
		min-width: 470vw;
		min-height: 300vh;
		background: #fff;
		top: 53%;
		left: 50%;
		animation: roateOne 10s linear infinite;
	}
	.waveInner:nth-of-type(1) {
		opacity: 0.7;
		border-radius: 50%;
	}
	.waveInner:nth-of-type(2) {
		opacity: 0.5;
		border-radius: 45%;
	}
	.waveInner:nth-of-type(3) {
		opacity: 0.4;
		border-radius: 47%;
	}
	@keyframes roateOne {
		0% {
			transform: translate(-50%, 0) rotateZ(0deg);
		}
		50% {
			transform: translate(-50%, -2%) rotateZ(180deg);
		}
		100% {
			transform: translate(-50%, 0%) rotateZ(360deg);
		}
	}
</style>
