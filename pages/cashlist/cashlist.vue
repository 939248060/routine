<template>
	<view>
		<view class="viewRow jcbetween  top black">
			<view class="top-left txtcenter column">
				<view class="dis_block f20 white">{{customer.cash}}</view>
				<view class="dis_block f12 white">零钱余额</view>
			</view>
			<view class="top-right txtcenter column">
				<view class="dis_block f20 white">{{customer.countCash}}</view>
				<view class="dis_block f12 white">累计收入</view>
			</view>
		</view>
		<view class="scroll">
			<scroll-view scroll-y="true" :style="'height:' + scrollHeight + 'px;'" data-state="0" @scrolltoupper="refresh"
			 @scrolltolower="loadMore" upper-threshold="3" lower-threshold="8">
				<block v-for="(items,index) in list" :key="index">
					<view class="date d1 ml5">
						<text class="f14">{{items.id}}</text>
					</view>
					<navigator v-for="(item,index) in items.data" :key="index" :url="'../cashdetails/cashdetails?item='+ encodeURIComponent(JSON.stringify(item.cash))">
						<view class="row jcbetween aicenter cashlist">
							<view class="radius6">
								<!-- 显示日 -->
								<text class="dis_block f18 black bold9">{{item.day}}</text>
								<!-- 显示周 -->
								<text class="dis_block f10">{{item.week}}</text>
							</view>
							<view>
								<view class="black">{{item.cash.item}}</view>
							</view>
							<view class="f18 green" v-if="item.cash.cash >= 0">+{{item.cash.cash}}</view>
							<view class="f18 red" v-else-if="item.cash.cash < 0">{{item.cash.cash}}</view>
							<view class="f18 red" v-else>null</view>
						</view>
					</navigator>
				</block>
				<view v-if="btmp=='noData'" class="noData">
					<icon class="rout icon-kongshuju"></icon>
					<view>您还没有零钱收支的明细</view>
				</view>
				<view class="bottom" v-if="btmp=='noMore'">
					<text>已经到底啦</text>
					<view></view>
				</view>
				<view class="bottom" v-else-if="btmp=='load'">加载更多...</view>
			</scroll-view>
		</view>
		<!--过度遮罩-->
		<loading />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				host: '', // 主机地址
				scrollHeight: 0, // 设备高度
				btmp: 'noData',
				pageSize: 20, //每页显示的记录数
				isLoading: false, // 列表是否正在刷新
				list: [], //分组后用户零钱明细数组
				page: {}, //分页信息
				map: {}, //用于分组，根据年月进行分组
				customer: {}, //用户信息(零钱余额和累计零钱收入)
			}
		},
		methods: {
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
				if (that.btmp == 'noMore') //没有下一页不再去请求服务器
					return;
				// 避免多次触发获取更多function
				if (that.isLoading == true) {
					that.$util.showToast("正在获取数据", 'none', 2000);
					return;
				}
				if (that.page.currentPage < that.page.allPageAmount) { // 当前页小于总页数
					that.btmp = "load";
					that.getList(that.page.currentPage + 1, "add"); // 加载更多
				}
			},
			//获取用户积分明细
			getList: function(curr, rid) {
				let that = this;
				uni.showNavigationBarLoading(); // 标题栏显示加载状态
				that.isLoading = true; // 更改读取状态
				let data = {
					pageSize: that.pageSize,
					currPage: curr
				};
				that.$showLoading(); // 显示遮罩
				that.$request.postToken("/users/cash/findPage.do", data).then((res) => {
					if (res.data.status === 0) {
						let list = JSON.parse(res.data.results);
						if (list != null && list.length > 0) {
							if (rid == "new") {
								that.list = [];
								that.map = [];
								that.btmp = 'load';
								that.gourpByList(list);
							} else {
								that.gourpByList(list); //分组存储
							}
							that.page = res.data.page; //设置分页信息
							// 当前页为最后一页
							if (res.data.page != null)
								if (res.data.page.currentPage >= res.data.page.allPageAmount) {
									that.btmp = 'noMore';
								}
						} else {
							if (rid == "new") { // 获取最新数据未返回则显示无相关订单
								that.btmp = 'noData';
							}
						}
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err, 'none', 5000);
				}).finally(() => {
					that.$hideLoading();
					uni.hideNavigationBarLoading(); // 隐藏标题栏加载状态
					uni.stopPullDownRefresh(); // 停止下拉刷新
					that.isLoading = false // 更改读取状态
				})
			},
			/**
			 * 根据后台按年月进行分组
			 */
			gourpByList: function(arr) {
				let that = this;
				let map = that.map;
				let list = that.list;
				for (let i = 0; i < arr.length; i++) {
					let ai = arr[i];
					if (ai.insTime == null) continue; //没有录入时间的不进行分组，且不显示该明细
					let ymd = ai.insTime.split(" ")[0]; //获取年月日字符串
					let dateArr = ymd.split("-"); //获取年月日数组
					let ym = dateArr[0] + "年" + dateArr[1] + "月";
					if (!map[ym]) { //当前年月不在map中，则把当前年月加到map中
						list.push({
							id: ym,
							data: [{
								cash: ai, //设置量心币明细列表
								week: that.$util.getWeek(ymd), //设置周
								day: dateArr[2] //设置日
							}]
						});
						map[ym] = ai; //增加到map对象中
					} else {
						for (let j = 0; j < list.length; j++) {
							let dj = list[j];
							if (dj.id == ym) { //判断当前dj对象年月是否等于当前年月
								dj.data.push({
									cash: ai,
									week: that.$util.getWeek(ymd),
									day: dateArr[2]
								});
								break;
							}
						}
					}
				}
				//设置Data里map值,list值
				that.map = map;
				that.list = list;
			},
			//获取用户的总量心币信息
			getTatalCash: function() {
				let that = this;
				that.$showLoading(); //显示遮罩
				that.$request.postToken("/users/customer/findInfo.do", null).then((res) => {
					if (res.data.status === 0) {
						let customer = JSON.parse(res.data.results); //把Json字符串转化为JavaScrict对象
						that.customer = customer;
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err, 'none', 5000);
				}).finally(() => {
					that.$hideLoading(); //   隐藏遮罩
				})
			}
		},
		onLoad() {
			let that = this;
			that.scrollHeight = that.$app.globalData.systemInfo.windowHeight -8; // 从全局中获取屏幕高度
			that.getList(1, 'new');
			that.getTatalCash(); //获取用户零钱信息
		},
		onPullDownRefresh() {
			let that = this;
			that.getList(1, 'new');
			that.getTatalCash(); //获取用户零钱信息
		}

	}
</script>

<style>
	.top {
		position: fixed;
		left: 0px;
		top: 0px;
		z-index: 100;
		width: 100%;
		height: 84px;
		align-items: center;
		justify-content: center;
		padding: 20px 0rpx;
		background: #00a2ed;
	}

	.top-left {
		width: 50%;
		height: 100%;
	}

	.top-right {
		width: 50%;
		height: 100%;
	}

	/*列表顶部年月view */
	.date {
		height: 20px;
		width: 100%;
	}
	
	.scroll{
		position: absolute;
		width: 100%;
		top: 85px;
	}

	.cashlist {
		background: #fff;
		border-bottom: 1px solid #eee;
		padding: 5px;
	}

	.cashlist>view:nth-child(1) {
		width: 10%;
		text-align: center;
		border-top: 15rpx solid #ccc;
		border-left: 2rpx solid #ccc;
		border-right: 2rpx solid #ccc;
		border-bottom: 2rpx solid #ccc;
		margin-left: 12rpx;
	}

	.cashlist>view:nth-child(2) {
		width: 62%;
	}

	.cashlist>view:nth-child(3) {
		width: 20%;
		text-align: right;
		padding-right: 8px;
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
		padding-top: 40px;
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
