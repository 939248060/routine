<template>
	<view class="content">
		<!-- 签到 -->
		<view class="card column bg-white p10">
			<text class="txtcenter mb15 f16">- 您已连续 <text class="orange ml5 mr5">{{ signNum }}</text> 天签到 -</text>
			<view class="row mb10 signCon">
				<view class="column">
					<view class="f12 tnowrap" :class="1>signNum? 'gray-d':'gray-3'">1天</view>
					<view class="ascenter" :class="1>signNum? 'signDay':'orange rout icon-roundcheckfill f26 signDay--active'" />
				</view>
					<view class="asend mb15" :class="{'line--active': 2<=signNum, 'line': 2>signNum}" />
				<view class="column">
					<view class="f12 tnowrap" :class="2>signNum? 'gray-d':'gray-3'">2天</view>
					<view class="ascenter" :class="2>signNum? 'signDay':'orange rout icon-roundcheckfill f26 signDay--active'" />
				</view>
				<view class="asend mb15" :class="{'line--active': 3<=signNum, 'line': 3>signNum}" />
				<view class="column">
					<view class="f12 tnowrap" :class="3>signNum? 'gray-d':'gray-3'">3天</view>
					<view class="ascenter" :class="3>signNum? 'signDay':'orange rout icon-roundcheckfill f26 signDay--active'" />
				</view>
				<view class="asend mb15" :class="{'line--active': 4<=signNum, 'line': 4>signNum}" />
				<view class="column">
					<view class="f12 tnowrap" :class="4>signNum? 'gray-d':'gray-3'" >4天</view>
					<view class="ascenter" :class="4>signNum? 'signDay':'orange rout icon-roundcheckfill f26 signDay--active'" />
				</view>
				<view class="asend mb15" :class="{'line--active': 5<=signNum, 'line': 5>signNum}" />
				<view class="column">
					<view class="f12 tnowrap" :class="5>signNum? 'gray-d':'gray-3'">5天</view>
					<view class="ascenter" :class="5>signNum? 'signDay':'orange rout icon-roundcheckfill f26 signDay--active'" />
				</view>
				<view class="asend mb15" :class="{'line--active': 6<=signNum, 'line': 6>signNum}" />
				<view class="column">
					<view class="f12 tnowrap" :class="6>signNum? 'gray-d':'gray-3'">6天</view>
					<view class="ascenter" :class="6>signNum? 'signDay':'orange rout icon-roundcheckfill f26 signDay--active'" />
				</view>
				<view class="asend mb15" :class="{'line--active': 7<=signNum, 'line': 7>signNum}" />
				<view class="column">
					<view class="f12 tnowrap" :class="7>signNum? 'gray-d':'gray-3'">7天</view>
					<view class="ascenter" :class="7>signNum? 'gray-d rout icon-presentfill f30':'orange rout icon-presentfill f30'" />
				</view>
			</view>
			<view class="signbtn radius10 ascenter"  :class="signType?'boxorange':'boxgray-d'" @click="sendSignIn()">
				{{ signType?'立即签到':'签到完成' }}
			</view>
		</view>
		<view class="m10 column">
			<text class="f16">签到规则</text>
			<text class="">
				(1). 签到代表您在量心小程序上的成就，每天签到可获得签到奖励，连续签到7天可获得终极礼品奖励；
				(2). 签到奖励分每日签到奖励和一周连续签到奖励；
				(3). 每日签到奖励可获取相应的积分；
				(4). 连续签到计算方式为：每周一到周日连续、不间断的签到天数；
				(5). 连续签到达到指定的天数，才可获得签到的奖励。若中断签到，则享受实际签到天数当天的积分奖励；
				(6). 连续签到天数为一周，每周一到周日，用户每天0:00—23:59:59登录量心回收小程序，进入签到页面，连续签到7天后，会获取礼品一份。
			</text>
		</view>
		<!-- 签到奖励弹窗 -->
		<view v-show="signReward" class="mask" />
		<view v-show="signReward" class="dialog bg-white colum p10 txtcenter">
			<view class="orange rout icon-youhuiquan f40 mb5" />
			<text class="f14 gray-6">获得一张加价券，请注意查收！</text>
		</view>
		<!-- 活动 -->
		<view class="column">
			<!-- <block v-for="(item,index) in list" :key="index">
				<navigator :url="item.url">
					<image class="activityimg radius8" :src="item.image" mode="widthFix" />
				</navigator>
			</block> -->
			<!-- 测试效果 -->
			<!-- <navigator url="../invite/invite">
				<image class="activityimg radius8" src="../../static/images/swiper1.png" mode="widthFix" />
			</navigator>
			<navigator url="../invite/invite">
				<image class="activityimg radius8" src="../../static/images/swiper2.png" mode="widthFix" />
			</navigator>
			<navigator url="../activity/activity">
				<image class="activityimg radius8" src="../../static/images/swiper3.png" mode="widthFix" />
			</navigator> -->
			<!-- 测试结束 -->
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
				signReward: false,	//签到奖励提示弹窗
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
						if (Number(that.signNum) == 7) {	//签到第七天，奖励弹窗显示
							that.signReward = true;
							setTimeout(function() {	//弹窗显示一会就自动关闭
								that.signReward = false;
							},3000);
						}else {
							that.$util.showToast( res.data.results, 'none', 2500);
						}
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
						// that.signNum = 6; //测试
						console.log(res)
						//确认今天有没有签到，签到的话要把signtype的值变为false，让按钮变灰
						let time1 = that.day.slice(0,10); //当前日期，用于判断今天是否签到
						res.forEach(item => {
							let time2 = item.signTime.slice(0,10);
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
	.signDay {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: #DDDDDD;
		margin: 6px 1px;
	}
	.signDay--active {
		margin-top: 2px;
	}
	.line {
		border: 1px solid #DDDDDD;
		width: 100%;
	}
	.line--active {
		border: 1px solid #FF8800;
		width: 100%;
	}
	.signbtn {
		padding: 5px 10px;
		color: #FFFFFF;
		width: 70%;
		text-align: center;
		margin: 5px 0;
	}
	.activityimg {
		width: 100%;
		margin-bottom: 10px;
	}
	/* 签到奖励弹窗样式 */
	.dialog {
		position: fixed;
		z-index: 101;
		width: 50%;
		max-width: 300px;
		top: 45vh;
		left: 50%;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
		border-radius: 8px;
	}
</style>
