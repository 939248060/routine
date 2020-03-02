<template>
	<view>
		<form @submit="formBindsubmit">
			<view>
				<view class="bg-blue1 white">
					<view class="txtcenter pt20 pb20">
						<view>零钱余额</view>
						<view class="f40 pt10">{{customer.cash}}</view>
					</view>
					<view class="viewRow jcbetween aicenter">
						<view class="viewRow jcleft aicenter f24 pt5 pl5">
							<text class="f20">￥</text>
							<input type="number" name="cash" class="pl5 bodbox cash" placeholder-class="white" cursor='white' :value="(cash>0)?cash:''"
							 @input='cashInput' placeholder="请输入提现金额" />
						</view>
						<view class="f16 pr10" @click='exchAll'>最大额度</view>
					</view>
				</view>
				<view class="bg-white pr15 pl15 f16 mt10">
					<view class="f12 red">{{showTxt}}</view>
					<view class="pt15 pb10 f16 bold">请选择到账方式</view>
					<radio-group name="type">
						<view v-if="customer.routOpenId!=null&&customer.routOpenId!=''" class="viewRow jcbetween aicenter pt10 pb10 bordbtmeee">
							<view>
								<view class="viewRow jcleft aicenter mb5">
									<icon class="rout icon-weixin mr10 green f26"></icon>微信零钱
								</view>
								<view class="viewRow jcleft aicenter">
									<image class="photo mr10" :src="customer.avatarUrl" />{{customer.nickName}}
								</view>
							</view>
							<view class="txtright">
								<radio color="#00a2ed" checked='true' value="wechat"></radio>
							</view>
						</view>
						<view v-else class="viewRow withdraw jcleft aicenter pt10 pb10 bordbtmeee">
							<view>
								<icon class="rout icon-weixin green f26"></icon>
							</view>
							<view class="viewRow jcleft aicenter">微信零钱</view>
							<navigator url='../getuserinfo/getuserinfo' class="txtright blue">绑定</navigator>
						</view>
						<!--
		        <view wx:if="{{cust.CardNumber!=null&&cust.CardNumber!=''}}" class="viewRow withdraw jcleft aicenter pt10 pb15">
		          <view><icon class="rout icon-yinhangka purple f26"></icon></view>
		          <view>储蓄卡 - {{cust.BankName}}{{cust.CardNumber}}</view>
		          <view class="txtright"><radio color="#00a2ed" value="bankcard"></radio></view>
		        </view>
		        <view wx:else class="viewRow withdraw jcleft aicenter pt10 pb15 bordbtmeee" style=''>
		          <view><icon class="rout icon-yinhangka purple f26"></icon></view>
		          <view>储蓄卡</view>
		          <navigator class="txtright blue" url='../bankCard/bankCard'>添加</navigator>
		        </view>
		        -->
					</radio-group>
				</view>
				<view class="viewCol aicenter jccenter txtcenter pt15">
					<button class="btn f18 mb10" v-show="btnHid" :class="btnDisd ? '' : 'bg-blue1 white'" :disabled="btnDisd" formType="submit">确认提现</button>
					<navigator class="btn white bg-blue1 f18 mb10 pt10 pb10" v-show="linkHid" url='../realname/realname'>实名认证</navigator>
					<navigator class="btn blue1 bg-white f18 pt10 pb10" url='../cashlist/cashlist'>零钱明细</navigator>
				</view>
				<view>


				</view>
			</view>
			<view>

			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				host: '',
				cash: 0, // 提取金额
				takeWechat: 0,
				btnHid: true, // 提现按钮是否隐藏
				btnDisd: false, // 提现按钮是否可点击
				linkHid: false, // 
				showTxt: "",
				btntxt: '确认提现',
				customer: {}
			}
		},
		methods: {
			// 最大额度
			exchAll: function(e) {
				let that = this;
				let cash1 = that.customer.cash * 100 / 1000;
				// 将余额转为整型
				that.cash = parseInt(parseInt(that.customer.cash) / 10) * 10;
				that.showTxt = "提现金额必须是10元的倍数";

			},
			// 兑换现金输入 
			cashInput: function(e) {
				let that = this;
				let cash1 = e.detail.value;
				let maxCash = parseInt(parseInt(that.customer.cash) / 10) * 10
				let cash2 = 0;
				if (cash1 >= maxCash || that.$stringUtil.indexOf(cash1, ".") > 0) {
					cash2 = maxCash;
				} else if (that.$stringUtil.indexOf(cash1, "0") == 0) {
					cash2 = cash1.substring(1);
				} else {
					cash2 = cash1;
				}
				//console.log(cash2);
				that.cash = cash2;
			},
			// 获取用户相关信息
			getCustInfo: function() {
				let that = this;
				that.$showLoading()
				that.$request.postToken("/users/customer/findInfo.do", null).then((res) => {
					if (res.data.status === 0) {
						that.customer = JSON.parse(res.data.results);
						if (that.customer.isCheck == '1') {
							that.btnHid = true;
							that.linkHid = false;
						} else {
							that.btnHid = false;
							that.linkHid = true;
						}
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err, 'none', 5000);
				}).finally(() => {
					that.$hideLoading()
				})

				// wx.showLoading({
				// 	title: '加载中...'
				// });
				// let that = this;
				// let token = wx.getStorageSync("custToken");
				// if (stringUtil.isEmpty(token)) {
				// 	wx.redirectTo({
				// 		url: '../login/login'
				// 	});
				// }
				// wx.request({
				// 	url: that.data.host + '/customer/user/findWithdrawInfo.do',
				// 	method: 'post',
				// 	header: {
				// 		'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
				// 		'token': token
				// 	},
				// 	success: function(dom) {
				// 		//console.log(dom);
				// 		if (dom.statusCode != 200) {
				// 			util.showToast('发生未知错误：' + dom.statusCode, 'none', 3000);
				// 			return;
				// 		}
				// 		util.isLogin(dom.header);
				// 		let res = dom.data;
				// 		console.log(res);
				// 		if (res.status == 0) {
				// 			that.setData({
				// 				customer: JSON.parse(res.results)
				// 			});
				// 			if (that.data.customer.isCheck == '1') {
				// 				that.setData({
				// 					btnHid: false,
				// 					linkHid: true
				// 				})
				// 			} else {
				// 				that.setData({
				// 					btnHid: true,
				// 					linkHid: false
				// 				});
				// 			}
				// 		} else {
				// 			util.showToast(res.results, 'none', 3000);
				// 		}
				// 	},
				// 	fail: function(err) {
				// 		console.log(err);
				// 		util.showToast(err.errMsg, 'none', 3000);
				// 	},
				// 	complete: function() {
				// 		wx.hideLoading();
				// 	}
				// });
			},
			// 选择微信到账
			exchWechat: function(cash) {
				let that = this;
				let openId = uni.getStorageSync("openId") || '';
				if (openId == '') { // 没有openId则重新获取
					uni.login({
						success: function(res) {
							let code = res.code;
							if (code) {
								that.$showLoading();
								let data = { code: code };
								that.$request.postToken("/users/customer/getRoutineOpenId.do", null).then((res) => {
									if (res.data.status === 0) {
										let openId = JSON.parse(res.data.results);
										uni.setStorageSync('openId', openId);
										that.exchWechat(cash);
									} else {
										that.$util.showToast(res.data.results, 'none', 5000);
									}
								}).catch((err) => {
									console.log(err);
									that.$util.showToast(err, 'none', 5000);
								}).finally(() => {
									that.$hideLoading()
								})
								// wx.request({
								// 	url: that.data.host + '/servlet/customer/getOpenIdUSER',
								// 	method: 'post',
								// 	data: {
								// 		code: code
								// 	},
								// 	header: {
								// 		'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
								// 		'token': token
								// 	},
								// 	success: function(dom) {
								// 		util.isLogin(dom.header);
								// 		//console.log(dom);
								// 		let res = dom.data;
								// 		if (res.status == '0') {
								// 			wx.setStorageSync('openId', res.msg);
								// 			that.exchWechat(cash);
								// 		} else {
								// 			util.showToast(res.msg, 'none', 3000);
								// 		}
								// 	},
								// 	fail: function(err) {
								// 		console.log(err);
								// 		util.showToast(err.errMsg, 'none', 3000);
								// 	}
								// });
							} else {
								util.showToast("获取用户登录失败" + res.errMsg, 'none', 3000);
							}
						}
					})
				} else {
		
				}
				
				
				// wx.getStorage({
				// 	key: 'custToken',
				// 	success: function(res) {
				// 		wx.showLoading({
				// 			title: '加载中...'
				// 		});
				// 		let token = res.data;
				// 		let openId = wx.getStorageSync("openId") || '';
				// 		if (openId == '') { // 没有openId则重新获取
				// 			wx.login({
				// 				success: function(res) {
				// 					let code = res.code;
				// 					if (code) {
				// 						wx.request({
				// 							url: that.data.host + '/servlet/customer/getOpenIdUSER',
				// 							method: 'post',
				// 							data: {
				// 								code: code
				// 							},
				// 							header: {
				// 								'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
				// 								'token': token
				// 							},
				// 							success: function(dom) {
				// 								util.isLogin(dom.header);
				// 								//console.log(dom);
				// 								let res = dom.data;
				// 								if (res.status == '0') {
				// 									wx.setStorageSync('openId', res.msg);
				// 									that.exchWechat(cash);
				// 								} else {
				// 									util.showToast(res.msg, 'none', 3000);
				// 								}
				// 							},
				// 							fail: function(err) {
				// 								console.log(err);
				// 								util.showToast(err.errMsg, 'none', 3000);
				// 							}
				// 						});
				// 					} else {
				// 						util.showToast("获取用户登录失败" + res.errMsg, 'none', 3000);
				// 					}
				// 				}
				// 			})
				// 		} else {

				// 		}
				// 	},
				// 	fail: function(err) {
				// 		console.log(err);
				// 		wx.redirectTo({
				// 			url: '../login/login'
				// 		});
				// 	},
				// 	complete: function(com) {
				// 		wx.hideLoading();
				// 	}
				// })
			},
			// 申请提现
			formBindsubmit: function(e) {
				let that = this;
				let ischeck = that.customer.isCheck;

				// 如果用户未实名制，则跳转至实名制界面
				if (ischeck == null || ischeck != '1') {
					uni.navigateTo({
						url: '../realname/realname'
					});
					return;
				}
				let temp = {};
				temp.cash = e.detail.value.cash;
				temp.payType = e.detail.value.type
				temp.remarks = '用户提现';
				if (temp.cash.substring(temp.cash.length - 1) != 0) {
					that.showTxt = "提现金额必须是10元的倍数";
					return;
				}
				// 单次提现不能少于20元
				if (temp.payType == 'wechat') { // 微信
					if (Number(temp.cash) < 20) {
						that.$util.showToast("微信零钱单次提现金额不能少于20元", 'none', 3000);
						return;
					}
				} else if (temp.payType == 'bankcard') { // 银行卡
					if (Number(temp.cash) < 100) {
						that.$util.showToast("储蓄卡单次提现金额不能少于100元", 'none', 3000);
						return;
					}
				} else {
					that.$util.showToast("请选择到账方式", 'none', 3000);
					return;
				}
				// 在此清空提现金额并锁定提现按钮避免重复提交
				that.cash = 0;
				that.btnDisd = true;
				that.showTxt = '';
				that.showLoading();   //显示遮罩
				that.$request.postToken("/users/payorder/addWidthdraw.do", {
						data: JSON.stringify(temp)
					}).then((res) => {
					if (res.data.status === 0) {
						that.$util.showToast(res.results, 'none', 3000);
						that.getCustInfo();
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err, 'none', 5000);
				}).finally(() => {
					that.btnDisd = false;
					that.$hideLoading();   //隐藏遮罩
				})
				
				// let token = uni.getStorageSync("custToken");
				// if (stringUtil.isEmpty(token)) {
				// 	uni.redirectTo({
				// 		url: '../login/login'
				// 	});
				// }
				// uni.showLoading({
				// 	title: '申请中...'
				// })
				// wx.request({
				// 	url: that.data.host + '/payorder/user/addWidthdraw.do',
				// 	method: 'post',
				// 	data: {
				// 		data: JSON.stringify(temp)
				// 	},
				// 	header: {
				// 		'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
				// 		'token': token
				// 	},
				// 	success: function(dom) {
				// 		//console.log(dom);
				// 		if (dom.statusCode != 200) {
				// 			util.showToast('发生未知错误：' + dom.statusCode, 'none', 3000);
				// 			return;
				// 		}
				// 		util.isLogin(dom.header);
				// 		let res = dom.data;
				// 		//console.log(res);
				// 		if (res.status == 0) {
				// 			util.showToast(res.results, 'none', 3000);
				// 			that.getCustInfo();
				// 		} else {
				// 			util.showToast(res.results, 'none', 3000);
				// 		}
				// 	},
				// 	fail: function(err) {
				// 		console.log(err);
				// 		util.showToast(err.errMsg, 'none', 3000);
				// 	},
				// 	complete: function() {
				// 		wx.hideLoading();
				// 		that.setData({
				// 			btnDisd: false
				// 		});
				// 	}
				// });
			}
		},
		onLoad() {
			let that = this;
			that.host = that.$app.globalData.host;
		},
		onShow() {
			let that = this;
			that.getCustInfo();
		}
	}
</script>

<style>
	page {
		background: #fff;
	}

	.kk {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		justify-items: center;
		justify-self: center;
	}

	.withdraw>view:nth-child(1) {
		width: 10%;
	}

	.withdraw>view:nth-child(2) {
		width: 80%;
	}

	.withdraw>view:nth-child(3) {
		width: 10%;
	}

	.btn {
		width: 75%;
		border: 1px solid #00a2ed;
		border-radius: 50px;
	}
	.cashlist {
		width: 70%;
		border: 1px solid #00a2ed;
		border-radius: 50px;
	}

	.photo {
		width: 26px;
		height: 26px;
		border-radius: 10px;
	}

	.cash {
		min-height: 40px;
	}
</style>
