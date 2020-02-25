<template>
	<view>
		<view class="head column jccenter bg-blue1">
			<view class="">
				<text class="f14 black">我的邀请二维码</text>
				<image :src="codeurl"></image>
			</view>
			<view>
				<button class="black" @click='onShareAppMessage' open-type="share">立即邀请</button>
			</view>
		</view>
		<view class="content">
			<view class="f22 black">邀请战绩</view>
			<!-- 选项卡 -->
			<view class="top-tab row txtcenter f14">
				<view :class="[currentTab==0?'selectOn':'']" data-current="0" @click="swichNav">已邀好友</view>
				<view :class="[currentTab==1?'selectOn':'']" data-current="1" @click="swichNav">已得奖励</view>
			</view>
			<!-- 已经邀请好友 -->
			<view class="tab tab1" v-if="currentTab==0">
				<view>
					<text>总计注册好友</text>
					<text class="yellow f20 bold9">{{invicount}}</text>
				</view>
				<!-- 邀请用户列表 -->
				<view>
					<view class="row jcbetween">
						<text class="">好友账号</text>
						<text>注册时间</text>
						<text>投递/上门回收</text>
					</view>
					<view class="row jcbetween" v-for="(item,index) in invilist" :key="index">
						<text>{{item.tdCode}}</text>
						<text>{{item.regdate}}</text>
						<text>{{item.actAmount == null?'0.00':item.actAmount}}</text>
					</view>
					<view v-if="invicount<=0" class="noinvite m15 f18">
						<icon class="rout icon-kongshuju"></icon>
						<view class="f14">暂无邀请好友</view>
					</view>
					<view class="txtcenter m10" v-if="noMore" :data-detail="'tab'+currentTab" @click="loadiMore">获取更多...</view>
				</view>
			</view>
			<!-- 已得奖励 -->
			<view class="tab tab2" v-else-if="currentTab==1">
				<view>
					<text>累计环保金</text>
					<text class="yellow f20 bold9">0.00</text>
				</view>
				<!-- 已得奖励列表 -->
				<view>
					<view class="row jcaround">
						<text>日期时间</text>
						<text>赚取环保金</text>
					</view>
					<!-- <view class="row jcaround">
							<text>2019-10-31 09:41</text>
							<text>10.11</text>
						 </view> -->
					<view v-if="invimoney<=0" class="noinvite m15 f18">
						<icon class="rout icon-kongshuju"></icon>
						<view class="f14">暂无环保奖励金</view>
					</view>
					<view class="txtcenter m10" v-if="noMore" :data-detail="'tab'+currentTab" @click="loadiMore">获取更多...</view>
				</view>
			</view>
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
				currentTab: 0, // 当前Tab 0：已邀请好友   1：已得奖励
				page: {}, //分页
				noMore: false, //
				codeurl: '', //邀请二维码图片url地址
				invilist: [], //被邀请的用户
				invicount: 0, //邀请的人数
				invimoney: 0 //邀请得到的奖励
			}
		},
		methods: {
			// 点击选项卡事件
			swichNav: function(e) {
				let that = this;
				that.currentTab = e.currentTarget.dataset.current;
			},
			loadiMore: function(e) {
				console.log(e.currentTarget.dataset.detail)
			},
			//获取邀请码
			getQrCode: function() {
				let that = this;
				that.$showLoading(); //显示遮罩
				that.$request.postToken("/users/customer/findQrCode.do", null).then((res) => {
					if (res.data.status === 0) {
						that.codeurl = that.host + res.data.results;
						// that.codeurl = 'data:image/jpg;base64,' + res.data.results;
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(res.data.results, 'none', 5000);
				}).finally(() => {
					that.$hideLoading(); //隐藏遮罩
				})
			},
			//获取邀请的用户投放量信息
			getinvite: function() {
				let that = this;
				that.$showLoading(); //显示遮罩
				that.$request.postToken("/users/customer/findInviteList.do", {
					'currentTab': that.currentTab
				}).then((res) => {
					console.log(res);
					let arr = JSON.parse(res.data.results)
					that.invilist = arr;
					that.invicount = arr.length;
					console.log(arr);
				}).catch((err) => {
					console.log(err);

				}).finally(() => {
					that.$hideLoading(); //隐藏遮罩
				})
			}
		},
		onLoad() {
			let that = this;
			that.host = that.$app.globalData.host;
			that.getQrCode(); //获取邀请二维码
			that.getinvite(); //获取邀请信息
		},
		onShareAppMessage: function(e) {
			if (e.from === 'button') {
				console.log(e) // 来自页面内转发按钮
			}
			return {
				title: '邀好友，享好礼', //设置标题
				path: '/pages/login/login', //设置用户点击跳转的页面
				imageUrl: this.codeurl //自定义图片路径，默认当前页面截图
			}
		}
	}
