<template>
	<!-- 智能站订单列表 -->
	<view>
		<view class="top-tab row txtcenter bg-white f16">
			<view data-current="0" :class="currentTab==0?'blue1':''" @click="swichNav">全部订单</view>
			<view data-current="1" :class="currentTab==1?'blue1':''" @click="swichNav">待检验</view>
			<view data-current="2" :class="currentTab==2?'blue1':''" @click="swichNav">异常单</view>
		</view>

		<swiper :current="currentTab" :style="'height:'+scrollHeight+'px;'" @change='bindChange' class="swiper">
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:'+scrollHeight+'px;'" data-state="0" @scrolltoupper="refresh"
				 @scrolltolower="loadMore" upper-threshold="3" lower-threshold="5">
					<block v-for="(item,index) in list[0]" :key="index">
						<navigator :url="'../smartorderinfo/smartorderinfo?id='+item.binorderId" class="m10 p10 bg-white shadow radius8">
							<view class="row jcbetween aicenter mb5 black f16">
							  <view class="row jcleft aicenter elips">
							    <view class="bold mr10">{{item.expType}}</view>
							    <view v-if="item.state==1" class="box boxgray f12 radius8">待投放</view>
							    <view v-else-if="item.state==2" class="box boxorange f12 radius8">待检验</view>
							    <view v-else-if="item.state==3" class="box boxgreen f12 radius8">已完成</view>
							    <view v-else-if="item.state==4" class="box boxred f12 radius8">异常单</view>
							  </view>
							  <view v-if="item.state==2" class="red f18">
							    <text class="gray f12">预估：</text>￥{{item.expTotalPrice}}
							  </view>
							  <view v-else-if="item.state==3" class="green f18">￥{{item.actTotalPrice}}</view>
							</view>
							<!-- 异常信息 -->
							<view v-if="item.abnormal.length>0" class="row jcleft aicenter mb5 f12">
							  <view v-for="(abnormal,i) in item.abnormal" :key="i" class="lab labpurple radius8 mr5">{{abnormal}}</view>
							</view>
							<view>投放时间：{{item.beginTime}}</view>
							<view v-if="item.state==2">投放重量：{{item.expAmount}} 公斤</view>
							<view v-else-if="item.state==3">检验重量：{{item.actAmount}} 公斤</view>
						</navigator>
					</block>
					<view v-if="btmp0=='noData'" class="noData">
						<image src="../../static/images/wudingdan.png" mode="widthFix" style="width: 240px;" />
						<text>您还没有相关的订单</text>
					</view>
					<view class="bottom" v-if="btmp0=='noMore'"><text>已经到底啦</text><view /></view>
					<view class="bottom" v-else-if="btmp0=='loadMore'">加载更多...</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:'+scrollHeight+'px;'" data-state="2" @scrolltoupper="refresh"
				 @scrolltolower="loadMore" upper-threshold="3" lower-threshold="5">
					<block :key="index" v-for="(item,index) in list[2]">
						<navigator :url="'../smartorderinfo/smartorderinfo?id='+item.binorderId" class="m10 p10 bg-white shadow radius8">
							<view class="row jcbetween aicenter mb5 black f16">
							  <view class="row jcleft aicenter elips">
							    <view class="bold mr10">{{item.expType}}</view>
							    <view class="box boxorange f12 radius8">待检验</view>
							  </view>
							  <view class="red f18">
							    <text class="gray f12">预估：</text>￥{{item.expTotalPrice}}
							  </view>
							</view>
							<view>投放时间：{{item.beginTime}}</view>
							<view v-if="item.state==2">投放重量：{{item.expAmount}} 公斤</view>
						</navigator>
					</block>
					<view v-if="btmp2=='noData'" class="noData">
						<image src="../../static/images/wudingdan.png" mode="widthFix" style="width: 240px;" />
						<text>您还没有相关的订单</text>
					</view>
					<view class="bottom" v-if="btmp2=='noMore'"><text>已经到底啦</text><view /></view>
					<view class="bottom" v-else-if="btmp2=='loadMore'">加载更多...</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:'+scrollHeight+'px;'" data-state="4" @scrolltoupper="refresh"
				 @scrolltolower="loadMore" upper-threshold="3" lower-threshold="5">
					<block :key="index" v-for="(item,index) in list[4]">
						<navigator :url="'../smartorderinfo/smartorderinfo?id='+item.binorderId" class="m10 p10 bg-white shadow radius8">
							<view class="row jcbetween aicenter mb5 black f16">
							  <view class="row jcleft aicenter elips">
							    <view class="bold mr10">{{item.expType}}</view>
							    <view class="box boxred f12 radius8">异常单</view>
							  </view>
							  <view class="red f18">
							    <text class="gray f12">预估：</text>￥{{item.expTotalPrice}}
							  </view>
							</view>
							<!-- 异常信息 -->
							<view v-if="item.abnormal.length>0" class="row jcleft aicenter mb5 f12">
							  <view v-for="(abnormal,i) in item.abnormal" :key="i" class="lab labpurple radius8 mr5">{{abnormal}}</view>
							</view>
							<view>投放时间：{{item.beginTime}}</view>
							<view>投放重量：{{item.expAmount}} 公斤</view>
						</navigator>
					</block>
					<view v-if="btmp4=='noData'" class="noData">
						<image src="../../static/images/wudingdan.png" mode="widthFix" style="width: 240px;" />
						<text>您还没有相关的订单</text>
					</view>
					<view class="bottom" v-else-if="btmp4=='noMore'"><text>已经到底啦</text><view /></view>
					<view class="bottom" v-else-if="btmp4=='loadMore'">加载更多...</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		
		<!-- 遮罩 -->
		<loading />
	</view>
