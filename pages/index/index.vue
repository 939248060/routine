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
		<view class="row wrap mb20 mt20">
			<view class="firstContent" @click="toPage('智能回收')">
				<image src="../../static/images/qr_code.png" mode="widthFix" />
				<view>智能回收</view>
			</view>
			<navigator class="firstContent" url="../visit/visit">
				<image src="../../static/images/deliver.png" mode="widthFix" />
				<view>上门回收</view>
			</navigator>
			<view class="firstContent" @click="toPage('签到活动')">
				<image src="../../static/images/present.png" mode="widthFix" />
				<view>签到活动</view>
			</view>
			<navigator class="firstContent" url="../guide/guide">
				<image src="../../static/images/info.png" mode="widthFix" />
				<view>使用指南</view>
			</navigator>
		</view>
		<!-- 收益数据统计 -->
		<view class="myIncome column mb10">
			<view class="row mb10">
				<view class="ring ascenter" />
				<text class="f14 bold">{{ card == ''?"您好，请先登录":"我的收益" }}</text>
			</view>
			<!-- 未登录 -->
			<view v-if="card==''" class="myIncomeCon column jccenter">
				<navigator class="loginBtn" url="../login/login">
					登录 / 注册
				</navigator>
			</view>
			<!-- 已登录 -->
			<block v-else>
				<scroll-view scroll-x="true" style=" width: 100%;white-space: nowrap;">
					<navigator class="incomeItem" url="../drawmoney/drawmoney">
						<view class="row mb10 aicenter jccenter">
							<view class="rout icon-recharge f26 blue1 mr5" />
							<text class="gray-9 f12">零钱</text>
						</view>
						<view class="f14">
							<text class="bold f18 mr5 black"> {{ customer.cash!=null?customer.cash:'--' }} </text>
							元
						</view>
					</navigator>
					<navigator class="incomeItem" url="../scorelist/scorelist">
						<view class="row mb10 aicenter jccenter">
							<view class="rout icon-coin f26 orange mr5" />
							<text class="gray-9 f12">量心币</text>
						</view>
						<view class="f14">
							<text class="bold f18 mr5 black"> {{ customer.score!=null?customer.score:'--' }} </text>
							个
						</view>
					</navigator>
					<navigator class="incomeItem column jccenter" url="../couponlist/couponlist">
						<view class="row mb10 aicenter jccenter">
							<view class="rout icon-youhuiquan f26 purple mr5" />
							<text class="gray-9 f12">加价券</text>
						</view>
						<view class="f14">
							<text class="bold f18 mr5 black"> {{ customer.marCouCount!=null?customer.marCouCount:'--' }} </text>
							张
						</view>
					</navigator>
					<!-- <navigator class="incomeItem">
						<view class="row mb10 aicenter jccenter">
							<view class="rout icon-evaluate f26 green mr5" />
							<text class="gray-9 f12">碳积分</text>
						</view>
						<view class="f14">
							<text class="bold f18 mr5 black"> {{ card == ''?'--':'100000' }} </text>
							分
						</view>
					</navigator> -->
				</scroll-view>
			</block>
		</view>
		<!-- 回收站列表 -->
		<view class="bin">
			<view class="row jcbetween f12 gray-9 pb5 mb10">
				<view class="row">
					<view class="ring ascenter" />
					<text class="f14 gray-6 bold">附近回收站</text>
				</view>
				<navigator class="row ascenter" url="../recySmart/recySmart" >
					查看更多 <view class="rout icon-right lh18" />
				</navigator>
			</view>
			<!-- 回收站列表 -->
			<view class="binList" v-if="smartList.length > 0">
				<block v-for="(item,index) in smartList" :key="index" >
					<navigator class="column binItem" :url="'../recySmart/recySmart?lng='+item.lng+'&lat='+item.lat+'&code='+item.code">
						<view class="row jcbetween mb5">
							<view class="row aicenter">
								<view class="rout icon-locationfill blue1 mr5" />
								<text class="f16 bold">{{ item.name }}站</text>
							</view>
							<text class="blue1 f14">{{ item.distance }}m</text>
						</view>
						<view class="row jcbetween">
							<view class="column">
								<text class="gray-9 f12 mb5">{{ item.address }}</text>
								<view class="row">
									<text class="box boxblue1 mr5 radius4">{{ item.binType|binType }}</text>
									<text class="box mr5 radius4" :class="item.mainStatu?'boxred':'boxgreen'">{{ item.mainStatu?item.mainStatu:'正常' }}</text>
								</view>
							</view>
							<view class="ascenter rout icon-right blue1 f18 bold mr10" style="border: 2px solid;border-radius: 50%;padding: 2px;" />
						</view>
					</navigator>
				</block>
			</view>
			<!-- 没开定位没有站点数据 -->
			<view v-else class="column aicenter">
				<image src="../../static/images/wudingwei.png" mode="widthFix" style="width: 100px;" />
				<view>请打开定位以便获取附近站点信息</view>
			</view>
		</view>
		<!--遮罩-->
		<loading/>
		<!--弹出框-->
		<dialogs id='dialog' ref="dialogs" title=' ' content='您还未登录,是否登录？' cancelText='取消' confirmText='确定' @cancelEvent="_cancelEvent"
		 @confirmEvent="_confirmEvent" />
	</view>