</script>

<style>
	/* 头部样式 */
	.head {
		border-bottom-right-radius: 10%;
		border-bottom-left-radius: 10%;
	}

	/* 二维码显示框 */
	.head view:nth-child(1) {
		height: 500rpx;
		width: 500rpx;
		margin: 50rpx auto;
		text-align: center;
		background: white;
		border-radius: 20rpx;
	}

	/* 二维码图片 */
	.head view:nth-child(1) image {
		width: 350rpx;
		height: 350rpx;
	}

	/* 二维码文本 */
	.head view:nth-child(1) text {
		display: block;
		padding-top: 20rpx;
		line-height: 50rpx;
	}

	/* 立即邀请 */
	.head view:nth-child(2) {
		width: 70%;
		text-align: center;
		margin: 20rpx auto;
	}

	/* 邀请按钮 */
	.head view:nth-child(2) button {
		border-radius: 40rpx;
		line-height: 70rpx;
		background-color: #f36;
	}

	/* 邀请战绩详细样式 */
	.content {
		margin-top: 60rpx;
	}

	/* 邀请战绩 */
	.content view:nth-child(1) {
		text-align: center;
	}

	/* tab样式 */
	.content .tab {
		margin: 10rpx 30rpx;
		border-radius: 10rpx;
		text-align: center;
	}

	.tab>view:nth-child(1) {
		background-color: white;
	}

	.tab>view:nth-child(1) text {
		display: block;
		margin: 16rpx 0rpx;
	}

	.tab>view:nth-child(2) {
		background-color: white;
	}

	/* 列表头部样式 */
	.tab>view:nth-child(2)>view:nth-child(1) {
		background-color: #eee;
	}

	.tab>view:nth-child(2)>view {
		padding: 15rpx 0rpx;
	}

	/* 已邀好友 */
	.tab1>view:nth-child(2)>view>text:nth-child(1) {
		width: 26%;
	}

	.tab1>view:nth-child(2)>view>text:nth-child(2) {
		width: 45%;
	}

	.tab1>view:nth-child(2)>view>text:nth-child(3) {
		width: 29%;
	}

	/* 已得奖励 */
	.tab2>view:nth-child(2)>view>text:nth-child(1) {
		width: 50%;
	}

	.tab2>view:nth-child(2)>view>text:nth-child(2) {
		width: 50%;
	}

	/* 没有邀好友和已得奖励 */
	.noinvite {
		height: 220rpx;
	}

	.noinvite icon {
		font-size: 150rpx;
	}

	/* 选项卡 */
	.top-tab {
		width: 100%;
		margin-top: 30rpx;
	}

	.top-tab>view {
		width: 50%;
		height: 36px;
		line-height: 34px;
		box-sizing: border-box;
		border-bottom: 1px solid #ccc;
	}

	.selectOn {
		color: #00a2ed !important;
		border-bottom: 2px solid #00a2ed !important;
	}
</style>
