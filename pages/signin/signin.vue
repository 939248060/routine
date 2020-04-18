<template>
	<view class="content">
		<!-- 签到 -->
		<view class="card column bg-white pl15 pr15 pt10 pb10">
			<text class="txtcenter mb10">- 您已坚持 <text class="blue1 ml5 mr5">{{ signNum }}</text> 天签到 -</text>
			<view class="row mb10 signCon">
				<view class="column">
					<view class="rout icon-logo f24 ascenter mb5 ml5" :class="{'blue1': 1<=signNum, 'gray': 1>signNum}" />
					<view class="signday white radius10 txtcenter tnowrap" :class="{'boxblue1': 1<=signNum, 'boxgray': 1>signNum}">第1天</view>
				</view>
				<view class="asend mb10" :class="{'line--active': 2<=signNum, 'line': 2>signNum}" />
				<view class="column">
					<view class="rout icon-logo f24 ascenter mb5 ml5" :class="{'blue1': 2<=signNum, 'gray': 2>signNum}" />
					<view class="signday white radius10 txtcenter tnowrap" :class="{'boxblue1': 2<=signNum, 'boxgray': 2>signNum}">第2天</view>
				</view>
				<view class="asend mb10" :class="{'line--active': 3<=signNum, 'line': 3>signNum}" />
				<view class="column">
					<view class="rout icon-logo f24 ascenter mb5 ml5" :class="{'blue1': 3<=signNum, 'gray': 3>signNum}" />
					<view class="signday white radius10 txtcenter tnowrap" :class="{'boxblue1': 3<=signNum, 'boxgray': 3>signNum}">第3天</view>
				</view>
				<view class="asend mb10" :class="{'line--active': 4<=signNum, 'line': 4>signNum}" />
				<view class="column">
					<view class="rout icon-logo f24 ascenter mb5 ml5" :class="{'blue1': 4<=signNum, 'gray': 4>signNum}" />
					<view class="signday white radius10 txtcenter tnowrap" :class="{'boxblue1': 4<=signNum, 'boxgray': 4>signNum}">第4天</view>
				</view>
			</view>
			<view class="row ascenter signCon" style="width: 70%;">
				<view class="column">
					<view class="rout icon-logo f24 ascenter mb5 ml5" :class="{'blue1': 5<=signNum, 'gray': 5>signNum}" />
					<view class="signday white radius10 txtcenter tnowrap" :class="{'boxblue1': 5<=signNum, 'boxgray': 5>signNum}">第5天</view>
				</view>
				<view class="asend mb10" :class="{'line--active': 6<=signNum, 'line': 6>signNum}" />
				<view class="column">
					<view class="rout icon-logo f24 ascenter mb5 ml5" :class="{'blue1': 6<=signNum, 'gray': 6>signNum}" />
					<view class="signday white radius10 txtcenter tnowrap" :class="{'boxblue1': 6<=signNum, 'boxgray': 6>signNum}">第6天</view>
				</view>
				<view class="asend mb10" :class="{'line--active': 7<=signNum, 'line': 7>signNum}" />
				<view class="column">
					<view class="rout icon-logo f24 ascenter mb5 ml5" :class="{'blue1': 7<=signNum, 'gray': 7>signNum}" />
					<view class="signday white radius10 txtcenter tnowrap" :class="{'boxblue1': 7<=signNum, 'boxgray': 7>signNum}">第7天</view>
				</view>
			</view>
			<view class="signbtn radius10 ascenter mt10 "  :class="signType?'boxblue1':'boxgray'" @click="sendSignIn()">
				{{ signType?'立即签到':'签到完成' }}
			</view>
		</view>
		<view class="m10 column">
			<text class="f16">签到规则</text>
			<text class="">
				(1). 用户连续签到7天，赠送一张加价券；
				(2). 连续签到7天后，第8天为新的一轮签到周期；
				(3). 若任一连续签到周期内断签，则重置签到周期；
				(4). 加价券会自动发放到您的量心回收小程序账户中，加价券有效期及具体使用规则可以在加价券列表里查看，如偶遇发放延迟，请您耐心等待或联系客服为您解决；
				(5). 本活动最终解释权归活动主办方所有。
			</text>
		</view>
		<!-- 活动 -->
		<view class="column">
			<!-- <block :key="index" v-for="(item,index) in list"> -->
				<navigator url="../invite/invite">
					<image class="activityimg radius8" src="../../static/images/swiper1.png" mode="widthFix" />
				</navigator>
				<navigator url="../invite/invite">
					<image class="activityimg radius8" src="../../static/images/swiper2.png" mode="widthFix" />
				</navigator>
				<navigator url="../activity/activity">
					<image class="activityimg radius8" src="../../static/images/swiper3.png" mode="widthFix" />
				</navigator>
			<!-- </block> -->
		</view>
		<!-- 遮罩 -->
		<loading/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				signNum: 0,	//签到天数
				signType: true,	//签到按钮状态
				day: '',	//当前时间，用于判断用户当前签到状态从而显示按钮样式
			}
		},
		methods: {
			//签到
			sendSignIn() {
				let that = this;
				if (that.signType == false) {
					return
				}
				that.$showLoading();  //显示遮罩
				that.$request.postToken("/users/signRecourd/add.do", null).then((res) => {
					if (res.data.status === 0) {
						that.signNum = that.signNum+1; //签到天数加一
						that.signType = false;	//签到按钮样式调整
						that.$util.showToast( res.data.results, 'none', 2500);
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err, 'none', 5000);
				}).finally(() => {
					that.$hideLoading()  // 关闭过度遮罩
				})
			},
			//用户签到记录
			getUserSign() {
				let that = this;
				that.$showLoading();  //显示遮罩
				that.$request.postToken("/users/signRecourd/findAllWeek.do", null).then((res) => {
					if (res.data.status === 0) {
						res = JSON.parse(res.data.results);
						that.signNum = res.length;	//签到天数
						//确认今天有没有签到，签到的话要把signtype的值变为false，让按钮变灰
						let time1 = that.day.slice(0,10).replace(/-/g,':'); //当前日期，用于判断今天是否签到
						res.forEach(item => {
							let time2 = item.signTime.slice(0,10).replace(/-/g,':');
							if (new Date(time1).getTime() == new Date(time2).getTime() && item.signTag == 1) {
								that.signType = false;
								console.log("signIn!!!")
							}
						})
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err, 'none', 5000);
				}).finally(() => {
					that.$hideLoading()  // 关闭过度遮罩
				})
			}
		},
		onLoad() {
			let that = this;
			that.getUserSign(); //获取用户签到记录
			that.day = that.$util.getNowFormatDate();
		}
	}
</script>

<style>
	.content {
		background-image: radial-gradient(circle at 50% -252px, #00a2ed, #00a2ed 360px, transparent 361px );
		padding: 20px 15px 0px;
	}
	.signCon > view:nth-child(odd) {
		margin-right: 6px;
	}
	.signday {
		padding: 1px 2px;
	}
	.line {
		border: 1px dashed #EEEEEE;
		width: 100%;
	}
	.line--active {
		border: 1px solid #00A2ED;
		width: 100%;
	}
	.signbtn {
		padding: 5px 10px;
		color: #FFFFFF;
	}
	.activityimg {
		width: 100%;
		margin-bottom: 10px;
	}
</style>
