<template>
	<view>
		<!-- banner -->
		<swiper class='u-wrp-bnr' autoplay='true' interval='5000' duration='1000' circular='true'>
			<block v-for="(item,index) in bnrUrl" :key="index">
				<swiper-item>
					<image :src='item.url' class='u-img-slide' mode='aspectFill'></image>
				</swiper-item>
			</block>
		</swiper>
		<!-- 主要功能按钮 -->
		<view class="firstContent row wrap mb20 mt20">
			<navigator url="../qrcode/qrcode">
				<image src="../../static/images/qr_code.png" mode="widthFix" />
				<view>智能回收</view>
			</navigator>
			<navigator url="">
				<image src="../../static/images/deliver.png" mode="widthFix" />
				<view>上门回收</view>
			</navigator>
			<navigator url="">
				<image src="../../static/images/present.png" mode="widthFix" />
				<view>签到活动</view>
			</navigator>
			<navigator url="../guide/guide">
				<image src="../../static/images/info.png" mode="widthFix" />
				<view>使用指南</view>
			</navigator>
		</view>
		<!-- 收益数据统计 -->
		<view class="myIncome column mb20">
			<view class="row mb10 f16 bold">
				<view class="ring ascenter"></view>
				<text v-if="card == ''">您好，请先登录</text>
				<text v-else>我的收益</text>
			</view>
			<scroll-view scroll-x="true" style=" width: 100%;white-space: nowrap;">
				<navigator class="incomeItem" url="../cashlist/cashlist">
					<view class="mb5 rout icon-recharge f26 blue1" />
					<text class="gray-9 f12 mb5">零钱</text>
					<view class="f14">
						<text v-if="card == ''" class="bold f18 mr5">--</text>
						<text v-else class="bold f18 mr5 black">1200</text>
						元
					</view>
				</navigator>
				<navigator class="incomeItem">
					<view class="mb5 rout icon-coin f26 blue1" />
					<text class="gray-9 f12 mb5">量心币</text>
					<view class="f14">
						<text v-if="card == ''" class="bold f18 mr5">--</text>
						<text v-else class="bold f18 mr5 black">100000</text>
						个
					</view>
				</navigator>
				<navigator class="incomeItem" url="../couponlist/couponlist">
					<view class="mb5 rout icon-youhuiquan f26 blue1" />
					<text class="gray-9 f12 mb5">加价券</text>
					<view class="f14">
						<text v-if="card == ''" class="bold f18 mr5">--</text>
						<text v-else class="bold f18 mr5 black">56</text>
						张
					</view>
				</navigator>
				<navigator class="incomeItem" url="../exchangelist/exchangelist">
					<view class="mb5 rout icon-jifen f26 blue1" />
					<text class="gray-9 f12 mb5">积分</text>
					<view class="f14">
						<text v-if="card == ''" class="bold f18 mr5">--</text>
						<text v-else class="bold f18 mr5 black">100000</text>
						分
					</view>
				</navigator>
				<navigator class="incomeItem">
					<view class="mb5 rout icon-evaluate f26 blue1" />
					<text class="gray-9 f12 mb5">碳积分</text>
					<view class="f14">
						<text v-if="card == ''" class="bold f18 mr5">--</text>
						<text v-else class="bold f18 mr5 black">100000</text>
						分
					</view>
				</navigator>
			</scroll-view>
		</view>
		
	<!-- 	<view class="row jcleft aicenter bg-white pt5 menu">
			<view data-recy="1" @click="tapOpenPanel">
				<image src="../../static/images/tu1.png" mode="widthFix" />
				<view>政府回收</view>
			</view>
			<navigator url="../electrical/electrical">
				<image src="../../static/images/tu2.png" mode="widthFix" />
				<view>家电回收</view>
			</navigator>
			<navigator url="../furniture/furniture">
				<image src="../../static/images/tu3.png" mode="widthFix" />
				<view>家具清运</view>
			</navigator>
			<view data-recy="4" @click="tapOpenPanel">
				<image src="../../static/images/tu4.png" mode="widthFix" />
				<view>商户回收</view>
			</view>
		</view> -->
		<!---->
