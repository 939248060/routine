<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
			<view class="title">
				<view class="photo">
					<open-data type="userAvatarUrl"></open-data>
				</view>
				<view class="name">
					<open-data type="userNickName"></open-data>
				</view>
			</view>
		<!-- #endif -->
		
		<view class="abc">
			<view>
				<view>量心币</view>
				<view>{{customer.score}}个</view>
			</view>
			<view>
				<navigator url="../cashlist/cashlist">
					<view>余额</view>
					<view>{{customer.cash}}元</view>
				</navigator>
			</view>
			<view>
				<view>信用</view>
				<view>{{ credit }}</view>
			</view>
		</view>
		<view class="itemlist">
			<view v-if="customer.isCheck=='1'">
				<view>
					<view class="rout icon-shenfenzheng"></view><text>实名认证</text>
				</view>
				<view class="mr5">已验证</view>
			</view>
			<view v-else data-url="../realname/realname" @click='link'>
				<view>
					<view class="rout icon-shenfenzheng"></view><text>实名认证</text>
				</view>
				<view>
					<view class="rout icon-dayuhao"></view>
				</view>
			</view>
			<navigator url="../addresslist/addresslist">
				<view>
					<view class="rout icon-shouhuodizhi"></view><text>收货地址</text>
				</view>
				<view>
					<view class="rout icon-dayuhao"></view>
				</view>
			</navigator>
			<navigator url="../recyorderlist/recyorderlist">
				<view>
					<view class="rout icon-daodian"></view><text>上门回收订单</text>
				</view>
				<view>
					<view class="rout icon-dayuhao"></view>
				</view>
			</navigator>
			<navigator url='../smartorderlist/smartorderlist?state=0'>
				<view>
					<view class="rout icon-zhineng"></view><text>智能投放订单</text>
				</view>
				<view class="fr">
					<view class="rout icon-dayuhao"></view>
				</view>
			</navigator>
			<navigator url='../dryorderlist/dryorderlist?state=0'>
				<view>
					<view class="rout icon-lajifenleishidian"></view><text>干垃圾投放订单</text>
				</view>
				<view>
					<view class="rout icon-dayuhao"></view>
				</view>
			</navigator>
			<navigator url="../exchangelist/exchangelist?state=0">
				<view>
					<view class="rout icon-jifenduihuan"></view>
					<view>积分兑换订单</view>
				</view>
				<view>
					<view class="rout icon-dayuhao"></view>
				</view>
			</navigator>
			<navigator url="../invitation/invitation">
				<view>
					<view class="rout icon-jifenduihuan"></view>
					<view>我的邀请</view>
				</view>
				<view>
					<view class="rout icon-dayuhao"></view>
				</view>
			</navigator>
			<navigator url="../guide/guide">
				<view>
					<view class="rout icon-guanyu"></view><text>关于我们</text>
				</view>
				<view>
					<view class="rout icon-dayuhao"></view>
				</view>
			</navigator>
			<view @click='call'>
				<view>
					<view class="rout icon-shouye-lianxikefu"></view><text>联系我们</text>
				</view>
				<view class="mr5">400-770-5180</view>
			</view>
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
				credit: '--',
				idCard: ''
			}
		},
		methods: {
			link: function(e) {
				let url = e.currentTarget.dataset.url;
				if (url != null && url != "") {
					uni.navigateTo({
						url: url
					});
				}
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
		},
		onShow() {
			let that = this;
			that.getCustInfo();
		},
	}
</script>

