<template>
	<view class="content">
		<!-- 签到 -->
		<view class="card column bg-white pl15 pr15 pt10 pb10">
			<text class="txtcenter mb10">- 您已坚持 <text class="blue1 ml5 mr5">{{ num }}</text> 天签到 -</text>
			<view class="row mb10">
				<view class="column">
					<view class="rout icon-logo f24 ascenter mb5 ml5" :class="{'blue1': line, 'gray':!line}" />
					<view class="signday white radius10 txtcenter tnowrap" :class="{'boxblue1': line, 'boxgray':!line}">第1天</view>
				</view>
				<view class="asend mb10" :class="{'line--active': line, 'line':!line}" />
				<view class="column">
					<view class="rout icon-logo f24 ascenter mb5 ml5" :class="{'blue1': line, 'gray':!line}" />
					<view class="signday white radius10 txtcenter tnowrap" :class="{'boxblue1': line, 'boxgray':!line}">第2天</view>
				</view>
				<view class="asend mb10" :class="{'line--active': line, 'line':!line}" />
				<view class="column">
					<view class="rout icon-logo f24 ascenter mb5 ml5" :class="{'blue1': line, 'gray':!line}" />
					<view class="signday white radius10 txtcenter tnowrap" :class="{'boxblue1': line, 'boxgray':!line}">第3天</view>
				</view>
				<view class="asend mb10" :class="{'line--active': line, 'line':!line}" />
				<view class="column">
					<view class="rout icon-logo f24 ascenter mb5 ml5" :class="{'blue1': line, 'gray':!line}" />
					<view class="signday white radius10 txtcenter tnowrap" :class="{'boxblue1': line, 'boxgray':!line}">第4天</view>
				</view>
			</view>
			<view class="row ascenter" style="width: 70%;">
				<view class="column">
					<view class="rout icon-logo f24 ascenter mb5 ml5" :class="{'blue1': line2, 'gray':!line2}" />
					<view class="signday white radius10 txtcenter tnowrap" :class="{'boxblue1': line2, 'boxgray':!line2}">第5天</view>
				</view>
				<view class="asend mb10" :class="{'line--active': line2, 'line':!line2}" />
				<view class="column">
					<view class="rout icon-logo f24 ascenter mb5 ml5" :class="{'blue1': line2, 'gray':!line2}" />
					<view class="signday white radius10 txtcenter tnowrap" :class="{'boxblue1': line2, 'boxgray':!line2}">第6天</view>
				</view>
				<view class="asend mb10" :class="{'line--active': line2, 'line':!line2}" />
				<view class="column">
					<view class="rout icon-logo f24 ascenter mb5 ml5" :class="{'blue1': line2, 'gray':!line2}" />
					<view class="signday white radius10 txtcenter tnowrap" :class="{'boxblue1': line2, 'boxgray':!line2}">第7天</view>
				</view>
			</view>
			<view class="signbtn boxblue1 radius10 ascenter mt10 ">
				立即签到
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
				<navigator url="../activity/activity">
					<image class="activityimg radius8" src="../../static/images/swiper1.png" mode="widthFix" />
				</navigator>
				<navigator url="../activity/activity">
					<image class="activityimg radius8" src="../../static/images/swiper2.png" mode="widthFix" />
				</navigator>
				<navigator url="../activity/activity">
					<image class="activityimg radius8" src="../../static/images/swiper3.png" mode="widthFix" />
				</navigator>
			<!-- </block> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num: "0",	//签到天数
				line: true,
				line2: false
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.content {
		background-image: radial-gradient(circle at 50% -252px, #00a2ed, #00a2ed 360px, transparent 361px );
		padding: 10px 15px 0px;
	}
	.signday {
		padding: 1px 2px;
		display: inline-block;
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
