<template>
	<view>
		<view class="swiper-tab viewRow">
			<view data-current="0" :class="currentTab==0?'selectOn':''" @click="swichNav">未使用</view>
			<view data-current="1" :class="currentTab==1?'selectOn':''" @click="swichNav">历史加价券</view>
		</view>
		
		<swiper :current="currentTab" :style="'height:'+scrollHeight+'px;'" @change='bindChange' class="swiper">
			<!-- 未使用加价券 -->
			<swiper-item class="p15">
				<scroll-view scroll-y="true" :style="'height:'+scrollHeight+'px;'" data-state="0" @scrolltoupper="refresh"
				 @scrolltolower="loadMore" upper-threshold="3" lower-threshold="5">
					<!-- <block :key="index" v-for="(item,index) in list[0]"> -->
						<view class="column mb15" style="width: 93%;">
							<view class="viewRow" style="max-height: 102px; box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);">
								<view class="couponLeft viewCol txtcenter p10 jccenter">
									<text class="f20 bold white">10%</text>
								</view>
								<view class="couponRight column f14">
									<view class="column p10 jccenter" >
										<text class="f16 mb10 black bold">智能回收订单使用加价10%</text>
										<text class="gray-6">2020.3.25 00:00-2020.4.1 00:00</text>
									</view>
									<view style="border: 1px dashed #EEEEEE;" />
									<view class="gray-6 row ml5 p5">
										使用规则
										<view class="rout icon-top ml5 asend" />
									</view>
								</view>
							</view>
							<!-- 加价券使用规则 -->
							<view class="p15" style="box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);">
								1.使用范围：加价券仅限量心回收内使用。<br />
								2.订单类型为智能回收订单即可使用。<br />
								3.使用品类范围：废书纸、废纸皮、易拉罐、杂塑料。<br />
								4.量心回收保留法律范围内允许的活动解释权。
							</view>
						</view>
						
						<view class="column mb15" style="width: 93%;">
							<view class="viewRow" style="max-height: 102px; box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);">
								<view class="couponLeft viewCol txtcenter p10 jccenter">
									<text class="f20 bold white">￥5</text>
								</view>
								<view class="couponRight column f14">
									<view class="column p10 jccenter" >
										<text class="f16 mb10 black bold">智能回收订单使用加价5元</text>
										<text class="gray-6">2020.3.25 00:00-2020.4.1 00:00</text>
									</view>
									<view style="border: 1px dashed #EEEEEE;" />
									<view class="gray-6 row ml5 p5">
										使用规则
										<view class="rout icon-bottom ml5 asend" />
									</view>
								</view>
							</view>
							<!-- 加价券使用规则 -->
							<!-- <view class="p15" style="box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);">
								1.使用范围：加价券仅限量心回收内使用。<br />
								2.订单类型为智能回收订单即可使用。<br />
								3.使用品类范围：废书纸、废纸皮、易拉罐、杂塑料。<br />
								4.量心回收保留法律范围内允许的活动解释权。
							</view> -->
						</view>
					<!-- </block> -->
					<view v-if="btmp0=='noData'" class="noData">
						<image src="../../static/images/wujiajiaquan.png" mode="widthFix" style="width: 240px;" />
						<view>暂无优惠券</view>
					</view>
					<view class="bottom" v-if="btmp0=='noMore'">已经到底啦</view>
					<view class="bottom" v-else-if="btmp0=='loadMore'">加载更多...</view>
				</scroll-view>
			</swiper-item>
			<!-- 历史加价券 -->
			<swiper-item class="pl5 pt15 pb15">
				<scroll-view scroll-y="true" :style="'height:'+scrollHeight+'px;'" data-state="0" @scrolltoupper="refresh"
				 @scrolltolower="loadMore" upper-threshold="3" lower-threshold="5">
					<!-- <block :key="index" v-for="(item,index) in list[1]"> -->
						<view class="column mb15" style="width: 93%;">
							<view class="viewRow" style="max-height: 102px; box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);">
								<view class="couponLeft2 viewCol txtcenter p10 jccenter">
									<text class="f20 bold white">10%</text>
								</view>
								<view class="couponRight column f14">
									<view class="column p10 jccenter" >
										<text class="f16 mb10 gray-6 bold">智能回收订单使用加价10%</text>
										<text class="gray-9">2020.3.25 00:00-2020.4.1 00:00</text>
									</view>
									<view style="border: 1px dashed #EEEEEE;" />
									<view class="gray-9 row ml5 p5">
										使用规则
										<view class="rout icon-top ml5 asend" />
									</view>
								</view>
							</view>
							<!-- 加价券使用规则 -->
							<view class="p15" style="box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);">
								1.使用范围：加价券仅限量心回收内使用。<br />
								2.订单类型为智能回收订单即可使用。<br />
								3.使用品类范围：废书纸、废纸皮、易拉罐、杂塑料。<br />
								4.量心回收保留法律范围内允许的活动解释权。
							</view>
						</view>
						<view class="column mb15" style="width: 93%;">
							<view class="viewRow" style="max-height: 102px; box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);">
								<view class="couponLeft2 viewCol txtcenter p10 jccenter">
									<text class="f20 bold white">￥5</text>
								</view>
								<view class="couponRight column f14">
									<view class="column p10 jccenter" >
										<text class="f16 mb10 gray-6 bold">智能回收订单使用加价5元</text>
										<text class="gray-9">2020.3.25 00:00-2020.4.1 00:00</text>
									</view>
									<view style="border: 1px dashed #EEEEEE;" />
									<view class="gray-9 row ml5 p5">
										使用规则
										<view class="rout icon-bottom ml5 asend" /> 
									</view>
								</view>
							</view>
							<!-- 加价券使用规则 -->
							<!-- <view class="p15" style="box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);">
								1.使用范围：加价券仅限量心回收内使用。<br />
								2.订单类型为智能回收订单即可使用。<br />
								3.使用品类范围：废书纸、废纸皮、易拉罐、杂塑料。<br />
								4.量心回收保留法律范围内允许的活动解释权。
							</view> -->
						</view>
					<!-- </block> -->
					<view v-if="btmp0=='noData'" class="noData">
						<image src="../../static/images/wujiajiaquan.png" mode="widthFix" style="width: 240px;" />
						<view>暂无优惠券</view>
					</view>
					<view class="bottom" v-if="btmp0=='noMore'">已经到底啦</view>
					<view class="bottom" v-else-if="btmp0=='loadMore'">加载更多...</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentTab: 0, // 当前Tab
				scrollHeight: 0, // 设备高度
				btmp0: 'loadMore', // 未使用scroll底部panel
				btmp1: 'loadMore', // 历史优惠券scroll底部panel
				list: [], // id:0==未使用  id:2==历史优惠券
				page: [] // 0:未使用  1:历史优惠券
			}
		},
		methods: {
			// 点击选项卡事件
			swichNav: function(e) {
				let that = this;
				let curr = e.currentTarget.dataset.current;
				that.currentTab = curr;
					// that.getList(1, curr, 'new');
			},
			// 滑动swiper获取数据
			bindChange: function(e) {
				let that = this;
				let curr = e.detail.current;
				that.currentTab = curr;
				// that.getList(1, curr, 'new');
			},
		},
		onLoad(options) {
			let that = this;
			that.scrollHeight = that.$app.globalData.systemInfo.windowHeight + 8;      // 从全局中获取屏幕高度  
			if (options.state != null) {
				that.currentTab = options.state;
			}
			// that.getList(1, that.currentTab, 'new');
		},
		//监听用户下拉刷新事件
		onPullDownRefresh() {
			let that = this;
			let state = that.currentTab;
			// that.getList(1, state, 'new');
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}
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
		width: 50%;
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
	.couponLeft {
		width: 80px;
		background-image: linear-gradient( left, #7ecaed, #00a2ed);
		overflow: hidden;
	}
	.couponLeft2 {
		width: 80px;
		background-image: linear-gradient( left, #bbbbbb, #666666);
		overflow: hidden;
	}
	.couponLeft::after, .couponLeft2::after {
		content: '';
		position: absolute;
		top: 0px;
		bottom: 0px;
		left: -6px;
		width: 12px;
		height: 102px;
		background: radial-gradient(circle, #fff, #fff 4px, transparent 5px);
		background-size: 12px 12px;
	}
	.couponRight {
		/* width: 270px; */
		background: #FFFFFF;
		/* background-image: radial-gradient(circle at 240px -5px, #eee, #eee 10px, transparent 11px ),
											radial-gradient(circle at 240px 105%, #eee, #eee 10px, transparent 11px ); */
	}
	.couponRight > view:nth-of-type(1) {
		width: 240px;
	}
</style>
	