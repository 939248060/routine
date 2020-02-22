<template>
	<view>
		<view class="top-tab row txtcenter bg-white f14">
			<view :class="currentTab==0?'selectOn':''" data-current="0" @click="swichNav">全部</view>
			<view :class="currentTab==1?'selectOn':''" data-current="1" @click="swichNav">已完成</view>
			<view :class="currentTab==2?'selectOn':''" data-current="2" @click="swichNav">已失效</view>
		</view>

		<swiper :current="currentTab" :style="'height:'+scrollHeight+'px;'" @change='bindChange' class="swiper">
			<swiper-item>
				<!--全部scroll-->
				<scroll-view scroll-y="true" :style="'height:'+scrollHeight+'px;'" data-state="0" @scrolltolower="loadMore"
				 lower-threshold="5">
					<view v-for="(item,index) in list[0]" :key="index" class="list ml10 mr10 radius8">
						<!--订单类型及订单状态-->
						<view class="row jcbetween aicenter pt10 pb5 pl5 pr5 black f15">
							<view v-if="item.recyType==1" class="scraptype">
								<image src="../../static/images/tu1.png" />政府回收</view>
							<view v-else-if="item.recyType==2" class="scraptype">
								<image src="../../static/images/tu2.png" />家电回收</view>
							<view v-else-if="item.recyType==3" class="scraptype">
								<image src="../../static/images/tu3.png" />家具清运</view>
							<view v-else-if="item.recyType==4" class="scraptype">
								<image src="../../static/images/tu4.png" />商户回收</view>
							<view v-if="item.state==1" class="orange">待接单</view>
							<view v-else-if="item.state==2" class="blue1">待回收</view>
							<view v-else-if="item.state==3" class="green">已完成</view>
							<view v-else-if="item.state==4" class="gray">已失效</view>
						</view>
						<!--政府回收或商户回收预约时未指定明确品种-->
						<view v-if="item.recydetail==null||item.recydetail==''" class="row jcleft aicenter topeee btmeee p5">
							<image class="scrapImg" :src="host+'/images/routine/kehuishouwu.png'" :data-item="item" @click="tapInfo" />
							<view class="pl10">
								<view class="pb5">可回收物</view>
								<view class="gray f12">品种及重量待回收员上门确认</view>
							</view>
						</view>
						<!--单次回收多个物件-->
						<view v-else class="x-scroll topeee btmeee">
							<scroll-view scroll-x style="width: 100%;">
								<view v-for="(detail) in item.recydetail" :key="detail.recydetailId" class="scrapItem" :data-item="item" @click="tapInfo">
									<image class="scrapImg" :src="host+'/images/routine/'+detail.image" />
									<view>{{detail.scrapName}}</view>
								</view>
							</scroll-view>
						</view>
						<!--订单数量和价格，取消订单-->
						<view class="row jcbetween mt10 mb10 pl5 pr5">
							<!--家电、家具回收订单数量和价格-->
							<view v-if="item.recyType==2||item.recyType==3" class="row jcleft">
								<view class="mr15">X <text class="f16 blod black">{{item.recydetail.length}}</text> 件</view>
								<view>
									<block v-if="item.state!=3">预估：</block><text class="red">￥ <text class="bold f16">{{item.totalPrice}}</text>
										元</text>
								</view>
							</view>
							<view v-if="item.state==1||item.state==2" :data-id="item.recyorderId" class="cancelBtn pl15 pr15 red" @click='tapCancel'>取消订单</view>
						</view>
					</view>
					<!--没有数据显示-->
					<view v-if="btmp0=='noData'" class="noData">
						<icon class="rout icon-kongshuju"></icon>
						<view>没有订单</view>
					</view>
					<!--scorll底部-->
					<view class="bottom" v-if="btmp0=='noMore'"><text>已经到底啦</text>
						<view></view>
					</view>
					<view class="bottom" v-else-if="btmp0=='loadMore'">加载更多...</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<!--已完成scroll-->
				<scroll-view scroll-y="true" :style="'height:'+scrollHeight+'px;'" data-state="3" @scrolltolower="loadMore"
				 lower-threshold="5">
					<view v-for="(item,index) in list[3]" :key="index" class="list ml10 mr10 radius8">
						<!--下单时间及订单状态-->
						<view class="row jcbetween aicenter pt10 pb5 pl5 pr5 black f15">
							<view v-if="item.recyType==1" class="scraptype">
								<image src="../../static/images/tu1.png" />政府回收</view>
							<view v-else-if="item.recyType==2" class="scraptype">
								<image src="../../static/images/tu2.png" />家电回收</view>
							<view v-else-if="item.recyType==3" class="scraptype">
								<image src="../../static/images/tu3.png" />家具清运</view>
							<view v-else-if="item.recyType==4" class="scraptype">
								<image src="../../static/images/tu4.png" />商户回收</view>
							<view class="green">已完成</view>
						</view>
						<!--政府回收或商户回收预约时未指定明确品种-->
						<view v-if="item.recydetail==null||item.recydetail==''" class="row jcleft aicenter topeee btmeee p5">
							<image class="scrapImg" :src="host+'/images/routine/kehuishouwu.png'" :data-item="item" @click="tapInfo" />
							<view class="pl10">
								<view class="pb5">可回收物</view>
								<view class="gray f12">品种及重量待回收员上门确认</view>
							</view>
						</view>
						<!--单次回收多个物件-->
						<view v-else class="x-scroll topeee btmeee">
							<scroll-view scroll-x style="width: 100%;">
								<view v-for="(detail,index) in item.recydetail" :key="index" class="scrapItem" :data-item="item" @click="tapInfo">
									<image class="scrapImg" :src="host+'/images/routine/'+detail.image" />
									<view>{{detail.scrapName}}</view>
								</view>
							</scroll-view>
						</view>
						<!--政府回收订单重量和积分-->
						<view v-if="item.recyType==1" class="row jcbetween aicenter pt5 pb10 pl10 pr10">
							<view>x <text class="f16 black bold">{{item.amount}}</text> kg</view>
							<view class="orange"><text class="bold f16">{{item.totalScore}}</text> 量心币</view>
						</view>
						<!--家电、家具回收订单数量和价格-->
						<view v-else-if="item.recyType==2||item.recyType==3" class="row jcbetween aicenter pt5 pb10 pl10 pr10">
							<view>X <text class="f16 black">{{item.recydetail.length}}</text> 件</view>
							<view>
								<block v-if="item.state!=3">预估</block>回收价：<text class="red f16">￥ {{item.totalPrice}} 元</text>
							</view>
						</view>
						<!--商户回收订单重量和价格-->
						<view v-else-if="item.recyType==4" class="row jcbetween aicenter pt5 pb10 pl10 pr10">
							<view>x <text class="f15 black bold">{{item.amount}}</text> kg</view>
							<view class="red">￥ <text class="bold f16">{{item.totalPrice}}</text> 元</view>
						</view>
					</view>
					<!--没有数据显示-->
					<view v-if="btmp3=='noData'" class="noData">
						<icon class="rout icon-kongshuju"></icon>
						<view>没有订单</view>
					</view>
					<!--scorll底部-->
					<view class="bottom" v-if="btmp3=='noMore'"><text>已经到底啦</text>
						<view></view>
					</view>
					<view class="bottom" v-else-if="btmp3=='loadMore'">加载更多...</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<!--失效订单scroll-->
				<scroll-view scroll-y="true" :style="'height:'+scrollHeight+'px;'" data-state="4" @scrolltolower="loadMore"
				 lower-threshold="5">
					<view v-for="(item,index) in list[4]" :key="index" class="list ml10 mr10 radius8">
						<!--下单时间及订单状态-->
						<view class="row jcbetween aicenter pt10 pb5 pl5 pr5 black f15">
							<view v-if="item.recyType==1" class="scraptype">
								<image src="../../static/images/tu1.png" />政府回收</view>
							<view v-else-if="item.recyType==2" class="scraptype">
								<image src="../../static/images/tu2.png" />家电回收</view>
							<view v-else-if="item.recyType==3" class="scraptype">
								<image src="../../static/images/tu3.png" />家具清运</view>
							<view v-else-if="item.recyType==4" class="scraptype">
								<image src="../../static/images/tu4.png" />商户回收</view>
							<view class="gray">已失效</view>
						</view>
						<!--政府回收或商户回收预约时未指定明确品种-->
						<view v-if="item.recydetail==null||item.recydetail==''" class="row jcleft aicenter topeee btmeee p5">
							<image class="scrapImg" :src="host+'/images/routine/kehuishouwu.png'" :data-item="item" @click="tapInfo" />
							<view class="pl10">
								<view class="pb5">可回收物</view>
								<view class="gray f12">品种及重量待回收员上门确认</view>
							</view>
						</view>
						<!--单次回收多个物件-->
						<view v-else class="x-scroll topeee btmeee">
							<scroll-view scroll-x style="width: 100%;">
								<view v-for="(detail,index) in item.recydetail" :key="index" class="scrapItem" :data-item="item" @click="tapInfo">
									<image class="scrapImg" :src="host+'/images/routine/'+detail.image" />
									<view>{{detail.scrapName}}</view>
								</view>
							</scroll-view>
						</view>
						<!--失效时间-->
						<view class="p10">失效时间：{{item.endTime}}</view>
					</view>
					<!--没有数据显示-->
					<view v-if="btmp4=='noData'" class="noData">
						<icon class="rout icon-kongshuju"></icon>
						<view>没有订单</view>
					</view>
					<!--scorll底部-->
					<view class="bottom" v-if="btmp4=='noMore'"><text>已经到底啦</text>
						<view></view>
					</view>
					<view class="bottom" v-else-if="btmp4=='loadMore'">加载更多...</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!--加载动画-->
		<loading />
		
		<!-- 弹出框 -->
		<dialogs id='dialog' ref="dialog"
		  title=' ' 
		  content='是否删除订单' 
		  cancelText='取消' 
		  confirmText='确定'
		  @cancelEvent="_cancelEvent"   
		  @confirmEvent="_confirmEvent">
		</dialogs>
	</view> 
