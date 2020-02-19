<template>
	<view>
		<!--pages/dryorderlist/dryorderlist.wxml-->
		<view class="top-tab viewRow">
			<view data-current="0" :class=" currentTab==0?'selectOn':'' " @click="swichNav">全部订单</view>
			<view data-current="1" :class=" currentTab==1?'selectOn':'' " @click="swichNav">待检验</view>
			<view data-current="2" :class=" currentTab==2?'selectOn':'' " @click="swichNav">异常单</view>
		</view>

		<swiper :current="currentTab" :style="'height:'+scrollHeight+'px;'" @change='bindChange' class="swiper">
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:'+scrollHeight+'px;'" data-state="0" @scrolltoupper="refresh"
				 @scrolltolower="loadMore" upper-threshold="3" lower-threshold="8">
					<block :key="index" v-for="(item,index) in list[0]">
						<navigator :url="'../dryorderinfo/dryorderinfo?id='+item.boxorderId">
							<view class="list m10 p10" v-if="item.state=='2'">
								<view class="viewRow pb10">
									<view>{{item.expType}}</view>
									<view class="orange">待检验</view>
								</view>
								<view>投放时间：{{item.beginTime}}</view>
								<view>预计产生：<b class="f18 gray-3">{{item.expTotalScore}}</b> 量心币</view>
							</view>
							<view class="list m10 p10" v-else-if="item.state=='3'">
								<view class="viewRow pb10">
									<view>{{item.expType}}</view>
									<view class="green">已完成</view>
								</view>
								<view>投放时间：{{item.beginTime}}</view>
								<view>实际产生：<b class="f18 orange">{{item.actTotalScore}}</b> 量心币</view>
							</view>
							<view class="list m10 p10" v-else-if="item.state=='4'">
								<view class="viewRow pb10">
									<view>{{item.expType}}</view>
									<view class="red">异常单</view>
								</view>
								<view>投放时间：{{item.beginTime}}</view>
								<view>实际产生：<b class="f18 orange">{{item.actTotalScore}}</b> 量心币</view>
							</view>
						</navigator>
					</block>
					<view v-if="btmp0=='noData'" class="noData">
						<icon class="rout icon-kongshuju"></icon>
						<view>您还没有相关的订单</view>
					</view>
					<view class="bottom" v-if="btmp0=='noMore'"><text>已经到底啦</text>
						<view></view>
					</view>
					<view class="bottom" v-else-if="btmp0=='loadMore'">加载更多...</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:'+scrollHeight+'px;'" data-state="2" @scrolltoupper="refresh"
				 @scrolltolower="loadMore" upper-threshold="2" lower-threshold="5">
					<block :key="index" v-for="(item,index) in list[2]">
						<navigator :url="'../dryorderinfo/dryorderinfo?id='+item.boxorderId">
							<view class="list m10 p10">
								<view class="viewRow pb10">
									<view>{{item.expType}}</view>
									<view class="orange">待检验</view>
								</view>
								<view>投放时间：{{item.beginTime}}</view>
								<view>预计产生：<b class="f18 gray-3">{{item.expTotalScore}}</b> 量心币</view>
							</view>
						</navigator>
					</block>
					<view v-if="btmp2=='noData'" class="noData">
						<icon class="rout icon-kongshuju"></icon>
						<view>您还没有相关的订单</view>
					</view>
					<view class="bottom" v-if="btmp2=='noMore'"><text>已经到底啦</text>
						<view></view>
					</view>
					<view class="bottom" v-else-if="btmp2=='loadMore'">加载更多...</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:'+scrollHeight+'px;'" data-state="4" @scrolltoupper="refresh"
				 @scrolltolower="loadMore" upper-threshold="2" lower-threshold="5">
					<block :key="index" v-for="(item,index) in list[4]">
						<navigator :url="'../dryorderinfo/dryorderinfo?id='+item.boxorderId">
							<view class="list m10 p10">
								<view class="viewRow pb10">
									<view>{{item.expType}}</view>
									<view class="red">异常单</view>
								</view>
								<view>投放时间：{{item.beginTime}}</view>
								<view>实际产生：<b class="f18 orange">{{item.actTotalScore}}</b> 量心币</view>
							</view>
						</navigator>
					</block>
					<view v-if="btmp4=='noData'" class="noData">
						<icon class="rout icon-kongshuju"></icon>
						<view>您还没有相关的订单</view>
					</view>
					<view class="bottom" v-if="btmp4=='noMore'"><text>已经到底啦</text>
						<view></view>
					</view>
					<view class="bottom" v-else-if="btmp4=='loadMore'">加载更多...</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<loading />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				host: '', // 主机地址
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
			  swichNav: function (e) {
			    let that = this;
			    let curr = e.currentTarget.dataset.current;
				that.currentTab = curr;
				that.getList(1, curr, 'new');
			  },
			  // 滑动swiper获取数据
			  bindChange: function (e) {
			    let that = this;
			    let curr = e.detail.current;
			    that.currentTab = curr;
			    that.getList(1, curr, 'new');
			  },
			  // 下拉获取最新数据
			  refresh: function () {
			    let that = this;
			    clearTimeout(that.timer);
			    if (that.isLoading == false) {
				  that.isLoading = true;
			      setTimeout(function () {
			        uni.startPullDownRefresh({
			          success(res) {
			            console.log("refresh开始下拉");
			          }
			        })
			      }, 350);
			    }
			  },
			  // 上拉加载更多
			  loadMore: function (e) {
			    let that = this;
			    // 避免多次触发获取更多function
			    if (that.isLoading == true) {
			      that.$util.showToast("正在获取数据", 'none', 2000);
			      return;
			    }
			    let state = Number(e.currentTarget.dataset.state);  // 获取当前scroll的state值
			    let tab = that.currentTab;                     // 获取当前显示Tab
			    let btmp = "btmp" + state;
			    let p = that.page[state];                      // 获取state对应分页数据
			
			    if (p.currentPage < p.allPageAmount) {            // 当前页小于总页数
				  that[`${btmp}`] = "loadMore";					  // 底部panel显示加载中
			      that.getList(p.currentPage + 1, tab, "add");   // 加载更多
			    }
			  },
			  // 获取干垃圾投放数据
			  getList: function (curr, tab, rid) {
			    let that = this;
			    uni.showNavigationBarLoading();                     // 标题栏显示加载状态
				that.isLoading = true;								// 更改读取状态
			    let state = 0;
			    if (tab == "1") {         // 1号swiper-item加载待检验订单数据
			      state = 2;
			    } else if (tab == "2") {  // 2号swiper-item加载检验异常订单数据
			      state = 4;
			    }
				let data = {
					pageSize: 10,
					currPage: curr,
					state
				};
				let btmp = "btmp" + state; 
				that.$showLoading();   //显示遮罩
				that.$request.postToken('/users/boxorder/findPage.do',data).then((res)=>{
					if (res.data.status === 0) {
						let btm = (res.data.page.currentPage >= res.data.page.allPageAmount) ? 'noMore' : 'loadMore';
						if (rid == "new") { // 判断当前读取是刷新读取还是加载读取
							that.$set(that.list,state,JSON.parse(res.data.results));
						} else {
							that.$set(that.list,state,that.list[state].concat(JSON.parse(res.data.results)));
						}
						that.$set(that.page,state,res.data.page);
						that[`${btmp}`] = btm;
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
					
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err.errMsg, 'none', 5000);
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
			that.host = that.$app.globalData.host;
			that.scrollHeight = that.$app.globalData.systemInfo.windowHeight + 8;
			if (options.state != null) {
			  that.currentTab = options.state;
			}
			that.getList(1, that.currentTab, 'new');
		},
		onReady() {
			let that = this;
		},
		onPullDownRefresh() {
			let that = this;
			let state = that.currentTab;
			console.log("onPullDownRefresh")
			that.getList(1, state, 'new');
		}
	}
</script>

<style>
	.top-tab {
		box-shadow: 0 10px 10px -7px #ddd inset;
		position: fixed;
		z-index: 200;
		width: 100%;
		top: 0;
		left: 0;
		align-items: center;
		justify-content: center;
		background: #fff;
	}

	.top-tab>view {
		width: 33.33%;
		color: #aaa;
		text-align: center;
		padding: 10px 0px;
		border-bottom: 1px #ccc solid;
	}

	.selectOn {
		color: #00a2ed !important;
		border-bottom: 2px solid #00a2ed !important;
	}

	.swiper {
		margin-top: 36px;
	}

	.list {
		background: #fff;
		box-sizing: border-box;
		box-shadow: 0px 0px 10px #ccc;
		border-radius: 10px;
	}

	.list>view:nth-child(1) {
		align-items: center;
		justify-content: space-between;
	}

	.list>view:nth-child(1)>view:nth-child(1) {
		font-size: 20px;
		color: #000;
	}

	.list>view:nth-child(3) {
		padding: 10px 0px 5px 0px;
		margin-top: 10px;
		border-top: 1rpx #eee solid;
	}

	.noData {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #999;
	}

	.noData>icon {
		font-size: 130px;
	}

	.noData>view {
		font-size: 18px;
	}

	.bottom {
		padding-bottom: 20px;
		width: 100%;
		text-align: center;
	}

	.bottom>view {
		height: 1px;
		border-top: 1px solid #ddd;
		margin: 0px 20px;
	}

	.bottom>text {
		padding: 0px 10px;
		background: #eee;
		position: relative;
		top: 10px;
	}
</style>
