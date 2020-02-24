<template>
	<view>
		<view style="background: #009999;" class="pb20">
			<view class="m10">
				<image :src="host+'/images/routine/logo.png'" mode="widthFix" style="width: 30%" />
			</view>
			<view class="txtcenter mt20">
				<image :src="host+'/images/routine/invite2.png'" mode="widthFix" style="width: 60%" />
			</view>
		</view>
		<view class="txtcenter" style="background: #e8efc8;">
			<image :src="host+'/images/routine/invite3.jpg'" mode="widthFix" class="mb10" style="width: 100%" />
			<image :src="host+'/images/routine/invite4.png'" mode="widthFix" class="mt10" style="width: 40%" />
		</view>
		<view class="column pt20 pb20" style=" background: #e8efc8;">
			<view class="row jcleft aicenter bg-white black pt5 pb10 pl10 pr10 f15 radius8" style="margin:0 auto; width: 85%">
				<image :src="host+'/images/routine/invite_1.png'" mode="widthFix" class="mt10" style="width: 35%" />
				<view class="ml10">1. 将分类打包好的回收物放在称重台上</view>
			</view>
			<view class="arrow" style="margin: 10px auto 0px auto;" />
			<view class="row jcleft aicenter bg-white black pt5 pb10 pl10 pr10 f15 radius8" style="margin:0 auto; width: 85%">
				<image :src="host+'/images/routine/invite_2.png'" mode="widthFix" class="mt10" style="width: 35%" />
				<view class="ml10">2. 出示您的量心二维码</view>
			</view>
			<view class="arrow" style="margin: 10px auto 0px auto;" />
			<view class="row jcleft aicenter bg-white black pt5 pb10 pl10 pr10 f15 radius8" style="margin:0 auto; width: 85%">
				<image :src="host+'/images/routine/invite_3.png'" mode="widthFix" class="mt10" style="width: 35%" />
				<view class="ml10">3. 确认回收品种和价格</view>
			</view>
			<view class="arrow" style="margin: 10px auto 0px auto;" />
			<view class="row jcleft aicenter bg-white black pt5 pb10 pl10 pr10 f15 radius8" style="margin:0 auto; width: 85%">
				<image :src="host+'/images/routine/invite_4.png'" mode="widthFix" class="mt10" style="width: 35%" />
				<view class="ml10">4. 将小票贴到可回收物上并投入箱内</view>
			</view>
			<view class="p20 bg-white f16 radius8" style="width: 75%; margin: 20px auto;">
				<view>新用户注册</view>
				<form @submit="sendForm">
					<view class="row jcleft aicenter bordbox btmccc panel mt20 pt5 pb5">
						<view class="rout icon-shouji overhide f20" />
						<input type="number" name="mobile" maxlength="11" @input="inputMobile" placeholder="请输入手机号" />
					</view>
					<view class="row jcbetween aicenter bordbox btmccc panel pt5 pb5">
						<view class="rout icon-ecurityCode f20" />
						<input type="number" name="code" maxlength="4" placeholder="请输入验证码" />
						<button class="bg-blue1 white f14" :disabled="btnDid" @click="tapGetCode">{{btntxt}}</button>
					</view>
					<button class="bg-blue1 white mt20" style="width: 80%;" formType="submit">注 册</button>
				</form>
			</view>
			<navigator url="../login/login" class="txtcenter f15">老用户登录</navigator>
		</view>

		<!--过度遮罩-->
		<loading id='loading' />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				host: '',
				btnDid: false,
				btntxt: "获取验证码",
				currentTime: 61, // 获取验证码按钮锁定时间
				mobile: '', // 用户手机号
				sessionId: '' // 服务器回传sessionid
			}
		},
		methods: {
			// 手机号框输入事件
			inputMobile: function(e) {
				let that = this;
				that.mobile = e.detail.value;
			},
			// 获取验证码按钮锁定事件
			lockBtn: function() {
				let that = this;
				let currentTime = that.currentTime; // 设置封锁时间
				//var timer = null;
				that.btnDid = true;
				let timer = setInterval(function() {
					currentTime--;
					that.btnTxt = currentTime + ' s';
					if (currentTime <= 0) {
						clearInterval(timer);
						that.btnDid = false;
						that.currentTime = 61;
						that.btnTxt = '获取验证码';
					}
				}, 1000);
			},
			// 获取验证码
			tapGetCode: function(option) {
				let that = this;
				let mobile = that.mobile;
				if (that.$stringUtil.isMobile(mobile) == false) {
					that.$util.showToast('手机号格式错误，请重新输入', 'none', 2000);
					return false;
				}
				that.$showLoading();     //显示遮罩
				that.$request.post("/getValiCode.do", {
					mobile: mobile
				}).then((res) => {
					if (res.data.status === 0) {
						that.lockBtn();
						that.sessionId = res.data.results;
						that.$util.showToast("验证码已发送", 'none', 3000);
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err, 'none', 5000);
				}).finally(()=>{
					that.$hideLoading(); //隐藏遮罩
				})
			},
			// 提交表单
			sendForm: function(e) {
				let that = this;
				let mobile = e.detail.value.mobile;
				let code = e.detail.value.code;
				let token = that.token;
				let sessionId = that.sessionId;
				if (that.$stringUtil.isMobile(mobile) == false) {
					that.$util.showToast('手机号格式错误，请重新输入', 'none', 2000);
					return false;
				}
				if (that.$stringUtil.isEmpty(sessionId)) {
					that.$util.showToast('请获取验证码', 'none', 2000);
					return false;
				}
				if (that.$stringUtil.isEmpty(code) || code.length < 4) {
					util.showToast('请输入四位验证码', 'none', 2000);
					return false;
				}
				that.$showLoading();    //显示遮罩
				that.$request.post("/registerRoutUser.do", {
					mobile,
					code,
					token,
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
					that.$util.showToast(err, 'none', 5000);
				}).finally(() => {
					that.$hideLoading();   //隐藏遮罩
				})
			}
		},
		onLoad(options) {
			let that = this;
			let token = "";
			if (that.$stringUtil.isNotEmpty(options.token)) {
				token = options.token;
			}
			console.log("token=" + token);
			that.token = token;
			that.host = that.$app.globalData.host;
		},
		onShow() {
			let that = this;
			let token = uni.getStorageSync("custToken");
			console.log(token);
			if (that.$stringUtil.isNotEmpty(token)) {
				uni.switchTab({
					url: '../index/index'
				});
			}
		}
	}
</script>

<style>
	/* 箭头 */
	.arrow {
		width: 0;
		height: 0;
		border-width: 10px;
		border-style: solid;
		border-color: #009999 transparent transparent transparent;
	}

	.login {
		font-size: 16px;
		box-sizing: border-box;
	}

	.login .top {
		font-size: 30px;
		margin: 30px 0px 70px 10px;
	}

	.inputbox {
		box-sizing: border-box;
	}

	.login .inputbox>view {
		min-width: 10%;
		vertical-align: middle;
		text-align: center;
	}

	.login .inputbox>input {
		min-width: 88%;
		max-width: 90%;
	}

	.login .inputbox .codetext {
		min-width: 58%;
		max-width: 60%;
	}

	.login .inputbox .codebtn {
		margin: 0px;
		min-width: 30%;
		max-width: 46%;
	}

	.panel>view {
		width: 10%
	}

	.panel>input {
		width: 50%;
	}

	.panel>button {
		width: 40%;
	}

	.login .bot {
		margin-top: 40px;
	}

	.login .bot>button {
		font-size: 18px;
		border-radius: 6px;
		-webkit-border-radius: 6px;
		color: #fff;
		background-color: #00a2ed
	}
</style>