<style>
	.ward {
		background: white;
	}

	.head {
		background: #1b82d1;
		color: white;
		padding-bottom: 10px;
	}

	.center {
		background: #eee;
		font-size: 14px;
	}

	.userAvatarUrl {
		border: 1rpx white solid;
		margin-top: 15px;
		margin-left: 25px;
		padding: 10px;
	}

	.title {
		background: #1b82d1;
		color: #fff;
		padding: 0px 10px 0px 10px;
	}

	.title {
		display: flex;
		flex-direction: row;
	}

	.title .photo {
		width: 40px;
		height: 40px;
		border: 2px solid #fff;
		border-radius: 10px;
	}

	.title .name {
		margin: 10px 0px 0px 10px;
	}

	.grade {
		float: right;
		margin-top: 24px;
		margin-right: 10px;
		background: linear-gradient(to bottom right, #edfa3c, #ff9900);
		/* 标准的语法 */
		top: 25rpx;
		display: flex;
		height: 24px;
		width: 72px;
		border-radius: 4px;
		padding-left: 10rpx;
		padding-right: 10rpx;
		padding-top: 10rpx;
		padding-bottom: 0rpx;
		justify-content: center;
		text-align: center;
		font-size: 12px;
	}

	.num {
		font-weight: bold;
	}

	.abc {
		width: 100%;
		color: #fff;
		background: #1b82d1;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		padding: 8px 0px;
	}

	.abc>view {
		width: 33.33%;
		text-align: center;
	}

	.abc>view:nth-child(2) {
		position: relative;
	}

	.abc>view:nth-child(2)>view::before {
		content: '';
		position: absolute;
		top: 10px;
		left: 0px;
		width: 1px;
		height: 25px;
		background: #fff;
	}

	.abc>view:nth-child(2)>view::after {
		content: '';
		position: absolute;
		top: 10px;
		right: 0px;
		width: 1px;
		height: 25px;
		background: #fff;
	}

	.kkk {
		width: 100%;
		color: #fff;
		background: #1b82d1;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		padding: 8px 0px;
	}

	.kkk>view {
		width: 33.33%;
		text-align: center;
	}

	.kkk>view>navigator>view:nth-child(2) {
		font-size: 12px;
	}

	.kkk>view:nth-child(2) {
		position: relative;
	}

	.kkk>view:nth-child(2)>view::before {
		content: '';
		position: absolute;
		top: 10px;
		left: 0px;
		width: 1px;
		height: 25px;
		background: #fff;
	}

	.kkk>view:nth-child(2)>view::after {
		content: '';
		position: absolute;
		top: 10px;
		right: 0px;
		width: 1px;
		height: 25px;
		background: #fff;
	}

	.itemlist {
		width: 100%;
		background: #fff;
		margin: 10px 0px;
	}

	.itemlist>navigator,
	.itemlist>view {
		display: flex;
		flex-direction: row;
		padding: 6px 6px 6px 10px;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #eee;
	}

	.itemlist>navigator>view,
	.itemlist>view>view {
		display: flex;
		flex-direction: row;
		justify-content: right;
		align-items: center;
	}

	.itemlist>navigator>view:nth-child(1)>.rout,
	.itemlist>view>view:nth-child(1)>.rout {
		font-size: 25px;
		color: #fff;
		margin-right: 5px;
		padding: 0px 5px 4px 5px;
		border-radius: 5px;
	}

	.itemlist>view:nth-child(1)>view:nth-child(1)>.rout {
		background: #59c2e0;
	}

	.itemlist>navigator:nth-child(2)>view:nth-child(1)>.rout {
		background: #4bafef;
	}

	.itemlist>navigator:nth-child(3)>view:nth-child(1)>.rout {
		background: #4bafef;
	}

	.itemlist>navigator:nth-child(4)>view:nth-child(1)>.rout {
		background: #4bafef;
	}

	.itemlist>navigator:nth-child(5)>view:nth-child(1)>.rout {
		background: #a6d7a8;
	}

	.itemlist>navigator:nth-child(6)>view:nth-child(1)>.rout {
		background: #eccc5b;
	}

	.itemlist>navigator:nth-child(7)>view:nth-child(1)>.rout {
		background: #5ecfd2;
	}

	.itemlist>navigator:nth-child(8)>view:nth-child(1)>.rout {
		background: #5ecfd2;
	}

	.itemlist>view:nth-child(9)>view:nth-child(1)>.rout {
		background: #e5b236;
	}

	.exit {
		width: 80%;
		margin-bottom: 50px;
		color: #fff;
		background: #c00;
		margin: auto;
		border-radius: 10px;
	}
</style>