<!-- 		<view class="row jcbetween aicenter p10 bg-white f14">
			<navigator url="../scorelist/scorelist" class="row jcbetween aicenter cashscore mr5">
				<view class="txtcenter">
					<image src="../../static/images/score.png" mode="widthFix" />
				</view>
				<view>
					<view class="h26 lh26 black bold">量心币</view>
					<view class="f20 h26 lh26 orange">{{customer.score}}</view>
				</view>
			</navigator> -->
			<!-- #ifdef MP-ALIPAY -->
		<!-- 	<navigator class="row jcbetween aicenter cashscore ml5">
				<view class="txtcenter">
					<image src="../../static/images/cash.png" mode="widthFix" />
				</view>
				<view>
					<view class="h26 lh26 black bold">零钱</view>
					<view class="f20 h26 lh26 red">{{customer.cash}}</view>
				</view>
			</navigator> -->
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN  -->
		<!-- 	<navigator url="../withdraw/withdraw" class="row jcbetween aicenter cashscore ml5">
				<view class="txtcenter">
					<image src="../../static/images/cash.png" mode="widthFix" />
				</view>
				<view>
					<view class="h26 lh26 black bold">零钱</view>
					<view class="f20 h26 lh26 red">{{customer.cash}}</view>
				</view>
			</navigator> -->
			<!-- #endif -->
		<!-- </view> -->

		<!-- <navigator url="../invite/invite">
			<image src="../../static/images/yaoqing.png" class="invite" />
		</navigator> -->

		<view class="bin">
			<view class="row jcbetween f12 gray-9 pb5 mb10">
				<text class="f16 gray-3 bold">附近回收站</text>
				<view class="row ascenter" @click="clickmap">
					查看更多 <view class="rout icon-right lh18" />
				</view>
			</view>
			<!-- 回收站列表 -->
			<view class="binList">
				<view class="column binItem">
					<view class="row jcbetween mb5">
						<view class="row aicenter">
							<view class="rout icon-locationfill blue1 mr5" />
							<text class="f16 bold">亚洲豪苑</text>
						</view>
						<text class="blue1 f14">1500.0m</text>
					</view>
					<view class="row jcbetween">
						<view class="column">
							<text class="gray-9 f12 mb5">豪巷街和豪苑路交汇处（亚洲豪苑北区南门西侧）</text>
							<view class="row">
								<text class="lab labblue1 mr5 radius4">智能回收箱</text>
								<text class="box boxblue1 mr5 radius4">正常投递</text>
							</view>
						</view>
						<view class="ascenter rout icon-right blue1 f18 bold mr10" style="border: 2px solid;border-radius: 50%;padding: 2px;" />
					</view>
				</view>
				<view class="column binItem">
					<view class="row jcbetween mb5">
						<view class="row aicenter">
							<view class="rout icon-locationfill blue1 mr5" />
							<text class="f16 bold">西岭广场</text>
						</view>
						<text class="blue1 f14">2100.0m</text>
					</view>
					<view class="row jcbetween">
						<view class="column">
							<text class="gray-9 f12 mb5">香樟林西南角</text>
							<view class="row">
								<text class="lab labblue1 mr5 radius4">智能回收箱</text>
								<text class="box boxred mr5 radius4">智能箱已满</text>
							</view>
						</view>
						<view class="ascenter rout icon-right blue1 f18 bold mr10" style="border: 2px solid;border-radius: 50%;padding: 2px;" />
					</view>
				</view>
				<view class="column binItem">
					<view class="row jcbetween mb5">
						<view class="row aicenter">
							<view class="rout icon-locationfill blue1 mr5" />
							<text class="f16 bold">金垦金南路</text>
						</view>
						<text class="blue1 f14">3000.0m</text>
					</view>
					<view class="row jcbetween">
						<view class="column">
							<text class="gray-9 f12 mb5">金垦路与金南路交汇处</text>
							<view class="row">
								<text class="lab labblue1 mr5 radius4">智能回收箱</text>
								<text class="box boxblue1 mr5 radius4">正常投递</text>
							</view>
						</view>
						<view class="ascenter rout icon-right blue1 f18 bold mr10" style="border: 2px solid;border-radius: 50%;padding: 2px;" />
					</view>
				</view>
				<view class="column binItem">
					<view class="row jcbetween mb5">
						<view class="row aicenter">
							<view class="rout icon-locationfill blue1 mr5" />
							<text class="f16 bold">金山小区</text>
						</view>
						<text class="blue1 f14">5000.0m</text>
					</view>
					<view class="row jcbetween">
						<view class="column">
							<text class="gray-9 f12 mb5">滨涯路往友谊路进200米右侧（金山小区西门）</text>
							<view class="row">
								<text class="lab labblue1 mr5 radius4">智能回收箱</text>
								<text class="box boxblue1 mr5 radius4">正常投递</text>
							</view>
						</view>
						<view class="ascenter rout icon-right blue1 f18 bold mr10" style="border: 2px solid;border-radius: 50%;padding: 2px;" />
					</view>
				</view>
				
				
			</view>
		</view>
		
		<!-- <view>
			<view class="bold f16 mb10" @click="clickmap">附近回收站</view>
		</view> -->
	<!-- 	<map @tap="clickmap" id="myMap" style="width: 710rpx; height: 250px;" :latitude="latitude" :longitude="longitude" show-location>
		</map>

		<callrecy id='callrecy' ref="callrecy" :contact="add.Contact" :tel="add.Tel" :address="add.Address" @cancelEvent="_cancelEvent" @confirmEvent="_confirmEvent">
		</callrecy> -->


		<!--政府回收-->
	<!-- 	<view v-show="governmentHid" class="mask" />
		<view v-show="governmentHid" class="dialog txtcenter">
			<form @submit="sendGovernment" report-submit="true">
				<view class="bg-white radius6 pb5">
					<view class="txtcenter pt10 black f18">政府回收</view> -->
					<!--<navigator url="../showhtml/showhtml?nav=government" class="txtcenter pt10 pb10 f14">戳这里了解详细情况</navigator>-->
					<!--收货地址-->
					<!-- <navigator class="row jcleft aicenter m10 address radius6 f14" url="../addresslist/addresslist?parent=government">
						<view class="rout icon-dizhi txtcenter f20" />
						<view class="elips">
							<text v-if="address.contact!=null">{{address.contact}} - {{address.tel}}\n{{address.area}}{{address.address}}</text>
							<text v-else class="">请选择收货地址</text>
						</view>
						<view class="rout icon-dayuhao overhidden txtcenter" />
					</navigator>
					<button class="f16 white bg-blue1 radiu6" formType="submit">呼叫回收</button>
				</view>
			</form>
			<view @click='tapClosePanel' class="rout icon-close_icon mt15 gray f26" data-recy="1"></view>
		</view> -->
		<!--商户回收-->
		<!-- <view v-show="merchantHid" class="mask" />
		<view v-show="merchantHid" class="dialog txtcenter">
			<form @submit="sendMerchant" report-submit="true">
				<view class="bg-white radius6 pb5">
					<view class="txtcenter pt10 black f18">商户回收</view> -->
					<!--<navigator url="../showhtml/showhtml?nav=government" class="txtcenter pt10 pb10 f14">戳这里了解详细情况</navigator>-->
					<!--收货地址-->
					<!-- <navigator class="row jcleft aicenter m10 address radius6 f14" url="../addresslist/addresslist?parent=government">
						<view class="rout icon-dizhi txtcenter f20" />
						<view class="elips">
							<text v-if="address.contact!=null">{{address.contact}} - {{address.tel}}\n{{address.area}}{{address.address}}</text>
							<text v-else class="">请选择收货地址</text>
						</view>
						<view class="rout icon-dayuhao overhidden txtcenter" />
					</navigator>
					<button class="f16 white bg-blue1 radiu6" formType="submit">呼叫回收</button>
				</view>
			</form>
			<view @click='tapClosePanel' data-recy="4" ><view class="rout icon-close_icon mt15 gray f26" /></view>
		</view> -->


		<!--加载动画-->
		<loading />
	</view>
