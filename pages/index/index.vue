<template>
	<view>
		<view class='bg-white txtcenter'>
			<image src='../../static/images/banner1.png' mode="widthFix" class="radius8" style="width: 94%" />
		</view>
		<view class="row jcleft aicenter bg-white pt5 menu">
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
		</view> 
		<!---->
		<view class="row jcbetween aicenter p10 bg-white f14">
			<navigator url="../scorelist/scorelist" class="row jcbetween aicenter cashscore mr5">
				<view class="txtcenter">
					<image src="../../static/images/score.png" mode="widthFix" />
				</view>
				<view>
					<view class="h26 lh26 black bold">量心币</view>
					<view class="f20 h26 lh26 orange">{{customer.score}}</view>
				</view>
			</navigator>
			<!-- #ifdef MP-ALIPAY -->
			<navigator class="row jcbetween aicenter cashscore ml5">
				<view class="txtcenter">
					<image src="../../static/images/cash.png" mode="widthFix" />
				</view>
				<view>
					<view class="h26 lh26 black bold">零钱</view>
					<view class="f20 h26 lh26 red">{{customer.cash}}</view>
				</view>
			</navigator>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN  -->
			<navigator url="../withdraw/withdraw" class="row jcbetween aicenter cashscore ml5">
				<view class="txtcenter">
					<image src="../../static/images/cash.png" mode="widthFix" />
				</view>
				<view>
					<view class="h26 lh26 black bold">零钱</view>
					<view class="f20 h26 lh26 red">{{customer.cash}}</view>
				</view>
			</navigator>
			<!-- #endif -->
		</view>

		<navigator url="../invite/invite">
			<image src="../../static/images/yaoqing.png" class="invite" />
		</navigator>

		<swiper class='u-wrp-bnr' autoplay='true' interval='5000' duration='1000' circular='true'>
			<block v-for="(item,index) in bnrUrl" :key="index">
				<swiper-item>
					<image :src='item.url' class='u-img-slide' mode='aspectFill'></image>
				</swiper-item>
			</block>
		</swiper>

		<view>
			<view class="rout icon-dizhi blue mt5" @click="clickmap">附近回收站</view> 
		</view>
		
		<map @tap="clickmap" id="myMap" style="width: 710rpx; height: 250px;" :latitude="latitude" :longitude="longitude" show-location>
		</map>

		<callrecy id='callrecy' ref="callrecy" :contact="add.Contact" :tel="add.Tel" :address="add.Address" @cancelEvent="_cancelEvent" @confirmEvent="_confirmEvent">
		</callrecy>

		<!--政府回收-->
		<view v-show="governmentHid" class="mask" />
		<view v-show="governmentHid" class="dialog txtcenter">
			<form @submit="sendGovernment" report-submit="true">
				<view class="bg-white radius6 pb5">
					<view class="txtcenter pt10 black f18">政府回收</view>
					<!--<navigator url="../showhtml/showhtml?nav=government" class="txtcenter pt10 pb10 f14">戳这里了解详细情况</navigator>-->
					<!--收货地址-->
					<navigator class="row jcleft aicenter m10 address radius6 f14" url="../addresslist/addresslist?parent=government">
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
		</view>
		<!--商户回收-->
		<view v-show="merchantHid" class="mask" />
		<view v-show="merchantHid" class="dialog txtcenter">
			<form @submit="sendMerchant" report-submit="true">
				<view class="bg-white radius6 pb5">
					<view class="txtcenter pt10 black f18">商户回收</view>
					<!--<navigator url="../showhtml/showhtml?nav=government" class="txtcenter pt10 pb10 f14">戳这里了解详细情况</navigator>-->
					<!--收货地址-->
					<navigator class="row jcleft aicenter m10 address radius6 f14" url="../addresslist/addresslist?parent=government">
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
		</view>

		<!--加载动画-->
		<loading  />
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
				loadModel: false
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
				
				that.$showLoading();					// 显示遮罩
				
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
			getDefaultAddr: function(){
				let that = this;
				that.$showLoading(); // 显示遮罩
				that.$request.postToken("/users/address/findDefaultAddress.do",null).then((res) => {
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
			}
		},
		onLoad() {
			let that = this;
			that.getDefaultAddr(); // 获取默认地址
		},
		onReady() {
			this.myMap = uni.createMapContext("myMap", this);
			this.myMap.moveToLocation();
		},
		onShow() {
			let that = this;
			let address = uni.getStorageSync("address");   // 读取缓存中地址信息
			if (address != null) {
			  that.$data.address = address;
			}
			this.getCustomerInfo();	//	获取用户基本信息
		}
	}
</script>

<style>
	
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

	.u-wrp-bnr {
		width: 100%;
		height: 200rpx;
		display: block;
		background: #f0f0f0;
	}

	.u-img-slide {
		width: 100%;
		height: inherit;
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