</template>

<script>
	import dialogs from "@../../components/dialog/dialog.vue";
	
	export default {
		components:{
			dialogs
		},
		data() {
			return {
				"bnrUrl": [{	//banner图地址
					"url": "../../static/images/swiper1.png"
				}, {
					"url": "../../static/images/swiper2.png"
				}, {
					"url": "../../static/images/swiper3.png"
				}],
				customer: {},	//用户信息
				address: {},	//收货地址信息
				card: '',			//用户卡号，用于判断用户是否登录
				smartList: [],	//站点列表
			}
		},
		//过滤器
		filters:{
			binType(val){	//站点类型
				switch (val) {
				  case 1:
				    return "智能回收站";
				    break;
				  case 2:
				    return "中转站";
				    break;
				  case 3:
				    return "废品回收站";
				    break;
				}
			}
		},
		methods: {
			//页面跳转前判断是否登录 
			toPage(num) {
				let that = this;
				if (that.card == '') {	//用户未登录
					that.$refs['dialogs'].showDialog();
				}else {
					if (num == "智能回收") {	//智能回收
						uni.navigateTo({
							url: "../qrcode/qrcode"
						});
					}else if (num == "签到活动") {	//签到活动
						uni.navigateTo({ 
							url: "../signin/signin"
						});
					}
				}
			},
			// 弹出框选确定登录
			_confirmEvent() {
				var that = this;
				uni.redirectTo({
					url: '../login/login'
				});
			},
			// 弹出框选取消隐藏弹出框
			_cancelEvent() {
				this.$refs['dialogs'].hideDialog();
			},
			//	获取用户信息
			getCustomerInfo: function() {
				let that = this;
				that.$showLoading();  //显示遮罩
				that.$request.postToken("/users/customer/findInfo.do", null).then((res) => {
					if (res.data.status === 0) {
						that.customer = JSON.parse(res.data.results);
						console.log(that.customer)
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
			//获取附近站点列表
			getSmartList (lng, lat) {
				let that =  this;
				let data = {
					lng:	lng,
					lat:	lat,
					currPage: 1,
					pageSize: 5
				}
				that.$request.post("/smartBin/findNearbyPage.do", data).then((res) => {
					if (res.data.status === 0) {
						res = JSON.parse(res.data.results);
						res.forEach(item => {
							let binNum = item.synStatus+item.box1Status+item.box2Status+item.box3Status;
							// binNum = '00000100000000000000000000000000000110000000000000000000000000000010000000000000000000000000000000111000000000000000000000000000';//测试用
							let binStatus =  that.$util.getStatus(binNum);
							let boxStatus = [];
							if (item.binEdition==1 && binStatus.length > 0) { //1代智能站
								boxStatus = that.$util.getBin1(binStatus);
							}else if (item.binEdition==2 && binStatus.length > 0) {//2代智能站
								boxStatus = that.$util.getBin2(binStatus);
							}
							console.log(boxStatus)
							if (boxStatus!=undefined) {
								if(boxStatus.mainStatu!=undefined){
									item.mainStatu = boxStatus.mainStatu;
								}
								item.subBin.forEach(item => {
										//判断当前品种是否在满箱的箱子，true为正常，false为满箱
									item.scrapStatu = true;
									if (boxStatus.box!=undefined && boxStatus.box.indexOf(Number( item.box)) > -1) {
										item.scrapStatu = false;
									}
								})
							}
						})
						console.log(res)
						that.smartList = res;
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err, 'none', 5000);
				}).finally(() => {
					
				})
			},
			// //测试两点距离方法一，公式算法，误差比方法二大
			// getDistance1: function(lng1, lat1,  lng2, lat2) {
			// 	var radLat1 = lat1 * Math.PI / 180.0;
			// 	var radLat2 = lat2 * Math.PI / 180.0;
			// 	var a = radLat1 - radLat2;
			// 	var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
			// 	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
			// 	s = s * 6378.137; // 6378.137 地球半径;
			// 	s = Math.round(s * 10000) / 10000;
			// 	return s;
			// },
			// //测试两点距离方法二，请求高德api计算，误差相对小点
			// /* 向高德地图api发送经纬度获取地址详情 */
			// getDistance2: function(lng1, lat1,  lng2, lat2){
			// 	let that = this;
			// 	let key = 'b1ba7b9e724ff8b14678ee90a61856da';
			// 	let origins =  lng1 + ',' + lat1;
			// 	let destination = lng2 + ',' + lat2;
			// 	let url = 'https://restapi.amap.com/v3/distance?origins=' + origins   //起点经纬度
			// 				+ '&destination='+ destination     //目标经纬度
			// 				+ '&output=json&key=' + key 
			// 				+ '&type=0';             // 0 直线距离
			// 	that.$request.get(url).then((res) => {
			// 		console.log(res.data.results[0].distance)
			// 	}).catch((err) => { 
			// 		console.log(err) 
			// 		that.$util.showToast(err, 'none', 5000);
			// 	}).finally(() => {
					
			// 	})
			// }
		},
		onLoad() {
			let that = this;
		},
		onShow() {
			let that = this;
			uni.getLocation({
				type: 'gcj02',
				success: function (res) {
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
					that.getSmartList(res.longitude, res.latitude);//获取附近站点列表
				},
				fail: function(err) {
					console.log("获取用户位置失败");
				}
			});
			that.card = uni.getStorageSync("card");	//获取用户卡号，用于判断用户是否登录
			if (that.card != '') {
				this.getCustomerInfo();	//	获取用户基本信息
			}
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
		width: 25%;
		text-align: center;
		margin: 5px 0;
	}
	.firstContent > image {
		width: 32px;
	}
	.myIncome {
		height: 140px;
		padding-left: 10px;
		background: url(../../static/images/index_incomebg.png) no-repeat;
		background-size: 100% 140px;
	}
	.myIncomeCon {
		background-color: rgb(255,255,255,0.5) ;
		margin: 0 10px 10px;
		height: 100%;
		border-radius: 10px;
	}
	.loginBtn {
		width: 70%;
		background: #00A2ED;
		color: #FFFFFF;
		margin: 0 auto;
		text-align: center;
		line-height: 3em;
		border-radius: 8px;
	}
	.ring {
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background: radial-gradient(circle at 7px 7px, transparent, transparent 2px, #00a2ed 4px, #00a2ed );
		margin-right: 5px;
	}
	.incomeItem {
		border-radius: 4px;
		margin-right: 10px;
		text-align: center;
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
		border: #00a2ed 1px solid;
	}
</style>