</template>

<script>
	import callrecy from "@../../components/callrecy/callrecy.vue";

	export default {
		components: {
			callrecy
		},
		data() {
			return {
				xianshi1: false,
				"bnrUrl": [{
					"url": "../../static/images/swiper1.png"
				}, {
					"url": "../../static/images/swiper2.png"
				}, {
					"url": "../../static/images/swiper3.png"
				}],
				latitude: 20.044220,
				longitude: 110.19989,
				markers: [],
				host: '',
				governmentHid: false, // 政府回收面板
				merchantHid: false, // 商户回收面板
				banner: [
					'../../images/banner1.jpg'
				],
				optionimg: [{
						"url": "../../images/optionimg1.jpg",
						"action": "../wareslist/wareslist"
					},
					{
						"url": "../../images/optionimg2.jpg",
						"action": "../test/test"
					},
					{
						"url": "../../images/optionimg3.jpg"
					},
					{
						"url": "../../images/optionimg4.jpg"
					}
				],
				customer: {},
				tabbar: {},
				address: {},
				rolltext: [{
						"text": '量心回收正式上线啦，欢迎大家关注环境保护工作'
					},
					{
						"text": '垃圾分一分，生活美十分！'
					},
				],
				motto: 'Hello World',
				userInfo: {},
				hasUserInfo: false,
				canIUse: wx.canIUse('button.open-type.getUserInfo'),
				loadModel: false,
				card: '',		//用户卡号，用于判断用户是否登录
			}
		},
		methods: {
			// 弹出预约回收面板
			tapOpenPanel: function(e) {
				let that = this;
				let type = e.currentTarget.dataset.recy; // 获取回收类型
				if (type == "1") {
					that.$data.governmentHid = true;
				} else if (type == "4") {
					that.$data.merchantHid = true;
				}
			},
			// 关闭预约回收面板
			tapClosePanel: function(e) {
				let that = this;
				console.log(e)
				let type = e.currentTarget.dataset.recy; // 获取回收类型
				if (type == "1") {
					that.$data.governmentHid = false;
				} else if (type == "4") {
					that.$data.merchantHid = false;
				}
			},
			// 政府回收呼叫回收
			sendGovernment: function(e) {
				let that = this;
				let address = that.$data.address;
				if (that.$stringUtil.isEmpty(address.contact)) {
					that.$util.showToast("请选择收货地址", "none", 4000)
					return false;
				}

				that.$showLoading(); // 显示遮罩

				let temp = address; // 添加地址
				temp.recyType = '1'; // 添加上门类型，1：普通上门，2：家电，3：家具，4：合伙人
				that.$request.postToken("/users/recyorder/government.do", {
					data: JSON.stringify(temp)
				}).then((res) => {
					//console.log(res);
					that.$util.showToast(res.data.results, 'none', 3000);
					that.$data.governmentHid = false;
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err, 'none', 5000);
				}).finally(() => {
					that.$hideLoading();
				})
			},
			// 商户回收呼叫回收
			sendMerchant: function(e) {
				let that = this;
				let address = that.$data.address;
				if (that.$stringUtil.isEmpty(address.contact)) {
					that.$util.showToast("请选择收货地址", "none", 4000)
					return false;
				}
				that.$showLoading(); // 显示遮罩
				let temp = address; // 添加地址
				temp.recyType = '4'; // 添加上门类型，1：普通上门，2：家电，3：家具，4：合伙人
				that.$request.postToken("/users/recyorder/merchant.do", {
					data: JSON.stringify(temp)
				}).then((res) => {
					//console.log(res);
					that.$util.showToast(res.data.results, 'none', 3000);
					that.$data.merchantHid = false;
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err, 'none', 5000);
				}).finally(() => {
					that.$hideLoading();
				})
			},
			getCenterLocation: function() {
				console.log()
				this.mapCtx.getCenterLocation({
					success: function(res) {
						console.log(res.longitude)
						console.log(res.latitude)
					}
				})
			},
			tapInvite: function(e) {
				let that = this;
				uni.navigateTo({
					url: '../showhtml/showhtml?nav=invite',
				})
			},
			moveToLocation: function() {
				this.mapCtx.moveToLocation()
			},
			translateMarker: function() {
				this.mapCtx.translateMarker({
					markerId: 1,
					autoRotate: true,
					duration: 1000,
					destination: {
						latitude: 23.10229,
						longitude: 113.3345211,
					},
					animationEnd() {
						console.log('animation end')
					}
				})
			},
			includePoints: function() {
				this.mapCtx.includePoints({
					padding: [10],
					points: []
				})
			},
			//获取当前地图的缩放级别
			scaleClick: function() {
				this.mapCtx.getScale({
					success: function(res) {
						console.log(res.scale)
					}
				})
			},
			//获取当前地图的视野范围
			getRegionClick: function() {
				this.mapCtx.getRegion({
					success: function(res) {
						console.log(res.southwest)
						console.log(res.northeast)
					}
				})
			},
			// 跑马灯
			rollrun: function() {
				let that = this;
				let rollArray = that.$data.rollArray;
				let interval = setInterval(function() {
					if (-that.data.marqueeDistance < that.data.length) {
						vm.setData({
							marqueeDistance: vm.data.marqueeDistance - vm.data.marqueePace,
						});
					} else {
						clearInterval(interval);
						that.setData({
							marqueeDistance: vm.data.windowWidth
						});
						that.rollrun();
					}
				}, that.data.interval);
			},
			//	获取用户信息
			getCustomerInfo: function() {
				let that = this;
				that.$showLoading()
				that.$request.postToken("/users/customer/findInfo.do", null).then((res) => {
					if (res.data.status === 0) {
						that.$data.customer = JSON.parse(res.data.results);
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err, 'none', 5000);
				}).finally(() => {
					that.$hideLoading();
				})
			},
			// 上门回收
			// callRecycle: function(e) {
			// 	let that = this;
			// 	that.$showLoading();    //显示遮罩
			// 	request.postToken("/users/address/findDefaultAddress.do", null).then((res) => {
			// 		//console.log(res);
			// 		if (res.data.status === 0) {
			// 			console.log(JSON.parse(res.data.results));
			// 			that.$data.address = JSON.parse(res.data.results);
			// 			that.$refs['callrecy'].showContent();
			// 			that.$refs['callrecy'].showDialog();
			// 		} else {
			// 			util.showToast(res.data.results, 'none', 4000);
			// 		}
			// 	}).catch((err) => {
			// 		//console.log(err);
			// 		util.showToast(err.errMsg, 'none', 4000);
			// 		if (err.errMsg === '401') {
			// 			uni.redirectTo({
			// 				url: '../login/login'
			// 			});
			// 		}
			// 	})
			// },
			link: function(e) {
				let that = this;
				let url = e.currentTarget.dataset.url;
				if (url != null && url != "") {
					uni.navigateTo({
						url: url
					});
				} else {
					that.$util.showToast("正在建设中", 'none', 3000);
				}
			},
			linkPartner: function() {
				uni.navigateTo({
					url: '../qrcode/qrcode'
				})
			},
			linkHelp: function() {
				uni.navigateTo({
					url: '../wareslist/wareslist'
				})
			},
			imglink: function(e) {
				let that = this;
				//console.log(e.currentTarget);
				let url = e.currentTarget.dataset.url;
				if (url != null && url != "") {
					uni.navigateTo({
						url: url
					});
				}
			},
			//事件处理函数
			bindViewTap: function() {
				uni.navigateTo({
					url: '../logs/logs'
				})
			},
			clickmap: function(e) {
				console.log("clickmap")
				uni.navigateTo({
					url: '../recySmart/recySmart',
				})
			},
			//设置用户的默认地址
			getDefaultAddr: function() {
				let that = this;
				that.$showLoading(); // 显示遮罩
				that.$request.postToken("/users/address/findDefaultAddress.do", null).then((res) => {
					if (res.data.status === 0) {
						let address = JSON.parse(res.data.results);
						uni.setStorageSync('address', address);
						that.address = address;
					} else {
						uni.removeStorageSync('address');
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err, 'none', 5000);
				}).finally(() => {
					that.$hideLoading();
				})
			},
			// //测试两点距离
			// getDistance1: function(lat1, lng1, lat2, lng2) {
			// 	var radLat1 = lat1 * Math.PI / 180.0;
			// 	var radLat2 = lat2 * Math.PI / 180.0;
			// 	var a = radLat1 - radLat2;
			// 	var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
			// 	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
			// 	s = s * 6378.137; // 6378.137 地球半径;
			// 	s = Math.round(s * 10000) / 10000;
			// 	return s;
			// },
			// /* 向高德地图api发送经纬度获取地址详情 */
			// getDistance2: function(lat1, lng1, lat2, lng2){
			// 	let that = this;
			// 	let key = 'b1ba7b9e724ff8b14678ee90a61856da';
			// 	let origins =  lng1 + ',' + lat1;
			// 	let destination = lng2 + ',' + lat2;
			// 	let url = 'https://restapi.amap.com/v3/distance?origins=' + origins   //起点经纬度
			// 				+ '&destination='+ destination     //目标经纬度
			// 				+ '&output=json&key=' + key 
			// 				+ '&type=0';             // 0 直线距离
			// 	that.$request.get(url).then((res) => {
			// 		console.log(res)
			// 	}).catch((err) => { 
			// 		console.log(err) 
			// 		that.$util.showToast(err, 'none', 5000);
			// 	}).finally(() => {
					
			// 	})
			// }
			
		},
		onLoad() {
			let that = this;
			that.getDefaultAddr(); // 获取默认地址
			that.card = uni.getStorageSync("card");	//获取用户卡号，用于判断用户是否登录
		},
		onReady() {
			this.myMap = uni.createMapContext("myMap", this);
			this.myMap.moveToLocation();
			uni.getLocation({
			    type: 'wgs84',
			    success: function (res) {
			        console.log('当前位置的经度：' + res.longitude);
			        console.log('当前位置的纬度：' + res.latitude);
			    }
			});
		},
		onShow() {
			let that = this;
			let address = uni.getStorageSync("address"); // 读取缓存中地址信息
			if (address != null) {
				that.$data.address = address;
			}
			this.getCustomerInfo();	//	获取用户基本信息
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}
	.u-wrp-bnr {
		height: 200rpx;
		display: block;
		margin: 10px;
	}
	.u-img-slide {
		width: 100%;
		height: inherit;
		border-radius: 8px;
	}
	.firstContent {
		
	}
	.firstContent > navigator {
		width: 25%;
		text-align: center;
		margin: 5px 0;
	}
	.firstContent > navigator >image {
		width: 32px;
	}
	.myIncome {
		height: 140px;
		padding-left: 10px;
		background: url(../../static/images/index_incomebg.png) no-repeat;
		background-size: 100% 140px;
	}
	.ring {
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background: radial-gradient(circle at 7px 7px, transparent, transparent 2px, #00a2ed 4px, #00a2ed );
		margin-right: 5px;
	}
	.incomeItem {
		background: #FFFFFF;
		border-radius: 4px;
		margin-right: 10px;
		text-align: left;
		padding: 10px 15px;
		display: inline-block;
		background-color: rgb(255,255,255,0.75) ;
	}
	.bin {
		padding: 0 10px;
	}
	.binList {
	}
	.binItem {
		background: #FFFFFF;
		padding: 10px;
		border-radius: 4px;
		margin-bottom: 15px;
		border: #00a2ed 1px dashed;
	}
	
	
	

	.cashscore {
		width: 50%;
		padding: 5px 5px;
		box-shadow: 0px 0px 4px #cccccc;
	}

	.cashscore>view:nth-child(1) {
		width: 30%;
	}

	.cashscore>view:nth-child(1)>image {
		width: 90%;
		text-align: right;
		vertical-align: middle;
	}

	.cashscore>view:nth-child(2) {
		width: 70%;
		text-align: center;
	}


	.shadow {
		box-shadow: 0px 0px 4px #cccccc;
	}

	.stamp {
		background: #ffffff;
		background-image: -webkit-gradient(linear, 50% 0, 0 100%, from(transparent), color-stop(.5, transparent), color-stop(.5, #e5e5e5), to(#e5e5e5)),
			-webkit-gradient(linear, 50% 0, 100% 100%, from(transparent), color-stop(.5, transparent), color-stop(.5, #e5e5e5), to(#e5e5e5));
		background-image: -moz-linear-gradient(50% 0 -45deg, transparent, transparent 50%, #e5e5e5 50%, #e5e5e5),
			-moz-linear-gradient(50% 0 -135deg, transparent, transparent 50%, #e5e5e5 50%, #e5e5e5);
		background-size: 15px 10px;
		background-repeat: repeat-x;
		background-position: 0 100%;

	}

	.banner {
		padding-top: 5px;
		text-align: center;
		background: #fff;
	}

	.swiperimg {
		width: 90%;
		border-radius: 10px;
		box-shadow: 0px 0px 5px #ccc
	}

	.tlemenu1 {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		padding: 0xp 10px;
		justify-content: center;
		align-items: center;
		background: #fff;
	}

	/* 政府回收和合伙人回收弹出框样式 */
	.dialog {
		position: fixed;
		z-index: 101;
		width: 85%;
		max-width: 300px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
	}

	/* 收货地址样式 */
	.address {
		height: 55px;
		vertical-align: middle;
		border: 2px dashed #ccc;
		text-align: left;
	}

	.address>view:nth-child(1) {
		width: 14%;
	}

	.address>view:nth-child(2) {
		width: 76%;
	}

	.address>view:nth-child(3) {
		width: 10%;
	}

	.menu {
		width: 100%;
	}

	.menu>view {
		width: 25%;
		text-align: center;
	}

	.menu>view>image {
		width: 50%;
	}

	.menu>navigator {
		width: 25%;
		text-align: center;
	}

	.menu>navigator>image {
		width: 50%;
	}

	/* 邀请有礼样式 */
	.invite {
		position: fixed;
		z-index: 500;
		width: 200rpx;
		height: 200rpx;
		right: 0rpx;
		bottom: 100rpx;
	}

	.tlemenu1>view {
		width: 25%;
		text-align: center;
		margin: 0px 0px 10px 0px;
	}

	.tlemenu1>view>view>.rout {
		font-size: 22px;
		color: #fff;
		padding: 6px 8px;
		text-align: center;
		border-radius: 50%;
		-webkit-border-radius: 50%;
		margin: 4px 0px;
	}

	.tlemenu1>view:nth-child(1)>view>.rout {
		background: linear-gradient(135deg, rgba(252, 203, 40, 0.4), rgba(252, 203, 40, 1));
	}

	.tlemenu1>view:nth-child(2)>view>.rout {
		background: linear-gradient(135deg, rgba(61, 216, 255, 0.4), rgba(61, 216, 255, 1));
	}

	.tlemenu {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		padding: 0xp 10px;
		justify-content: center;
		align-items: center;
		background: #fff;
	}

	.tlemenu>view {
		width: 25%;
		text-align: center;
		margin: 0px 0px 10px 0px;
	}

	.tlemenu>view>view>.rout {
		font-size: 22px;
		color: #fff;
		padding: 6px 8px;
		text-align: center;
		border-radius: 50%;
		-webkit-border-radius: 50%;
		margin: 4px 0px;
	}

	.tlemenu>view:nth-child(1)>view>.rout {
		background: linear-gradient(135deg, rgba(40, 185, 252, 0.4), rgba(40, 185, 252, 1));
		font-size: 27px;
	}

	.tlemenu>view:nth-child(2)>view>.rout {
		background: linear-gradient(135deg, rgba(252, 167, 40, 0.4), rgba(252, 167, 40, 1));
		font-size: 27px;
	}

	.tlemenu>view:nth-child(3)>view>.rout {
		background: linear-gradient(135deg, rgba(70, 231, 49, 0.4), rgba(70, 231, 49, 1));
		font-size: 27px;
	}

	.tlemenu>view:nth-child(4)>view>.rout {
		background: linear-gradient(135deg, rgba(252, 90, 125, 0.4), rgba(252, 90, 125, 1));
		font-size: 27px;
	}

	#fangkuang {
		margin: 2%;
		box-sizing: border-box;
		padding: 20rpx;
		box-shadow: 0 0 20px #f0f0f0;
		width: 46%;
		display: flex;
		align-items: center;
		justify-content: space-around;
		justify-items: center;
	}

	.accountpanel {
		width: 100%;
		color: #aaa;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		background: #fff;
		text-align: center;
		padding: 20px 0px 10px 0px;
	}

	.accountpanel>navigator {
		width: 50%;
		position: relative;
	}

	.scorepanel {}

	.scorepanel>view {
		width: 50%;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 30px;
		padding: 0px 6px 0px 20px;

	}

	.balancepanel::before {
		content: '';
		position: absolute;
		left: 0;
		top: 14px;
		width: 1px;
		height: 30px;
		background-color: #ccc;
	}

	.balancepanel>view {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 30px;
		padding: 0px 6px 0px 20px;
	}

	.roll {
		margin: 5px 0px;
		padding: 0px 10px;
		background-color: #fff;
	}

	.roll>.rout:nth-child(1) {
		position: absolute;
		left: 1;
		top: 1;
		font-size: 24px;
		color: #00a2ed;
		padding-top: 7px;
	}

	.roll>swiper {
		margin-left: 30px;
		padding: 11px 0px;
		height: 20px;
	}

	.option {
		width: 100%;
		height: 180px;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-evenly;
		align-content: space-around;
		background-color: #fff;
		margin-bottom: 60px;
	}

	.option>image {
		width: 45%;
		border-radius: 10px;
	}

	.imagesize {

		background-color: white;
	}

	.imagesize image {
		width: 95%;
		border-radius: 20rpx;
	}

	map {
		margin: 20rpx;
	}

	button {
		margin: 20rpx;
	}

	.height {
		position: absolute;
		height: 100rpx;
		width: 100rpx;
		left: 130rpx;
	}

	.rewardname {
		background: transparent;
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
		margin: 0 -10rpx;

	}

	.reward {
		display: flex;
		margin-bottom: -80rpx;
	}

	.nav {
		text-align: center;
		width: 300rpx;
		position: relative;
		display: inline-block;
		padding: 8rpx;
		font-size: 14px;
		color: white;
		line-height: 100%;
	}

	.nav::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1;

		transform: perspective(.5em) rotateX(-5deg);
		background: linear-gradient(to right, rgba(33, 204, 226, 0), rgba(33, 204, 226, 0.5), rgb(106, 173, 250), rgba(33, 204, 226, 0.5), rgba(33, 204, 226, 0));
	}

	.navmenu {
		width: 100%;
		flex-direction: row;
		position: absolute;
		display: flex;
		justify-content: center;
		z-index: 1;
		justify-items: center;

	}

	#radius {
		font-size: 28px;
		border-radius: 5%;
	}

	#radius1 {
		border-radius: 5%;
		font-size: 28px;
	}
</style>
