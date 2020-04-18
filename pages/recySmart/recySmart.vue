<template>
	<view>
		<map id="map" style="width: 100%;" :style="{height: mapheight + 'px'}" :longitude="longitude" :latitude="latitude"
		 :markers="markers" @markertap="showMarker" @click="hiddenpaenl"></map>
		<block>
			<cover-view class="smart" :class="{check:checkbin === 'smart'}" @click='showSmart'>智能箱</cover-view>
			<cover-view class="dry" :class="{check:checkbin === 'dry'}" @click='showDry'>干垃圾箱</cover-view>
			<cover-view class="smartlist" @click='linkBinList'>列表模式</cover-view>
		</block>

		<cover-view class="info" v-if="smartpanel">
			<cover-view class="row jcbetween">
				<cover-view class="row aicenter">
					<cover-view class="rout icon-locationfill f20 blue1 mr5" />
					<cover-view class="f16 bold">{{single.name}}站</cover-view>
				</cover-view>
				<cover-view class="box boxblue1 radius4 mr5 lh18" style="padding: 5px 8px;" @click='navToBin'>到这里去</cover-view>
			</cover-view>
			<cover-view class="f12 mt5 ml5 gray-9">{{single.address}}</cover-view>
			<cover-view class="row f12 m5">
				<cover-view class="row mr15 aicenter">
						<cover-view class="ball bg-blue1 mr5" />
						<cover-view class="gray-9">正常投递</cover-view>
				</cover-view>
				<cover-view class="row mr15 aicenter">
						<cover-view class="ball bg-red mr5" />
						<cover-view class="gray-9">满箱</cover-view>
				</cover-view>
				<cover-view v-show="mainStatu!=''" class="box radius4 boxred"> {{ mainStatu }}</cover-view>
			</cover-view>
			<cover-view class="dot mb10" />
			<cover-view class="row wrap jcleft aicenter" style="overflow-y: scroll; height: 100px;">
				<cover-view v-for="(item,index) in single.subBin" :key="index" class="row jcleft mb15" style="width: 50%;">
					<cover-view class="row" style="border-radius: 4px; box-sizing: border-box;" :class="{'scrapLeftBorder1':item.scrapStatu, 'scrapLeftBorder2':!item.scrapStatu}">
						<cover-view class="scrapRight" :class="{'bg-blue1':item.scrapStatu, 'bg-red':!item.scrapStatu}" />
						<cover-view class="scrapLeft txtleft">
							<cover-view class="f14">{{item.scrapType}}</cover-view>
							<cover-view class="f14">{{item.price}}元/kg</cover-view>
						</cover-view>
					</cover-view>
					
				</cover-view>
			</cover-view>
		</cover-view>

		<cover-view class="info" v-if="drypanel">
			<cover-view class="name">
				<cover-view>{{ single.name }}</cover-view>
				<cover-image class="navimg" src="../../static/images/nav.png" @click='navToBin'></cover-image>
			</cover-view>
			<cover-view class="row jcleft aicenter pb10 f16">
				<cover-view class="rout icon-locationfill f20 gray-9 mr5" />
				<cover-view>{{ single.address }}</cover-view>
			</cover-view>
			<!--<cover-view class="dot"></cover-view>  
		  <cover-view class="scraplist">
		    <block wx:for="{{ smartbin.SubBinPriceList }}" wx:for-item="item" wx:for-index="idx">
		      <cover-view class="scrap">
		        <cover-image class="img" src="../../images/{{ item.TypeCode }}.png"></cover-image>
		        <cover-view>
		          <cover-view>{{ item.TypeName }}</cover-view>
		          <cover-view>{{ item.Price }}/{{ item.Unit }}</cover-view>
		        </cover-view>
		      </cover-view>
		    </block>
		  </cover-view>-->
		</cover-view>
		<!--过度遮罩-->
		<loading />
	</view>
</template>

