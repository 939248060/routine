<template>
	<view>
		<view class="">
			<view class="head txtcenter">
				<text class="f26 green cash" v-if="detail.cash>0">+{{detail.cash}}</text>
				<text class="f26 red cash" v-else>{{detail.cash}}</text>
			</view>
			<view class="content">
				<view class="list">
					<text class="title f16">交易摘要</text>
					<text class="txt f16">{{detail.item}}</text>
				</view>
				<view class="list">
					<text class="title f16">交易时间</text>
					<text class="txt f16">{{detail.insTime}}</text>
				</view>
				<view class="list" v-if="detail.serialNum !=null">
					<text class="f16">交易订单号</text>
					<text class="f16">{{detail.serialNum}}</text>
				</view>
				<!-- <view class="list">
		        <text class="f16">交易类型</text>
		        <text class="f16" wx:if="{{detail.state==2}}">支出</text>
		        <text class="f16" wx:if="{{detail.state==1}}">收入</text>
		    </view> -->
				<view class="list">
					<text class="f16">余额</text>
					<text class="f16">{{detail.remaCash}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail:{}
			}
		},
		methods: {

		},
		onLoad(options) {
			let that = this;
			that.detail = JSON.parse(decodeURIComponent(options.item));
		}
	}
</script>

<style>
	.head {
		height: 150rpx;
		width: 100%;
		background-color: white;
	}

	.cash {
		line-height: 150rpx;
	}

	.content {
		width: 100%;
		background-color: white;
	}

	.content .list {
		display: flex;
		justify-content: space-between;
		width: 92%;
		line-height: 90rpx;
		margin: 0rpx 25rpx;
		color: black;
	}
</style>
