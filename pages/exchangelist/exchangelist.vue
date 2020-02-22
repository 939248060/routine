<template>
	<view>
		<view class="swiper-tab viewRow">
			<view data-current="0" :class="currentTab==0?'selectOn':''" @click="swichNav">全部订单</view>
			<view data-current="1" :class="currentTab==1?'selectOn':''" @click="swichNav">备货中</view>
			<view data-current="2" :class="currentTab==2?'selectOn':''" @click="swichNav">待收货</view>
		</view>

		<swiper :current="currentTab" :style="'height:'+scrollHeight+'px;'" @change='bindChange' class="swiper">
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:'+scrollHeight+'px;'" data-state="0" @scrolltoupper="refresh"
				 @scrolltolower="loadMore" upper-threshold="3" lower-threshold="5">
					<block :key="index" v-for="(item,index) in list[0]">
						<view v-if="item.state=='1'" class="list m10 pb10 pt5 pr15 pl15">
							<view class="viewRow">
								<view>
									<navigator url="../wareslist/wareslist">
										<text class="rout icon-shangcheng mr5"></text>量心商城<text class="rout icon-dayuhao f12 ml10"></text>
									</navigator>
								</view>
								<view class="orange">备货中</view>
							</view>
							<view class="viewRow pt15">
								<view>
									<image :src="host + item.photoPath" class="img" mode="widthFix" />
								</view>
								<view class="viewRow pl10">
									<view class="black">兑换 {{item.waresName}}</view>
									<view class="viewRow pt5">
										<view>量心币：<text class="orange">{{item.score}}</text>币</view>
										<view>x{{item.amount}}</view>
									</view>
								</view>
							</view>
							<view class="black pt10 txtright">
								<view>共兑换<text class="orange">{{item.amount}}</text>件商品 合计:
									<text class="orange">{{item.totalScore}}</text> 量心币
								</view>
							</view>
						</view>
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
				<scroll-view scroll-y="true" :style="'height:'+scrollHeight+'px;'" data-state="1" @scrolltoupper="refresh"
				 @scrolltolower="loadMore" upper-threshold="3" lower-threshold="5">
					<block :key="index" v-for="(item,index) in list[1]">
						<view class="list m10 pb10 pt5 pr15 pl15">
							<view class="viewRow">
								<view>
									<navigator url="../wareslist/wareslist">
										<icon class="rout icon-shangcheng mr5"></icon>量心商城<icon class="rout icon-dayuhao f12 ml10"></icon>
									</navigator>
								</view>
								<view class="orange">备货中</view>
							</view>
							<view class="viewRow pt15">
								<view>
									<image :src="host + item.photoPath" class="img" mode="widthFix" />
								</view>
								<view class="viewRow pl10">
									<view class="black">兑换 {{item.waresName}}</view>
									<view class="viewRow pt5">
										<view>量心币：<text class="orange">{{item.score}}</text>币</view>
										<view>x{{item.amount}}</view>
									</view>
								</view>
							</view>
							<view class="black pt10 txtright">
								<view>共兑换<text class="orange">{{item.amount}}</text>件商品 合计:
									<text class="orange">{{item.totalScore}}</text> 量心币
								</view>
							</view>
						</view>
					</block>
					<view v-if="btmp1=='noData'" class="noData">
						<icon class="rout icon-kongshuju"></icon>
						<view>您还没有相关的订单</view>
					</view>
					<view class="bottom" v-if="btmp1=='noMore'"><text>已经到底啦</text>
						<view></view>
					</view>
					<view class="bottom" v-else-if="btmp2=='loadMore'">加载更多...</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:'+scrollHeight+'px;'" data-state="2" @scrolltoupper="refresh"
				 @scrolltolower="loadMore" upper-threshold="2" lower-threshold="5">
					<block :key="index" v-for="(item,index) in list[2]">
						<view class="list m10 pb10 pt5 pr15 pl15">
							<view class="viewRow">
								<view>
									<navigator url="../wareslist/wareslist">
										<icon class="rout icon-shangcheng mr5"></icon>量心商城<icon class="rout icon-dayuhao f12 ml10"></icon>
									</navigator>
								</view>
								<view class="orange">待收货</view>
							</view>
							<view class="viewRow pt15">
								<view>
									<image :src="host + item.photoPath" class="img" mode="widthFix" />
								</view>
								<view class="viewRow pl10">
									<view class="black">兑换 {{item.waresName}}</view>
									<view class="viewRow pt5">
										<view>量心币：<text class="orange">{{item.score}}</text>币</view>
										<view>x{{item.amount}}</view>
									</view>
								</view>
							</view>
							<view class="black pt10 txtright">
								<view>共兑换<text class="orange">{{item.amount}}</text>件商品 合计:
									<text class="orange">{{item.totalScore}}</text> 量心币
								</view>
							</view>
						</view>
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
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				host: '', // 主机地址
				currentTab: 0, // 当前Tab
				scrollHeight: 0, // 设备高度
				btmp0: 'loadMore', // 所有兑换订单scroll底部panel
				btmp1: 'loadMore', // 备货中订单scroll底部panel
				btmp2: 'loadMore', // 待收货订单scroll底部panel
				list: [], // id:0==所有兑换订单  id:2==备货中订单   id:4==待收货订单
				page: [] // 0:所有兑换订单  1:备货中订单   2:待收货订单
			}
		},
		methods: {
			// 点击选项卡事件
			swichNav: function(e) {
				let that = this;
				let curr = e.currentTarget.dataset.current;
				that.currentTab = curr;
				// #ifdef MP-ALIPAY
					that.getList(1, curr, 'new');
					console.log("支付宝")
				// #endif 
			},
			// 滑动swiper获取数据
			bindChange: function(e) {
				let that = this;
				let curr = e.detail.current;
				that.currentTab = curr;
				that.getList(1, curr, 'new');
			},
			// 下拉获取最新数据
			refresh: function() {
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
				// 避免多次触发获取更多function
				if (that.isLoading == true) {
					that.$util.showToast("正在获取数据", 'none', 2000);
					return;
				}
				let state = Number(e.currentTarget.dataset.state); // 获取当前scroll的state值
				let tab = that.currentTab; // 获取当前显示Tab
				let btmp = "btmp" + state;
				let p = that.page[state]; // 获取state对应分页数据
				/**
				 * 当前页小于总页数
				 * 底部panel显示加载中
				 * 执行获取订单function
				 */
				if (p.currentPage < p.allPageAmount) {
					that[`${btmp}`] = "loadMore";
					that.getList(p.currentPage + 1, tab, "add");
				}
			},
			// 获取积分兑换订单
			getList: function(curr, tab, rid) {
				let that = this;
				that.$showLoading(); //显示遮罩
				uni.showNavigationBarLoading(); // 标题栏显示加载状态
				that.isLoading = true; // 更改读取状态
				let state = tab;
				let data = {
						state: state,
						currPage: curr,
						pageSize: 10
				};
				let btmp = 'btmp' + state;
				that.$request.postToken("/users/exchawares/findPage.do", data).then((res) => {
					if (res.data.status === 0) {
						let btm = (res.data.page.currentPage >= res.data.page.allPageAmount) ? 'noMore' : 'loadMore';
						if (rid == "new") { // 判断当前读取是刷新读取还是加载读取
							that.$set(that.list, state, JSON.parse(res.data.results));
						} else {
							that.$set(that.list, state, that.list[state].concat(JSON.parse(res.data.results)));
						}
						that.$set(that.page, state, res.data.page);
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

				// wx.getStorage({
				// 	key: 'custToken',
				// 	success: function(res) {
				// 		var token = res.data;
				// 		wx.request({
				// 			url: that.data.host + '/servlet/exchange/findExchangePageUSER',
				// 			method: 'post',
				// 			data: {
				// 				state: state,
				// 				currPage: curr,
				// 				pageSize: 10
				// 			},
				// 			header: {
				// 				'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
				// 				'token': token
				// 			},
				// 			success: function(dom) {
				// 				util.isLogin(dom.header);
				// 				console.log(dom);
				// 				var res = dom.data;
				// 				let btmp = "btmp" + state;
				// 				if (res != null && res != "") {
				// 					let list = "list[" + state + "]"; // 存储列表数据
				// 					let page = "page[" + state + "]"; // 存储分页数据              
				// 					that.setData({
				// 						[page]: res.page
				// 					});
				// 					if (rid == "new") {
				// 						that.setData({
				// 							[list]: res.list
				// 						});
				// 					} else {
				// 						that.setData({
				// 							[list]: that.data.list[state].concat(res.list)
				// 						})
				// 					}
				// 					// 当前页为最后一页
				// 					if (res.page.currentPage >= res.page.allPageAmount) {
				// 						that.setData({
				// 							[btmp]: 'noMore'
				// 						});
				// 					}
				// 				} else {
				// 					if (rid == "new") { // 获取最新数据未返回则显示无相关订单
				// 						that.setData({
				// 							[btmp]: 'noData'
				// 						});
				// 					}
				// 				}
				// 			},
				// 			fail: function(err) {
				// 				console.log(err);
				// 				util.showToast(err.errMsg, 'none', 3000);
				// 			},
				// 			complete: function(com) {
				// 				that.setData({
				// 					isLoading: false
				// 				});
				// 				wx.hideNavigationBarLoading();
				// 				wx.stopPullDownRefresh();
				// 				wx.hideToast();
				// 			}
				// 		});
				// 	},
				// 	fail: function(err) {
				// 		console.log(err);
				// 		//util.showToast(err.errMsg, 'none', 3000);
				// 		wx.redirectTo({
				// 			url: '../login/login'
				// 		});
				// 	}
				// })
			}
		},
		onLoad(options) {
			let that = this;
			that.host = that.$app.globalData.host;				// 从全局中获取主机地址
			that.scrollHeight = that.$app.globalData.systemInfo.windowHeight + 8;      // 从全局中获取屏幕高度  
			//console.log(that.data.scrollHeight);
			if (options.state != null) {
				that.currentTab = options.state;
			}
			console.log("ss")
			that.getList(1, that.currentTab, 'new');
		},
		onPullDownRefresh() {
			let that = this;
			let state = that.currentTab;
			that.getList(1, state, 'new');
		}
	}
</script>

<style>
	.swiper-tab {
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



	.swiper-tab>view {
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
		position: absolute;
		top: 36px;
		width: 100%;
	}

	.list {
		background: #fff;
		box-shadow: 0px 0px 10px #ccc;
		border-radius: 10px;
	}

	.list>view:nth-child(1) {
		width: 100%;
		align-items: flex-end;
		justify-content: space-between;
	}

	.list>view:nth-child(2) {
		width: 100%;
		justify-content: left;
	}

	.list>view:nth-child(2)>view:nth-child(1) {
		width: 25%;
	}

	.list>view:nth-child(2)>view:nth-child(2) {
		width: 75%;
		align-content: flex-start;
	}

	.list>view:nth-child(2)>view:nth-child(2)>view:nth-child(2) {
		width: 100%;
		justify-content: space-between;
	}



	.img {
		width: 100%;
		vertical-align: middle;
	}

	.noData {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #aaa;
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