<script>
	const app = getApp();
	var util = require('../../utils/util.js');
	var amapFile = require('../../utils/amap-wx.js');
	const request = require('../../utils/request.js');

	export default {
		data() {
			return {
				host: '',
				gdkey: '425ae27b23c22857e78eff196685e1f7',
				checkbin: 'smart',
				mapwidth: 0,
				mapheight: 0,
				latitude: 0,
				longitude: 0,
				smartpanel: false,
				drypanel: false,
				smartbin: [], // 选中智能箱信息
				drybin: {}, // 选中干垃圾箱信息
				location: {}, // 当前定位marker
				markers: [],
				single: {} ,// 选中箱体信息
				mainStatu: '',//打印机缺纸
			}
		},
		methods: {
			linkBinList: function() {
				uni.navigateTo({
					url: '../binlist/binlist'
				})
			},
			//获取用户当前位置
			getLocation: function() {
				let that = this;
				var location = {}; // 用户当前位置
				uni.getLocation({
					// type: 'wgs84',
					//type: 'gcj02', 
					success: function(res) {
						console.log("用户允许获取定位");
						location.latitude = res.latitude;
						location.longitude = res.longitude;
					},
					fail: function(err) {
						console.log("获取用户位置失败");
						location.latitude = 20.00226;
						location.longitude = 110.313278;
					},
					complete: function(res) {
						location.id = 0;
						location.iconPath = "../../static/images/location.png";
						location.width = 30;
						location.height = 30;
						let markers = that.markers.concat(location);
						console.log(location)
						that.latitude = location.latitude;
						that.longitude = location.longitude;
						that.markers = markers;
						that.getSmartBin();
					}
				})
			},
			//干垃圾箱数据
			getDryBin: function() {
				var that = this;
				that.$showLoading(); //显示遮罩
				that.$request.postToken("/users/smartBox/findPosition.do", {}).then((res) => {
					let markers = [];
					markers = markers.concat(that.location); // 当前定位marker
					if (res.data.status == 0) {
						let list = JSON.parse(res.data.results);
						console.log(list);
						markers.length = 0;
						list.forEach(item => {
							let marker = {};
							marker.id = item.code;
							marker.iconPath = "../../static/images/dryposition.png";
							marker.latitude = item.lat;
							marker.longitude = item.lng;
							marker.width = 56;
							marker.height = 56;
							markers = markers.concat(marker);
						})
						that.markers = markers;
					} else {
						that.$util.showToast(res.data.results, 'none', 3000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err.errMsg, 'none', 4000);
				}).finally(() => {
					that.$hideLoading();
				});
				// uni.request({
				//   url: that.host + '/servlet/drybin/findDryBinPosition', method: 'post',
				//   header: { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8', },
				//   success: function (dom) {
				// 	console.log(dom);
				// 	let res = dom.data;
				// 	let markers = [];
				// 	// 当前定位marker
				// 	markers = markers.concat(that.location);
				// 	//console.log(res);
				// 	if (res != null && res != "") {
				// 	  for (let i = 0; i < res.length; i++) {
				// 		let marker = {};
				// 		marker.id = res[i].Code;
				// 		marker.iconPath = "../../static/images/dryposition.png";
				// 		marker.latitude = res[i].Lat;
				// 		marker.longitude = res[i].Lng;
				// 		marker.width = 56;
				// 		marker.height = 56;
				// 		markers = markers.concat(marker);
				// 	  }
				// 	  that.markers = markers;
				// 	}
				//   },
				//   fail: function (err) {
				// 	console.log(err);
				// 	that.$util.showToast(err.errMsg, 'none', 3000);
				//   }
				// });
			},
			//智能箱数据
			getSmartBin: function() {
				let that = this;
				let markers = that.markers;
				that.$showLoading(); //显示遮罩
				that.$request.postToken("/users/smartBin/findPosition.do", {}).then((res) => {
					if (res.data.status == 0) {
						let list = JSON.parse(res.data.results);
						console.log(list);
						markers.length = 0;
						list.forEach(item => {
							let temp = {};
							temp.id = item.code;
							temp.iconPath = "../../static/images/smart.png";
							temp.latitude = item.lat;
							temp.longitude = item.lng;
							temp.width = 30;
							temp.height = 30;
							markers = markers.concat(temp);
						})
						that.markers = markers;
					} else {
						that.$util.showToast(res.data.results, 'none', 3000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err.errMsg, 'none', 4000);
				}).finally(() => {
					that.$hideLoading();
				});
			},
			// 显示智能箱markers
			showSmart: function() {
				let that = this;
				if (that.checkbin != "smart") {
					that.drypanel = false
					that.checkbin = "smart";
					that.getSmartBin();
				}
			},
			// 显示干垃圾箱markers
			showDry: function() {
				var that = this;
				if (that.checkbin != "dry") {
					that.smartpanel = false;
					that.checkbin = "dry";
					that.getDryBin();
				}
			},
			// 点击markers以外区域隐藏panel
			hiddenpaenl: function(e) {
				let that = this;
				that.smartpanel = false
				that.drypanel = false;
			},
			// 点击marker显示箱体数据
			showMarker: function(e) {
				let that = this;
				let code = e.markerId;
				let markers = that.markers;
				if (code != null && code != "") {
					//干垃圾箱选中效果
					if (code.indexOf("G") > -1) {
						that.$showLoading(); //显示遮罩
						that.$request.postToken("/users/smartBox/findInfo.do", { code }).then((res) => {
							if (res.data.status == 0) {
								let single = JSON.parse(res.data.results);
								let markers = that.markers;
								// 循环markers拉大被选中marker图片，恢复其他marker图片大小，从1开始，0为用户坐标marker
								for (let i = 1, len = markers.length; i < len; i++) {
									if (markers[i].id == single.code) {
										markers[i].width = 40;
										markers[i].height = 40;
									} else {
										markers[i].width = 30;
										markers[i].height = 30;
									}
								}
								that.markers = markers;
								that.single = single;
								console.log(that.single)
								that.drypanel = true;
								that.smartpanel = false;
							} else {
								that.$util.showToast(res.data.results, 'none', 3000);
							}
						}).catch((err) => {
							console.log(err);
							that.$util.showToast(err.errMsg, 'none', 4000);
						}).finally(() => {
							that.$hideLoading();
						});
						// uni.request({
						// 	url: that.host + '/servlet/drybin/findDryBinInfo',
						// 	method: 'post',
						// 	data: {
						// 		code: code
						// 	},
						// 	header: {
						// 		'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
						// 	},
						// 	success: function(dom) {
						// 		//console.log(dom);
						// 		// 循环markers拉大被选中marker图片，恢复其他marker图片大小，从1开始，0为用户坐标marker
						// 		for (let i = 1; i < markers.length; i++) {
						// 			markers[i].width = 56;
						// 			markers[i].height = 56;
						// 			if (markers[i].id == code) {
						// 				markers[i].width = 76;
						// 				markers[i].height = 76;
						// 			}
						// 		}
						// 		that.markers = markers;
						// 		let res = dom.data;
						// 		that.bin = res[0];
						// 		that.smartpanel = false;
						// 		that.drypanel = true;

						// 	},
						// 	fail: function(err) {
						// 		console.log(err);
						// 		that.$util.showToast(err.errMsg, 'none', 3000);
						// 	}
						// });
					} else {
						//智能站选中效果
						console.log(code);
						that.$showLoading(); //显示遮罩
						that.$request.postToken("/users/smartBin/findInfo.do", { code }).then((res) => {
							if (res.data.status == 0) {
								let single = JSON.parse(res.data.results);
								let markers = that.markers;
								// 循环markers拉大被选中marker图片，恢复其他marker图片大小，从1开始，0为用户坐标marker
								for (let i = 1, len = markers.length; i < len; i++) {
									if (markers[i].id == single.code) {
										markers[i].iconPath = "../../static/images/smart_select.png";
										markers[i].width = 40;
										markers[i].height = 40;
									} else {
										markers[i].iconPath = "../../static/images/smart.png";
										markers[i].width = 30;
										markers[i].height = 30;
									}
								}
								that.markers = markers;
								let binNum = single.synStatus+single.box1Status+single.box2Status+single.box3Status;
								// binNum = '00000100000000000000000000000000000110000000000000000000000000000010000000000000000000000000000000111000000000000000000000000000';//测试用
								let binStatus =  that.$util.getStatus(binNum);
								let boxStatus = [];
								if (single.binEdition==1 && binStatus.length > 0) { //1代智能箱
									boxStatus = that.$util.getBin1(binStatus);
								}else if (single.binEdition==2 && binStatus.length > 0) {//2代智能箱
									boxStatus = that.$util.getBin2(binStatus);
								}
								console.log(boxStatus)
								if (boxStatus!=undefined) {
									if(boxStatus.mainStatu!=undefined){
										that.mainStatu = boxStatus.mainStatu;
									}
									single.subBin.forEach(item => {
											//判断当前品种是否在满箱的箱子，true为正常，false为满箱
										item.scrapStatu = true;
										if (boxStatus.box!=undefined && boxStatus.box.indexOf(Number( item.box)) > -1) {
											item.scrapStatu = false;
										}
									})
								}
								that.single = single;
								console.log(that.single)
								that.drypanel = false;
								that.smartpanel = true
							} else {
								that.$util.showToast(res.data.results, 'none', 3000);
							}
						}).catch((err) => {
							console.log(err);
							that.$util.showToast(err.errMsg, 'none', 4000);
						}).finally(() => {
							that.$hideLoading();
						});
					}
				}
			},
			// 点击导航按钮进入小程序导航选择界面
			navToBin: function() {
				let that = this;
				let single = that.single;
				//console.log(bin);
				uni.openLocation({
					longitude: Number(single.lng),
					latitude: Number(single.lat),
					name: single.name,
					address: single.address
				})
			},
		},
		onLoad(data) {
			let that = this;
			that.host = that.$app.globalData.host;
			//#ifdef MP-WEIXIN
			that.mapheight = that.$app.globalData.systemInfo.windowHeight + 50;
			//#endif

			//#ifdef MP-ALIPAY
			that.mapheight = that.$app.globalData.systemInfo.windowHeight;
			//#endif
			// 若是查看更多点进来的就要获取用户当前位置，若是智能站点进来的直接定位到站点位置
			if(data.lng==undefined) {
				that.getLocation();	//获取用户当前位置
			}else {
				that.longitude = data.lng;
				that.latitude = data.lat;//经纬度定位当前站点位置
				that.getSmartBin();//智能箱列表
				let e = {markerId: data.code}
				that.showMarker(e);//显示当前选择的站点
			}
			
			// setTimeout(()=>{
			// 	that.mapheight = that.$app.globalData.systemInfo.windowHeight + 50;
			// 	that.getLocation();
			// },200)

			var AmapFun = new amapFile.AMapWX({
				key: that.gdkey
			});
			/*var marker = new AmapFun.Marker({
			  position: [110.314841, 19.996499]
			});*/
			AmapFun.getRegeo({
				success: function(data) {
					//console.log(data);
				},
				fail: function(err) {
					console.log(err);
				}
			});
		},
		onShow() {

		}
	}
</script>

<style>
	.showlist {
		display: flex;
		top: 10px;
		left: 50%;
		width: 40px;
		height: 40px;
		transform: translate(-50%);
		-webkit-transform: translate(-50%);
		justify-content: center;
		text-align: center;
		font-size: 14px;
		position: absolute;
	}

	.dry, .smart, .smartlist {
		position: absolute;
		width: 96px;
		font-size: 18px;
		text-align: center;
		line-height: 2em;
		font-weight: 600;
		background: #fff;
		border: 1px solid #999;
		border-radius: 10px;
	}
	.smart {
		top: 10px;
		left: -9px;
	}
	.dry {
		top: 55px;
		left: -9px;
	}
	.smartlist {
		top: 10px;
		right: -9px;
	}

	.check {
		color: #00a2ed;
		border: 1px solid #00a2ed;
	}

	.show {
		bottom: 0px;
	}

	.hidden {
		bottom: -1000px;
	}

	.info {
		position: absolute;
		left: 0px;
		bottom: 0px;
		width: 100%;
		padding: 10px 20px;
		background-color: #fff;
		box-sizing: border-box;
		border-radius: 10px 10px 0 0;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .3);
	}

	.info .name {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-between;
		font-size: 18px;
		padding: 10px 0px;
		color: #000;
	}

	.dot {
		height: 1px;
		background-color: #ccc;
	}

	.scraplist {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 10px 0px;
	}

	.scrap {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		width: 33.33%;
		padding-top: 16px;
	}

	.img {
		width: 34px;
		height: 34px;
	}

	.navimg {
		width: 50px;
		height: 26px;
	}
	.ball{
		border-radius: 50%;
		width: 10px;
		height: 10px;
	}
	.scrapRight{
		width: 15px;
	}
	.scrapLeft{
		padding: 2px 5px;
		border-left: none;
	}
	.scrapLeftBorder1 {
		border: 1px solid #00a2ed;
	}
	.scrapLeftBorder2 {
		border: 1px solid #f00;
	}
</style>
