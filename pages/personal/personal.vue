<template>
	<view class="bg">
		<!-- #ifdef MP-WEIXIN -->
		<view class="head column bg-white mb15">
			<view class="row mt20 jcbetween">
				<view class="row ml20">
					<view class="userPhoto">
						<open-data type="userAvatarUrl" />
					</view>
					<view class="userName">
						<view class="f18 ml10 blue1">
							<open-data type="userNickName" />
						</view>
						<view class="ml10 gray-9 f12">用户卡号：{{ card }}</view>
					</view>
				</view>
				<view>
					<view class="realname white txtright lh20">
						<view v-if="customer.isCheck=='1'" class="bg-blue1 pr20">已实名</view>
						<view v-else class="bg-gray pr20">未实名</view>
					</view>
				</view>
			</view>
			<view class="row jcaround txtcenter f18 userInfo ml20 mr20 lh18">
				<navigator url="../cashlist/cashlist">
					<view v-if="develop == '测试'" class="bold mb5"> 1200 </view>
					<view v-else class="bold mb5"> {{customer.cash}} </view>
					<view class="gray-9 f12"> 零钱 </view>
				</navigator>
				<navigator>
					<view v-if="develop == '测试'" class="bold mb5"> 100000 </view>
					<view v-else class="bold mb5"> {{customer.score}} </view>
					<view class="gray-9 f12"> 量心币 </view>
				</navigator>
				<navigator url="../couponlist/couponlist">
					<view v-if="develop == '测试'" class="bold mb5"> 100 </view>
					<view v-else class="bold mb5"> 0 </view>
					<view class="gray-9 f12"> 加价券 </view>
				</navigator>
				<navigator>
					<view v-if="develop == '测试'" class="bold mb5"> 100000 </view>
					<view v-else class="bold mb5"> 0 </view>
					<view class="gray-9 f12"> 积分 </view>
				</navigator>
			</view>
			<view class="headLine" />
		</view>
		<!-- #endif -->
		<!-- 我的收益 -->
	<!-- 	<view class="myorder bg-white mb15">
			<view class="row jcbetween f12 gray-9 pb5 mb10">
				<text class="f16 gray-3 bold">我的收益</text>
				<navigator url='../smartorderlist/smartorderlist?state=0' class="row ascenter">
					查看详情  <view class="rout icon-dayuhao lh18" />
				</navigator>
			</view>
			<view class="orderList row jcaround mt5 mb5 txtcenter gray-9">
				<navigator >
					<view class="rout icon-dui " />
					<text>碳积分</text>
				</navigator>
				<navigator url="../exchangelist/exchangelist?state=0">
					<view class="rout icon-dui" />
					<text>积分兑换</text>
				</navigator>
				<navigator >
					<view class="rout icon-dui" />
					<text>额外收益</text>
				</navigator>
			</view>
		</view> -->
		<!-- 邀请有礼 -->
		<view class="yaoqing row bg-white mb15 txtleft">
			<view class=" row aicenter righteee" style="width: 50%;">
				<image src="../../static/images/liwu.png" class="mr10" style="width: 40px; height: 40px;" />
				<navigator class="column" url="../invitation/invitation">
					<text class="f16 gray-6 bold">邀请有礼</text>
					<text class="gray-9 f12">赢取现金大奖</text>
				</navigator>
			</view>
			<view class="row aicenter ml20">
				<image src="../../static/images/liwu.png" class="mr10" style="width: 40px; height: 40px;" />
				<view class="column">
					<text class="f16 gray-6 bold">签到活动</text>
					<text class="gray-9 f12">获得海量奖励</text>
				</view>
			</view>
		</view>
		<!-- 基础功能 -->
		<view class="content row bg-white mb15 wrap">
			<navigator url="../qrcode/qrcode">
				<view class="rout icon-qrcode f30 gray-9" />
				<text>我的二维码</text>
			</navigator>
			<navigator url="../realname/realname">
				<view class="rout icon-shenfenzheng f30 gray-9" />
				<text>实名认证</text>
			</navigator>
			<navigator url="../addresslist/addresslist">
				<view class="rout icon-shouhuodizhi f30 gray-9" />
				<text>收货地址</text>
			</navigator>
			<navigator url="../exchangelist/exchangelist?state=0">
				<view class="rout icon-jifen f30 gray-9" />
				<text>积分兑换</text>
			</navigator>
			<navigator url="../couponlist/couponlist">
				<view class="rout icon-youhuiquan f30 gray-9" />
				<text>加价券</text>
			</navigator>
			<navigator url="../guide/guide">
				<view class="rout icon-info f30 gray-9" />
				<text>关于我们</text>
			</navigator>
			<navigator class="ml15"  @click='call'>
				<view class="rout icon-kefu f30 gray-9" />
				<text>联系我们</text>
			</navigator>
		</view>
		<button class="exit" @click='logout'>退出登录</button>
		<!-- 遮罩 -->
		<loading/>
		<!--弹出框-->
		<dialogs id='dialog' ref="dialogs" title=' ' content='是否退出登录' cancelText='取消' confirmText='确定' @cancelEvent="_cancelEvent"
		 @confirmEvent="_confirmEvent">
		</dialogs>
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
				host: '',
				customer: {},
				score: 0,
				balance: 0,
				idCard: '',
				card: '',			//用户卡号
				develop: '测试',//用于测试界面，打包删除
			}
		},
		methods: {
			//获取用户卡号
			getUserCard: function() {
				let that = this;
				uni.getStorage({
					key: 'card',
					success: function(res) {
						that.card = res.data;
					}
				})
			},
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
			// 获取用户量心币及零钱信息
			getCustInfo: function() {
				let that = this;
				that.$showLoading();  //显示遮罩
				that.$request.postToken("/users/customer/findInfo.do", null).then((res) => {
					if (res.data.status === 0) {
						that.$data.customer = JSON.parse(res.data.results);
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err, 'none', 5000);
				}).finally(() => {
					that.$hideLoading()  // 关闭过度遮罩
				})
				// uni.request({
				// 	url: that.data.host + '/customer/user/findCustomerInfo.do',
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
				// 			//that.setData({ "score": res[0].Score, "balance": res[0].Balance, });
				// 			//that.setData({ "countScore": res[0].CountScore, "countBalance": res[0].CountBalance });
				// 		} else {

				// 		}
				// 	},
				// 	fail: function(err) {
				// 		console.log(err);
				// 		util.showToast(err.errMsg, 'none', 3000);
				// 	}
				// });
			},
			// 点击登录弹出提示框
			logout: function(e) {
				this.$refs['dialogs'].showDialog();
			},
			// 弹出框选确定退出登录
			_confirmEvent() {
				var that = this;
				uni.removeStorageSync('custToken');
				that.$util.showToast("您已退出登录", 'none', 3000);
				uni.redirectTo({
					url: '../login/login'
				});
				console.log("what");
			},
			// 弹出框选取消隐藏弹出框
			_cancelEvent() {
				this.$refs['dialogs'].hideDialog();
			}
		},
		onLoad() {
			// // 隐藏系统tabBar
			// wx.hideTabBar();
			// // 绘制新的tabbar
			// app.editTabbar();
			
			let that = this;
			that.host = that.$app.globalData.host;
			that.getUserCard();
		},
		onShow() {
			let that = this;
			that.getCustInfo();
		},
	}
</script>

<style>
	.bg {
		background: linear-gradient( #00a2ed 120px, #eeeeee 160px);
		padding: 75px 15px 0px;
	}
	.head {
		border-radius: 4px;
	}
	.userPhoto {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		overflow: hidden;
		position: relative;
		top: -30px;
	}
	.userName, .userInfo {
		position: relative;
		top: -10px;
	}
	.headLine {
		height: 6px;
		background-color: #00a2ed;
		border-radius: 0 0 4px 4px;
	}
	.realname {
		width: 80px;
		border-radius: 25px 0 0 25px;
		position: relative;
		right: -3px;
		overflow: hidden;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
	}
	.myorder, .content {
		padding: 10px;
		border-radius: 8px;
	}
	.orderList > navigator > view {
		font-size: 26px;
		color: #00a2ed;
		margin-bottom: 5px;
	}
	.content > navigator {
		width: 25%;
		text-align: center;
		margin: 5px 0;
	}
	.yaoqing {
		padding: 20px;
		border-radius: 8px;
	}
	.exit {
		width: 70%;
		margin-bottom: 50px;
		color: #fff;
		background: #c00;
		border-radius: 10px;
		line-height: 2em;
	}
</style>