</template>

<script>
	const util = require('../../utils/util.js');
	const StringUtil = require('../../utils/stringUtil.js');
	const request = require('../../utils/request.js');

	export default {
		data() {
			return {
				currentTab: 0, // 当前Tab
				scrollHeight: 0, // 设备高度
				btmp0: 'loadMore', // 所有投放订单scroll底部panel
				btmp2: 'loadMore', // 待检验投放单scroll底部panel
				btmp4: 'loadMore', // 异常投放单scroll底部panel
				list: [], // id:0==所有投放订单  id:2==等待检验订单   id:4==检验异常订单
				page: [] // 0:所有投放订单  1:等待检验订单   2:检验异常订单
			}
		},
		methods: {
			// 点击选项卡事件
			swichNav: function(e) {
				let that = this;
				that.currentTab = e.currentTarget.dataset.current;
				// #ifdef MP-ALIPAY
					that.getList(1, that.currentTab, 'new');
					console.log("支付宝")
				// #endif 
			},
			// 滑动swiper获取数据
			bindChange: function(e) {
				let that = this;
				that.currentTab = e.detail.current;
				console.log(e.detail.current)
				that.getList(1, e.detail.current, 'new');
			},
			// 下拉获取最新数据
			refresh: function(e) {
				let that = this;
				clearTimeout(that.timer);
				if (that.isLoading == false) {
					that.isLoading = true;
					setTimeout(function() {
						uni.startPullDownRefresh({
							success(res) {
								console.log("refresh开始下拉"); 
							}
						})
					}, 350);
				}
			},
			// 上拉加载更多
			loadMore: function(e) {
				let that = this;
				if (that.isLoading == true) { // 避免多次触发获取更多function
					that.$util.showToast("正在获取数据", 'none', 2000);
					return;
				}
				let state = Number(e.currentTarget.dataset.state); // 获取当前scroll的state值
				let tab = that.currentTab; // 获取当前显示Tab
				let btmp = "btmp" + state;
				let p = that.page[state]; // 获取state对应分页数据    
				if (p.currentPage < p.allPageAmount) { // 当前页小于总页数,底部panel显示加载中,执行获取订单function
					that[`${btmp}`] = "loadMore"
					that.getList(p.currentPage + 1, tab, "loadMore");
				}
			},
			getList: function(curr, tab, rid) {
				let that = this; 
				let state = 0;
				if (tab == "1") { // 1号swiper-item加载待检验订单数据
					state = 2;
				} else if (tab == "2") { // 2号swiper-item加载检验异常订单数据
					state = 4;
				}
				let data = {
					pageSize: 20,
					currPage: curr,
					state: state
				};
				uni.showNavigationBarLoading(); // 标题栏显示加载状态
				that.$showLoading(); // 显示遮罩
				that.isLoading = true; // 更改读取状态
				let btmp = "btmp" + state; // list底部状态
				that.$request.postToken("/users/binorder/findPage.do", data).then((res) => {
					if (res.data.status === 0) {
						let btm = (res.data.page.currentPage >= res.data.page.allPageAmount) ? 'noMore' : 'loadMore';
						if (rid == "new") { // 判断当前读取是刷新读取还是加载读取
							that.$set(that.list,state,JSON.parse(res.data.results));
						} else {
							that.$set(that.list,state,that.list[state].concat(JSON.parse(res.data.results)));
						}
						that.$set(that.page,state,res.data.page);
						that[`${btmp}`] = btm;
						console.log(that.list)
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err.errMsg, 'none', 5000);
					if (err.errMsg === '401') {
						uni.redirectTo({
							url: '../login/login'
						});
					}
				}).finally(() => {
					if (that.list[state] == null || that.list[state].length == 0) {
						that[`${btmp}`] = "noData"
					}
					that.$hideLoading();
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh();
					that.isLoading = false; // 更改读取状态
				})
			},
		},
		onLoad(options) {
			let that = this;
			if (that.$stringUtil.isNotEmpty(options.state)) {
				that.currentTab = options.state;
			}
			that.getList(1, that.currentTab, 'new');
		},
		onReady() {
			let that = this;
			that.getList(1, that.currentTab, 'new'); 
			that.scrollHeight = that.$app.globalData.systemInfo.windowHeight + 6;// 从全局中获取屏幕高度
		},
		onPullDownRefresh() { 
			let that = this;  
			that.getList(1, that.currentTab, 'new');
		}
	}
</script>

<style>
</style>