</template>

<script>
	import dialogs from "@../../components/dialog/dialog.vue";

	export default {
		data() {
			return {
				host: '', // 主机地址
				page: [], // 分页数据
				list: [], // id:1==待接单  id:2==待回收订单 id:3==已完成订单  id:4==失效订单
				currentTab: 0, // 当前Tab
				isLoading: false, // 列表是否正在刷新
				btmp0: 'loadMore', // 全部scroll底部panel
				btmp3: 'loadMore', // 已完成scroll底部panel
				btmp4: 'loadMore', // 已失效scroll底部panel
				cancelId: '', // 取消订单id
				scrollHeight: 0,
			}
		},
		components: {
			dialogs
		},
		methods: {
			// 点击选项卡事件
			swichNav: function(e) {
				let that = this;
				that.currentTab = e.currentTarget.dataset.current;
				// #ifdef MP-ALIPAY
					let state = that.currentTab;
					if (state == 1) {
						state = 3;
					} else if (state == 2) {
						state = 4
					}
					that.getList(1, state, 'new');
					console.log("支付宝")
				// #endif 
			},
			// 滑动swiper获取数据
			bindChange: function(e) {
				let that = this;
				let state = e.detail.current;
				that.currentTab = state;
				if (state == 1) {
					state = 3;
				} else if (state == 2) {
					state = 4
				}
				that.getList(1, state, 'new');
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
			// 下拉加载更多
			loadMore: function(e) {
				let that = this;
				if (that.isLoading == true) { // 避免多次触发获取更多function
					that.$util.showToast("正在获取数据", 'none', 2000);
					return;
				}
				let state = e.currentTarget.dataset.state; // 获取当前scroll的state值
				let btmp = "btmp" + state;
				let p = that.page[state]; // 获取state对应分页数据
				if (p.currentPage < p.allPageAmount) { // 当前页小于总页数,底部panel显示加载中,执行获取订单function
					that[`${btmp}`] = "loadMore";
					that.getList(p.currentPage + 1, state, "loadMore");
				}
			},
			// 查看订单详情
			tapInfo: function(e) {
				let that = this;
				let item = e.currentTarget.dataset.item;
				if (item.recyType == 1) {
					uni.navigateTo({
						url: '../governmentinfo/governmentinfo?id=' + item.recyorderId
					});
				} else if (item.recyType == 2) {
					uni.navigateTo({
						url: '../electricalinfo/electricalinfo?id=' + item.recyorderId
					});
				} else if (item.recyType == 3) {
					uni.navigateTo({
						url: '../furnitureinfo/furnitureinfo?id=' + item.recyorderId
					});
				} else if (item.recyType == 4) {
					uni.navigateTo({
						url: '../merchantinfo/merchantinfo?id=' + item.recyorderId
					});
				}
			},
			// 取消订单
			tapCancel: function(e) {
				let that = this;
				that.cancelId = e.currentTarget.dataset.id;
				that.$refs['dialog'].showDialog();
			},
			// 确认取消订单
			_confirmEvent() {
				let that = this;
				that.$refs['dialog'].hideDialog(); // 关闭提示框
				that.$showLoading(); // 显示透明遮罩
				that.$request.postToken("/recyorder/user/cancel.do", {
					id: that.cancelId
				}).then((res) => {
					that.$util.showToast(res.data.results, 'succes', 4000);
					that.getList(1, 0, "new");
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err, 'none', 4000);
				}).finally(()=>{
					that.$hideLoading();
				})
			},
			// 关闭取消弹出框
			_cancelEvent() {
				this.$refs['dialog'].hideDialog();
			},
			/** 获取列表
			 * @curr    当前页
			 * @state   订单状态
			 * @rid     读取模式，new:获取最新，loadMore:加载更多
			 */
			getList: function(curr, state, rid) {
				let that = this;
				let data = {
					pageSize: 10,
					currPage: curr,
					state
				};
				uni.showNavigationBarLoading(); // 标题栏显示加载状态
				that.isLoading = true; // 更改读取状态
				let btmp = "btmp" + state; // list底部状态
				// let page = "page[" + state + "]"; // 存储分页数据
				// let list = "list[" + state + "]"; // 存储列表数据
				// let page = that.page[state];
				// let list = that.list[state];
				that.$showLoading(); // 显示遮罩
				that.$request.postToken("/users/recyorder/findPage.do", data).then((res) => {
					if (res.data.status === 0) {
						let btm = (res.data.page.currentPage >= res.data.page.allPageAmount) ? 'noMore' : 'loadMore';
						let temp = (rid == "new") ? JSON.parse(res.data.results) : that.list[state].concat(JSON.parse(res.data.results));
						that.$set(that.page,state,res.data.page);
						that.$set(that.list,state,temp);
						that[`${btmp}`] = btm;
						console.log(that.list)
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err, 'none', 5000);
				}).finally(() => {
					let btmp = "btmp" + state;
					if (that.list[state] == null || that.list[state].length === 0) {
						that[`${btmp}`] = "noData";
					}
					that.$hideLoading(); // 关闭过度遮罩
					uni.hideNavigationBarLoading(); // 隐藏标题栏加载状态
					uni.stopPullDownRefresh(); // 停止下拉刷新
					that.isLoading = false; // 更改读取状态
				})
			}
		},
		onLoad(options) {
			let that = this;
			that.host = that.$app.globalData.host; // 从全局中获取主机地址
			that.scrollHeight = that.$app.globalData.systemInfo.windowHeight + 8; // 从全局中获取屏幕高度
		},
		onShow(currentTab, state) {
			let that = this;
			console.log(currentTab + '===' + state)
			if (that.$stringUtil.isNotEmpty(currentTab)) {
				that.currentTab = currentTab;
			}
			if (that.$stringUtil.isNotEmpty(state)) { // 订单状态
				that.getList(1, state, "new");
			} else {
				that.getList(1, 0, "new");
			}
		},
		onReady() {
			
		},
		onPullDownRefresh() {
			let that = this;
			let state = that.currentTab;
			if (state == 1) {
				state = 3;
			} else if (state == 2) {
				state = 4
			}
			that.getList(1, state, 'new');
			console.log("onPullDownRefresh")
		}
	}
