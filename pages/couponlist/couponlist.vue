<template>
	<view>
		<view class="swiper-tab viewRow">
			<view data-current="0" :class="currentTab==0?'selectOn':''" @click="swichNav">待使用</view>
			<view data-current="1" :class="currentTab==1?'selectOn':''" @click="swichNav">已使用</view>
			<view data-current="2" :class="currentTab==2?'selectOn':''" @click="swichNav">已失效</view>
		</view>
		
		<swiper :current="currentTab" :style="'height:'+scrollHeight+'px;'" @change='bindChange' class="swiper">
			<!-- 待使用加价券 -->
			<swiper-item class="p15">
				<scroll-view scroll-y="true" :style="'height:'+scrollHeight+'px;'" data-state="0" @scrolltoupper="refresh"
				 @scrolltolower="loadMore" upper-threshold="3" lower-threshold="5">
					<!-- <block :key="index" v-for="(item,index) in list[0]"> -->
						<view class="column mb15 coupon">
							<view class="viewRow" >
								<view class="couponLeft viewCol txtcenter p10 jccenter">
									<text class="f20 bold white">10%</text>
								</view>
								<view class="couponRight column f14">
									<view class="row jcbetween aibaseline">
										<view class="column m10" >
											<text class="f16 mb10 black bold">订单加价10%</text>
											<text class="gray-6">2020.3.25 - 2020.4.1</text>
										</view>
										<navigator :url="'../couponorder/couponorder?id=123456'" class="box boxorange white radius4">
											立即使用
										</navigator>
									</view>
									<view style="border: 1px dashed #EEEEEE; margin-left: 10px;" />
									<view class="gray-6 row ml5 p5"  @click="showRole">
										使用规则
										<view class="rout icon-bottom ml5 asend roleIcon" :class="{'roleIcon--active':isOpen}" />
									</view>
								</view>
							</view>
							<!-- 加价券使用规则 -->
							<view class="roleInfo roleInfo--animation" :class="{'roleInfo--hide':!isOpen, 'p15':isOpen}"  :style="{'transform':isOpen?'translateY(0)':'translateY(-10%)','-webkit-transform':isOpen?'translateY(0)':'translateY(-10%)'}">
								1.使用范围：加价券仅限量心回收内使用。<br />
								2.订单类型为智能回收订单即可使用。<br />
								3.使用品类范围：废书纸、废纸皮、易拉罐、杂塑料。<br />
								4.量心回收保留法律范围内允许的活动解释权。
							</view>
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
			<!-- 已使用加价券 -->
			<swiper-item class="pl5 pt15 pb15">
				<scroll-view scroll-y="true" :style="'height:'+scrollHeight+'px;'" data-state="1" @scrolltoupper="refresh"
				 @scrolltolower="loadMore" upper-threshold="3" lower-threshold="5">
					<!-- <block :key="index" v-for="(item,index) in list[1]"> -->
					
					<!-- </block> -->
					<view v-if="btmp1=='noData'" class="noData">
						<image src="../../static/images/wujiajiaquan.png" mode="widthFix" style="width: 240px;" />
						<view>暂无优惠券</view>
					</view>
					<view class="bottom" v-if="btmp1=='noMore'">已经到底啦</view>
					<view class="bottom" v-else-if="btmp1=='loadMore'">加载更多...</view>
				</scroll-view>
			</swiper-item>
			<!-- 已失效加价券 -->
			<swiper-item class="pl5 pt15 pb15">
				<scroll-view scroll-y="true" :style="'height:'+scrollHeight+'px;'" data-state="2" @scrolltoupper="refresh"
				 @scrolltolower="loadMore" upper-threshold="3" lower-threshold="5">
					<!-- <block :key="index" v-for="(item,index) in list[1]"> -->
						<view class="column mb15 coupon">
							<view class="viewRow" >
								<view class="couponLeft2 viewCol txtcenter p10 jccenter">
									<text class="f20 bold white">10%</text>
								</view>
								<view class="couponRight column f14">
									<view class="column m10" >
										<text class="f16 mb10 black bold">订单加价10%</text>
										<text class="gray-6">2020.3.25 - 2020.4.1</text>
									</view>
									<view style="border: 1px dashed #EEEEEE; margin-left: 10px;" />
									<view class="gray-6 row ml5 p5"  @click="showRole">
										使用规则
										<view class="rout icon-bottom ml5 asend roleIcon" :class="{'roleIcon--active':isOpen}" />
									</view>
								</view>
							</view>
							<!-- 加价券使用规则 -->
							<view class="roleInfo roleInfo--animation" :class="{'roleInfo--hide':!isOpen, 'p15':isOpen}"  :style="{'transform':isOpen?'translateY(0)':'translateY(-10%)','-webkit-transform':isOpen?'translateY(0)':'translateY(-10%)'}">
								1.使用范围：加价券仅限量心回收内使用。<br />
								2.订单类型为智能回收订单即可使用。<br />
								3.使用品类范围：废书纸、废纸皮、易拉罐、杂塑料。<br />
								4.量心回收保留法律范围内允许的活动解释权。
							</view>
						</view>
					
					
						<view class="column mb15 coupon">
							<view class="viewRow" >
								<view class="couponLeft2 viewCol txtcenter p10 jccenter">
									<text class="f20 bold white">￥5</text>
								</view>
								<view class="couponRight column f14">
									<view class="column m10" >
										<text class="f16 mb10 black bold">订单加价5元</text>
										<text class="gray-6">2020.3.25 - 2020.4.1</text>
									</view>
									<view style="border: 1px dashed #EEEEEE; margin-left: 10px;" />
									<view class="gray-6 row ml5 p5"  @click="showRole">
										使用规则
										<view class="rout icon-bottom ml5 asend roleIcon" :class="{'roleIcon--active':isOpen}" />
									</view>
								</view>
							</view>
							<!-- 加价券使用规则 -->
							<view class="roleInfo roleInfo--animation" :class="{'roleInfo--hide':!isOpen, 'p15':isOpen}"  :style="{'transform':isOpen?'translateY(0)':'translateY(-10%)','-webkit-transform':isOpen?'translateY(0)':'translateY(-10%)'}">
								1.使用范围：加价券仅限量心回收内使用。<br />
								2.订单类型为智能回收订单即可使用。<br />
								3.使用品类范围：废书纸、废纸皮、易拉罐、杂塑料。<br />
								4.量心回收保留法律范围内允许的活动解释权。
							</view>
						</view>
					<!-- </block> -->
					<view v-if="btmp2=='noData'" class="noData">
						<image src="../../static/images/wujiajiaquan.png" mode="widthFix" style="width: 240px;" />
						<view>暂无优惠券</view>
					</view>
					<view class="bottom" v-if="btmp2=='noMore'">已经到底啦</view>
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
				currentTab: 0, // 当前Tab
				scrollHeight: 0, // 设备高度
				btmp0: 'noMore', // 待使用scroll底部panel
				btmp1: 'noData', // 已使用scroll底部panel
				btmp2: 'loadMore', // 已失效scroll底部panel
				list: [], // id:1==待使用  id:2==已使用		id:3==已失效
				page: [] ,// 1:待使用  2:已使用		3:已失效	
				isOpen: false
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
			// 使用规则
			showRole() {
				console.log(this)
				this.isOpen = !this.isOpen;
				this.$forceUpdate();//强制重新渲染
			}
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
		background: #999999;
		overflow: hidden;
	}
	.couponLeft::after, .couponLeft2::after {
		content: '';
		position: absolute;
		top: 0px;
		bottom: 0px;
		left: -6px;
		width: 12px;
		height: 100%;
		background: radial-gradient(circle, #eeeeee, #eeeeee 4px, transparent 4px);
		background-size: 12px 12px;
	}
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
	