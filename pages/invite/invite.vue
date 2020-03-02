<template>
	<view>
		<view :style="'background: url('+host+'/images/routine/invite1.jpg) 0% 0% / 100% no-repeat;  height: 925rpx;'">
			<view class="p10">
				<image :src="host+'/images/routine/logo.png'" mode="widthFix" style="width: 30%" />
			</view>
			<view class="txtcenter mt20">
				<image :src="host+'/images/routine/invite2.png'" mode="widthFix" style="width: 80%" />
			</view>
		</view>
		<view class="txt txtcenter white pb10 bold7 f20">邀请奖励 奖励无上限</view>
		<view class="pb10" style="background: #51bdf7;">
			<view class="itemtop">
				<view></view>
			</view>
			<view style="margin-top: -15px; color: #955b5a;">
				<view class="itembody bg-white ml10 mr10">
					<view class="txtcenter red f20">活动规则</view>
					<view class="txtcenter red mt10 f16">活动时间：{{beginTime}} - {{endTime}}</view>
					<view class="mt15" style="text-indent: 2em;">自好友注册之日起到活动截止日前，好友使用智能站累计投放超过10kg，您可获得微信红包5元奖励。</view>
					<view class="mt10">投放重量以回收员检验结果为准</view>
					<view class="mt10">好友累计投放超过10kg后系统会在3个工作日内将奖金发送至您的微信零钱账户</view>
					<button class="btn" open-type="share" title="史上最牛X的垃圾分类方式">邀请好友</button>
				</view>
			</view>
		</view>
		<view class="pb20" style="background: #51bdf7;">
			<view class="itemtop">
				<view></view>
			</view>
			<view style="margin-top: -15px;">
				<view class="itembody bg-white ml10 mr10 f18">
					<view class="txtcenter red f20">我的邀请奖励</view>
					<view class="row jcaround aicenter txtcenter p10">
						<view class="ml20">
							<view class="black mb5">邀请人数</view>
							<view class="red">{{list.length}} 人</view>
						</view>
						<view class="mr20">
							<view class="black mb5">获得奖励</view>
							<view class="red">{{count}} 元</view>
						</view>
					</view>
					<view class="row jcbetween aicenter mt10 f15" v-for="(item,index) in list" :key="index">
						<view>{{item.mobile}}</view>
						<view v-if="item.amount>=10&&item.rewardTime!=null">奖励已发放</view>
						<view v-else-if="item.amount>=10"><text class="red">奖金在路上了</text></view>
						<view v-else>已投<text class="red"> {{(item.amount>=0)?item.amount:0}} </text>公斤</view>
					</view>
				</view>

			</view>
		</view>

		<!--加载动画-->
		<loading id='loading' />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				host: '',
				count: 0,      //获得奖励
				beginTime: '', // 活动开始时间
				endTime: '', // 活动结束时间
				list: [] // 活动期间邀请的用户及投放总量
			}
		},
		methods: {
			// 获取用户活动信息
			getInviteInfo: function(e) {
				let that = this;
				that.$showLoading();    //显示遮罩
				that.$request.postToken("/users/customer/findInviteList.do", {}).then((res) => {
					if (res.data.status === 0) {
						console.log(res)
						let beginTime = res.data.beginTime.replace("-", "."); // 获取活动开始时间，并将'-'替换成'.'
						let endTime = res.data.endTime.replace("-", "."); // 获取活动截止时间，并将'-'替换成'.'
						let beginStamp = Date.parse(beginTime); // 获取活动开始时间戳
						let endStamp = Date.parse(endTime); // 获取活动结束时间戳
						let nowStamp = new Date().getTime(); // 获取当前时间戳
						let list = [];
						let count = 0; // 累计获得奖励金额
						if (nowStamp > beginStamp && nowStamp < endStamp) {
							list = JSON.parse(res.data.results); // 获取活动期间邀请的用户及投放总量
							list.forEach(item => {
								if (item.rewardTime != null) {
									count = count + 5;
								}
							})
						}
						that.beginTime = beginTime;
						that.endTime = endTime;
						that.list = list;
						that.count = count;
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err, 'none', 5000);
				}).finally(() => {
					that.$hideLoading();  //隐藏遮罩
				})
			}
		},
		onLoad() {
			let that = this;
			that.host = that.$app.globalData.host;
			that.getInviteInfo();
		},
		onShareAppMessage: function (e) {
		    let that = this;
		    var token = uni.getStorageSync("custToken");
		    if (that.$stringUtil.isEmpty(token)) {
		      uni.redirectTo({ url: '../pages/login/login' });
		    }
		    if (e.from == "button") {
		      return {
		        title: "史上最牛X的垃圾分类方式",
		        path: "pages/register/register?token=" + token
		      }
		    }
		  }
	}
</script>

<style>
	.txt {
		background: #51bdf7;
		text-shadow: 2px 2px 8px #000;
	}

	.itemtop {
		width: 100%;
		height: 30px;
		background: #64abd0;
	}

	.itemtop>view {
		width: 100%;
		height: 10px;
		/* margin-top: 10px; */
		border-radius: 10px;
		background: #236486
	}

	.itembody {
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		padding: 20px;
		box-shadow: 0px 0px 16px 3px inset #51bdf7;
	}

	.btn {
		font-size: 20px;
		border-radius: 20px;
		width: 68%;
		margin: 20px auto;
		line-height: 40px;
		color: #fff;
		box-shadow: 0px 0px 10px #56ab2f;
		background: #56ab2f;
		background: -webkit-linear-gradient(to top, #56ab2f, #a8e063);
		background: linear-gradient(to top, #56ab2f, #a8e063);
	}
</style>