</script>

<style>
	.top-tab {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 100;
		box-shadow: 0 10px 10px -7px #ddd inset;
	}

	.top-tab>view {
		width: 33.33%;
		height: 36px;
		line-height: 34px;
		box-sizing: border-box;
		border-bottom: 1px solid #ccc;
	}

	.selectOn {
		color: #00a2ed !important;
		border-bottom: 2px solid #00a2ed !important;
	}

	swiper {
		position: absolute;
		top: 36px;
		width: 100%;
	}

	.header {
		padding-top: 30rpx;
		padding-bottom: 20rpx;
		width: 100%;
		text-align: center;
	}

	.bottom {
		padding-top: 30rpx;
		padding-bottom: 20rpx;
		width: 100%;
		text-align: center;
	}

	/* 列表样式 */
	.list {
		background: #ffffff;
		padding: 1px 10px;
		margin-top: 10px;
	}

	.list>view:last-child {
		border: none;
	}


	.scrapImg {
		width: 50px;
		height: 50px;
	}

	.scraptype {
		display: flex;
		flex-direction: row;
		box-sizing: border-box;
		justify-content: left;
		align-items: center;
	}

	.scraptype>image {
		width: 26px;
		height: 26px;
		margin-right: 10px;
	}

	.topred {
		border-top: 110rpx solid #f00;
	}

	.toporange {
		border-top: 110rpx solid #ff851b;
	}

	.topgreen {
		border-top: 110rpx solid #9a1;
	}

	.topgary {
		border-top: 110rpx solid #999;
	}

	.word {
		position: absolute;
		font-size: 30rpx;
		right: 26rpx;
		top: 22rpx;
		text-align: center;
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

	/* 横向滚动样式 */
	.x-scroll {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
	}

	/* 价格列表横向滚动样式 */
	.scrapItem {
		display: inline-block;
		width: 70px;
		margin-top: 5px;
		margin-bottom: 3px;
		text-align: center;
	}

	.scrapItem>image {
		width: 50px;
		height: 50px;
	}

	/* 取消订单按钮样式 */
	.cancelBtn {
		height: 26px;
		line-height: 26px;
		text-align: center;
		border-radius: 6px;
		border: 1px solid red;
	}

	.bottom {
		width: 100%;
		text-align: center;
		padding-bottom: 20px;
	}

	.bottom>view {
		height: 1px;
		margin: 0px 20px;
		border-top: 1px solid #ddd;
	}

	.bottom>text {
		position: relative;
		top: 10px;
		padding: 0px 10px;
		background: #eee;
	}
</style>
