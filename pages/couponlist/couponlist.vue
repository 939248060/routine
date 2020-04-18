<template>
	<view>
		<view class="swiper-tab row">
			<view data-current="0" :class="currentTab==0?'selectOn':''" @click="swichNav">待使用</view>
			<view data-current="1" :class="currentTab==1?'selectOn':''" @click="swichNav">已使用</view>
			<view data-current="2" :class="currentTab==2?'selectOn':''" @click="swichNav">已失效</view>
		</view>
		
		<swiper :current="currentTab" :style="'height:'+scrollHeight+'px;'" @change='bindChange' class="swiper">
			<!-- 待使用加价券 -->
			<swiper-item class="p15">
				<scroll-view scroll-y="true" :style="'height:'+scrollHeight+'px;'" data-state="0" @scrolltoupper="refresh"
				 @scrolltolower="loadMore" upper-threshold="3" lower-threshold="5">
					<block :key="index" v-for="(item,index) in list[1]">
						<view class="column mb15 coupon">
							<view class="row" >
								<view class="couponLeft column txtcenter p10 jccenter">
									<text v-if="item.markupCoupon.usedType=='1'" class="f20 bold white">￥{{ item.markupCoupon.usedAmount }}</text>
									<text v-else-if="item.markupCoupon.usedType=='2'" class="f20 bold white">{{ item.markupCoupon.usedDiscount*100 }}%</text>
								</view>
								<view class="couponRight column f14">
									<view class="row jcbetween aibaseline">
										<view class="column m10" style="width: 100%;">
											<view class="row jcbetween">
												<text class="f16 mb10 black bold mr5">{{ item.markupCoupon.title }}</text>
												<navigator :url="'../couponorder/couponorder?id='+item.mcrId" class="box boxorange white radius4 txtcenter asstart" style="min-width: 60px;">
													立即使用
												</navigator>
											</view>
											<block v-if="item.markupCoupon.validType==1">
												<text v-if="item.markupCoupon.validStartTime==item.markupCoupon.validEndTime" class="gray-9 f12">{{ item.markupCoupon.validStartTime }} 当天有效</text>
												<text v-else class="gray-9 f12">{{ item.markupCoupon.validStartTime }} - {{ item.markupCoupon.validEndTime }}</text>
											</block>
											<block v-else-if="item.markupCoupon.validType==2">
												<text v-if="item.receiveTime==item.markupCoupon.delayTime" class="gray-9 f12 f12">{{ item.receiveTime }} 当天有效</text>
												<text v-else class="gray-9 f12">{{ item.receiveTime }} - {{ item.markupCoupon.delayTime }}</text>
											</block>
										</view>
									</view>
									<view style="border: 1px dashed #EEEEEE; margin-left: 10px; margin-right: 10px;" />
									<view class="gray-6 row ml5 p5"  @click="showRole(item)">
										使用规则
										<view class="rout icon-bottom ml5 asend roleIcon" :class="{'roleIcon--active':item.isOpen}" />
									</view>
								</view>
							</view>
							<!-- 加价券使用规则 -->
							<text class="roleInfo roleInfo--animation" :class="{'roleInfo--hide':!item.isOpen, 'p15':item.isOpen}"  :style="{'transform':item.isOpen?'translateY(0)':'translateY(-10%)','-webkit-transform':item.isOpen?'translateY(0)':'translateY(-10%)'}">
								{{ item.markupCoupon.contents }}
							</text>
						</view>
					</block>
					<view v-if="btmp1=='noData'" class="noData">
						<image src="../../static/images/wujiajiaquan.png" mode="widthFix" style="width: 240px;" />
						<view>暂无加价券</view>
					</view>
					<view class="bottom" v-if="btmp1=='noMore'">—————— 已经到底啦 ——————</view>
					<view class="bottom" v-else-if="btmp1=='loadMore'">加载更多...</view>
				</scroll-view>
			</swiper-item>
			<!-- 已使用加价券 -->
			<swiper-item class="pl5 pt15 pb15">
				<scroll-view scroll-y="true" :style="'height:'+scrollHeight+'px;'" data-state="1" @scrolltoupper="refresh"
				 @scrolltolower="loadMore" upper-threshold="3" lower-threshold="5">
					<block :key="index" v-for="(item,index) in list[2]">
						<view class="column mb15 coupon">
							<view class="row" >
								<view class="couponLeft2 column txtcenter p10 jccenter">
									<text v-if="item.markupCoupon.usedType=='1'" class="f20 bold white">￥{{ item.markupCoupon.usedAmount }}</text>
									<text v-else-if="item.markupCoupon.usedType=='2'" class="f20 bold white">{{ item.markupCoupon.usedDiscount*100 }}%</text>
								</view>
								<view class="couponRight column f14">
									<view class="row jcbetween aibaseline">
										<view class="column m10" style="width: 100%;">
											<text class="f16 mb10 gray-6 bold mr5">{{ item.markupCoupon.title }}</text>
											<block v-if="item.markupCoupon.validType==1">
												<text v-if="item.markupCoupon.validStartTime==item.markupCoupon.validEndTime" class="gray-9 f12">{{ item.markupCoupon.validStartTime }} 当天有效</text>
												<text v-else class="gray-9 f12">{{ item.markupCoupon.validStartTime }} - {{ item.markupCoupon.validEndTime }}</text>
											</block>
											<block v-else-if="item.markupCoupon.validType==2">
												<text v-if="item.receiveTime==item.markupCoupon.delayTime" class="gray-9 f12 f12">{{ item.receiveTime }} 当天有效</text>
												<text v-else class="gray-9 f12">{{ item.receiveTime }} - {{ item.markupCoupon.delayTime }}</text>
											</block>
										</view>
									</view>
									<view style="border: 1px dashed #EEEEEE; margin-left: 10px; margin-right: 10px;" />
									<view class="gray-6 row ml5 p5"  @click="showRole(item)">
										使用规则
										<view class="rout icon-bottom ml5 asend roleIcon" :class="{'roleIcon--active':item.isOpen}" />
									</view>
								</view>
							</view>
							<!-- 加价券使用规则 -->
							<text class="roleInfo roleInfo--animation" :class="{'roleInfo--hide':!item.isOpen, 'p15':item.isOpen}"  :style="{'transform':item.isOpen?'translateY(0)':'translateY(-10%)','-webkit-transform':item.isOpen?'translateY(0)':'translateY(-10%)'}">
								{{ item.markupCoupon.contents }}
							</text>
						</view>
					</block>
					<view v-if="btmp2=='noData'" class="noData">
						<image src="../../static/images/wujiajiaquan.png" mode="widthFix" style="width: 240px;" />
						<view>暂无加价券</view>
					</view>
					<view class="bottom" v-if="btmp2=='noMore'">—————— 已经到底啦 ——————</view>
					<view class="bottom" v-else-if="btmp2=='loadMore'">加载更多...</view>
				</scroll-view>
			</swiper-item>
			<!-- 已失效加价券 -->
			<swiper-item class="pl5 pt15 pb15">
				<scroll-view scroll-y="true" :style="'height:'+scrollHeight+'px;'" data-state="2" @scrolltoupper="refresh"
				 @scrolltolower="loadMore" upper-threshold="3" lower-threshold="5">
					<block :key="index" v-for="(item,index) in list[3]">
						<view class="column mb15 coupon">
							<view class="row" >
								<view class="couponLeft2 column txtcenter p10 jccenter">
									<text v-if="item.markupCoupon.usedType=='1'" class="f20 bold white">￥{{ item.markupCoupon.usedAmount }}</text>
									<text v-else-if="item.markupCoupon.usedType=='2'" class="f20 bold white">{{ item.markupCoupon.usedDiscount*100 }}%</text>
								</view>
								<view class="couponRight column f14">
									<view class="row jcbetween aibaseline">
										<view class="column m10" style="width: 100%;">
											<text class="f16 mb10 gray-6 bold mr5">{{ item.markupCoupon.title }}</text>
											<block v-if="item.markupCoupon.validType==1">
												<text v-if="item.markupCoupon.validStartTime==item.markupCoupon.validEndTime" class="gray-9 f12">{{ item.markupCoupon.validStartTime }} 当天有效</text>
												<text v-else class="gray-9 f12">{{ item.markupCoupon.validStartTime }} - {{ item.markupCoupon.validEndTime }}</text>
											</block>
											<block v-else-if="item.markupCoupon.validType==2">
												<text v-if="item.receiveTime==item.markupCoupon.delayTime" class="gray-9 f12 f12">{{ item.receiveTime }} 当天有效</text>
												<text v-else class="gray-9 f12">{{ item.receiveTime }} - {{ item.markupCoupon.delayTime }}</text>
											</block>
										</view>
									</view>
									<view style="border: 1px dashed #EEEEEE; margin-left: 10px; margin-right: 10px;" />
									<view class="gray-6 row ml5 p5"  @click="showRole(item)">
										使用规则
										<view class="rout icon-bottom ml5 asend roleIcon" :class="{'roleIcon--active':item.isOpen}" />
									</view>
								</view>
							</view>
							<!-- 加价券使用规则 -->
							<text class="roleInfo roleInfo--animation" :class="{'roleInfo--hide':!item.isOpen, 'p15':item.isOpen}"  :style="{'transform':item.isOpen?'translateY(0)':'translateY(-10%)','-webkit-transform':item.isOpen?'translateY(0)':'translateY(-10%)'}">
								{{ item.markupCoupon.contents }}
							</text>
						</view>
					</block>
					<view v-if="btmp3=='noData'" class="noData">
						<image src="../../static/images/wujiajiaquan.png" mode="widthFix" style="width: 240px;" />
						<view>暂无加价券</view>
					</view>
					<view class="bottom" v-if="btmp3=='noMore'">—————— 已经到底啦 ——————</view>
					<view class="bottom" v-else-if="btmp3=='loadMore'">加载更多...</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- 遮罩 -->
		<loading/>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				currentTab: 0, // 当前Tab
				scrollHeight: 0, // 设备高度
				btmp1: 'loadMore', // 待使用scroll底部panel
				btmp2: 'loadMore', // 已使用scroll底部panel
				btmp3: 'loadMore', // 已失效scroll底部panel
				list: [], // id:1==待使用  id:2==已使用		id:3==已失效
				page: [] ,// 1:待使用  2:已使用		3:已失效	
			}
		},
		methods: {
			// 点击选项卡事件
			swichNav: function(e) {
				let that = this;
				let curr = e.currentTarget.dataset.current;
				that.currentTab = curr;
				that.getList(1, curr, 'new');
			},
			// 滑动swiper获取数据
			bindChange: function(e) {
				let that = this;
				let curr = e.detail.current;
				that.currentTab = curr;
				that.getList(1, curr, 'new');
			},
			// 点击打开使用规则
			showRole(item) {
				item.isOpen = !item.isOpen;
				this.$forceUpdate();//强制重新渲染
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
				let tab = that.currentTab; // 获取当前显示Tab
				let state = 0;
				if (tab == "0") { // 1号swiper-item加载待使用加价券数据
					state = 1;
				} else if (tab == "1") { // 2号swiper-item加载已使用加价券数据
					state = 2;
				} else if (tab == "2") { // 3号swiper-item加载已失效加价券数据
					state = 3;
				}
				let btmp = "btmp" + state;
				let p = that.page[state]; // 获取state对应分页数据
				if (p.currentPage < p.allPageAmount) { // 当前页小于总页数,底部panel显示加载中,执行获取加价券function
					that[`${btmp}`] = "loadMore";
					that.getList(p.currentPage + 1, tab, "loadMore");
				}
			},
			//获取加价券列表
			getList: function(curr, tab, rid) {
				let that = this; 
				let state = 0;
				if (tab == "0") { // 1号swiper-item加载待使用加价券数据
					state = 1;
				} else if (tab == "1") { // 2号swiper-item加载已使用加价券数据
					state = 2;
				} else if (tab == "2") { // 3号swiper-item加载已失效加价券数据
					state = 3;
				}
				let data = {
					pageSize: 6,
					currPage: curr,
					state: state
				};
				uni.showNavigationBarLoading(); // 标题栏显示加载状态
				that.$showLoading(); // 显示遮罩
				that.isLoading = true; // 更改读取状态
				let btmp = "btmp" + state; // list底部状态
				that.$request.postToken("/users/marcourecord/findPage.do", data).then((res) => {
					if (res.data.status === 0) {
						let btm = (res.data.page.currentPage >= res.data.page.allPageAmount) ? 'noMore' : 'loadMore';
						data = JSON.parse(res.data.results);
						data.forEach(item => {
							item.isOpen = false;
							item.markupCoupon.validStartTime = (item.markupCoupon.validStartTime!=null)?item.markupCoupon.validStartTime.slice(0,10).replace(/-/g,"."):'';//使用开始时间
							item.markupCoupon.validEndTime = (item.markupCoupon.validEndTime!=null)?item.markupCoupon.validEndTime.slice(0,10).replace(/-/g,"."):'';//使用结束时间
							item.receiveTime = (item.receiveTime!=null)?item.receiveTime.slice(0,10).replace(/-/g,"."):'';	//领取时间
							item.markupCoupon.delayTime = (item.markupCoupon.delayTime!=null)?item.markupCoupon.delayTime.slice(0,10).replace(/-/g,"."):'';//相对结束时间
						})
						if (rid == "new") { // 判断当前读取是刷新读取还是加载读取
							that.$set(that.list,state,data);
						} else {
							that.$set(that.list,state,that.list[state].concat(data));
						}
						that.$set(that.page,state,res.data.page);
						that[`${btmp}`] = btm;
					} else {
						that.$util.showToast(data, 'none', 5000);
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
			that.scrollHeight = that.$app.globalData.systemInfo.windowHeight + 8;      // 从全局中获取屏幕高度  
			if (options.state != null) {
				that.currentTab = options.state;
			}
			that.getList(1, that.currentTab, 'new');
		},
		onShow() {
			let that = this;
			that.scrollHeight = that.$app.globalData.systemInfo.windowHeight + 8;      // 从全局中获取屏幕高度
			that.getList(1, that.currentTab, 'new');
		},
		//监听用户下拉刷新事件
		onPullDownRefresh() {
			let that = this;
			that.getList(1, that.currentTab, 'new');
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
	.coupon {
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		background: #ffffff;
		width: 93%
	}
	.coupon > view:nth-of-type(1) {
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
	}
	.couponLeft {
		width: 80px;
		background-image: linear-gradient( left, #7ecaed, #00a2ed);
		overflow: hidden;
	}
	.couponLeft2 {
		width: 80px;
		background: #bbbbbb;
		overflow: hidden;
	}
	/* .couponLeft::after, .couponLeft2::after {
		content: '';
		position: absolute;
		top: 0px;
		bottom: 0px;
		left: -6px;
		width: 12px;
		background: radial-gradient(circle, #eeeeee, #eeeeee 4px, transparent 4px);
		background-size: 12px 12px;
	} */
	.couponRight {
		background: #FFFFFF;
		width: 260px;
	}
	.roleIcon {
		transform: rotate(0deg);
		transform-origin: center center;
	}
	.roleIcon--active {
		transform: rotate(180deg);
	}
	.roleInfo {
		overflow: hidden;
	}
	.roleInfo--animation {
		transition-property: transform;  /* style里面有transform的动画效果 */
		transition-duration: 3s;
		transition-timing-function: ease;
	}
	.roleInfo--hide {
		height: 0px;
		line-height: 0px;
	}
	.noData {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 100px; 
	}
	.noData > text {
		color: #AAAAAA;
		font-size: 18px;
	}
	.bottom {
		padding-bottom: 20px;
		width: 100%;
		text-align: center;
	}
	.bottom > view {
		height: 1px;
		border-top: 1px solid #ddd;
		margin: 0px 20px;
	}
	.bottom > text {
		padding: 0px 10px;
		background: #eee;
		position: relative;
		top: 10px;
	}
</style>
	