<template>
	<view>
		<map id="map" style="width: 100%;" :style="{height: mapheight + 'px'}" :longitude="longitude" :latitude="latitude" :markers="markers" @markertap="showMarker" @click="hiddenpaenl"></map>
		<block v-if="checkbin === 'smart'">
		  <cover-view class="smart check" @click='showSmart'>智能箱</cover-view>
		  <cover-view class="dry" @click='showDry'>干垃圾箱</cover-view>
		</block>
		<block v-if="checkbin === 'dry'">
		  <cover-view class="smart" @click='showSmart'>智能箱</cover-view>
		  <cover-view class="dry check" @click='showDry'>干垃圾箱</cover-view>
		</block>
		
		<cover-view class="info" v-if="smartpanel">  
		  <cover-view class="name">
		    <cover-view>{{single.name}}</cover-view>
		    <cover-image class="navimg" src="../../static/images/nav.png" @click='navToBin'></cover-image>
		  </cover-view>
		  <cover-view class="row jcleft aicenter pb10 f16">
		    <cover-image class="addimg mr5" src="../../static/images/address.png"></cover-image>
		    <cover-view>{{single.address}}</cover-view>
		  </cover-view>
		  <cover-view class="dot mb10" />
		  <cover-view  class="row wrap jcleft aicenter" >
		    <cover-view v-for="(item,index) in single.subBin" :key="index" class="row jcleft aicenter mb5 f15" style="width: 33.33%">
		      <cover-image class="img mr10" :src="'../../static/images/' + item.scrapCode + '.png'"></cover-image>
		      <cover-view class="txtleft">
		        <cover-view class="h24 lh24" >{{item.scrapType}}</cover-view>
		        <cover-view class="h26 lh26">{{item.price}}元 / kg</cover-view>
		      </cover-view>
		    </cover-view>
		  </cover-view>
		</cover-view>
		
		<cover-view class="info" v-if="drypanel">
		  <cover-view class="name">
		    <cover-view>{{ bin.Name }}</cover-view>
		    <cover-image class="navimg" src="../../static/images/nav.png" @click='navToBin'></cover-image>
		  </cover-view>
		  <cover-view class="add">
		    <cover-image class="addimg mr5" src="../../static/images/address.png"></cover-image>
		    <cover-view>{{ bin.Address }}</cover-view>
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
				smartbin: [],        // 选中智能箱信息
				drybin: {},          // 选中干垃圾箱信息
				location: {},        // 当前定位marker
				markers: [],
				single: {}              // 选中箱体信息
			}
		},
		methods: {
			linkBinList: function() {
				uni.navigateTo({ url: '../binlist/binlist' })
			},
			getLocation: function() {
				let that = this;
				var location = {};    // 用户当前位置
				uni.getLocation({
				  // type: 'wgs84',
				  //type: 'gcj02', 
				  success: function (res) {
					console.log("用户允许获取定位");
					location.latitude = res.latitude;
					location.longitude = res.longitude;
				  },
				  fail: function (err) {
					console.log("获取用户位置失败");
					location.latitude = 20.0076;
					location.longitude = 110.29357;
				  },
				  complete: function(res) {
					location.id = 0;
					location.iconPath = "../../static/images/location.png";
					location.width = 30;
					location.height = 30;
					let markers = that.$data.markers.concat(location);
					console.log(location)
					that.$data.latitude = location.latitude;
					that.$data.longitude = location.longitude;
					that.$data.markers = markers;
					that.getSmartBin();
				  }
				})
			},
			getDryBin: function() {
				var that = this;
				uni.request({
				  url: that.$data.host + '/servlet/drybin/findDryBinPosition', method: 'post',
				  header: { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8', },
				  success: function (dom) {
					console.log(dom);
					let res = dom.data;
					let markers = [];
					// 当前定位marker
					markers = markers.concat(that.$data.location);
					//console.log(res);
					if (res != null && res != "") {
					  for (let i = 0; i < res.length; i++) {
						let marker = {};
						marker.id = res[i].Code;
						marker.iconPath = "../../images/dryposition.png";
						marker.latitude = res[i].Lat;
						marker.longitude = res[i].Lng;
						marker.width = 56;
						marker.height = 56;
						markers = markers.concat(marker);
					  }
					  that.$data.markers = markers;
					}
				  },
				  fail: function (err) {
					console.log(err);
					that.$util.showToast(err.errMsg, 'none', 3000);
				  }
				});
			},
			getSmartBin: function() {
				let that = this;
				let markers = that.$data.markers;
				that.$showLoading();   //显示遮罩
				that.$request.postToken("/users/smartBin/findPosition.do", { }).then((res) => {
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
					  temp.width = 70;
					  temp.height = 70;
					  markers = markers.concat(temp);
					})
					that.$data.markers = markers;
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
				if (that.$data.checkbin != "smart") {
				  that.$data.drypanel = false
				  that.$data.checkbin = "smart";
				  that.getSmartBin();      
				}
			},
			// 显示干垃圾箱markers
			showDry: function() {
				var that = this;
				if (that.$data.checkbin != "dry") {
				  that.$data.smartpanel = false;
				  that.$data.checkbin = "dry";
				  that.getDryBin();      
				}
			},
			// 点击markers以外区域隐藏panel
			hiddenpaenl: function (e) {
				let that = this;
				that.$data.smartpanel = false
				that.$data.drypanel = false;
			},
			// 点击marker显示箱体数据
			showMarker: function(e) {
				let that = this;
				let code = e.markerId;
				let markers = that.$data.markers;    
				if (code != null && code != "") {
				  if (code.indexOf("G") > -1) {
					uni.request({
					  url: that.$data.host + '/servlet/drybin/findDryBinInfo', method: 'post',
					  data: { code: code },
					  header: { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8', },
					  success: function (dom) {
						//console.log(dom);
						// 循环markers拉大被选中marker图片，恢复其他marker图片大小，从1开始，0为用户坐标marker
						for (let i = 1; i < markers.length; i++) {
						  markers[i].width = 56;
						  markers[i].height = 56;
						  if (markers[i].id == code) {
							markers[i].width = 76;
							markers[i].height = 76;
						  }
						}
						that.$data.markers = markers;
						let res = dom.data;
						that.$data.bin = res[0];
						that.$data.smartpanel = false;
						that.$data.drypanel = true;
						
					  },
					  fail: function (err) {
						console.log(err);
						that.$util.showToast(err.errMsg, 'none', 3000);
					  }
					});
				  } else {
					console.log(code);
					that.$showLoading();  //显示遮罩
					that.$request.postToken("/users/smartBin/findInfo.do", { code }).then((res) => {
					  if (res.data.status == 0) {
						let single = JSON.parse(res.data.results);
						let markers = that.$data.markers;
						// 循环markers拉大被选中marker图片，恢复其他marker图片大小，从1开始，0为用户坐标marker
						for (let i = 1, len = markers.length;i < len;i++) {
						  if (markers[i].id == single.code) {
							markers[i].width = 90;
							markers[i].height = 90;
						  } else {
							markers[i].width = 70;
							markers[i].height = 70;
						  }
						}
						that.$data.markers = markers;
						that.$data.single = single;
						that.$data.drypanel = false;
						that.$data.smartpanel = true
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
				let single = that.$data.single;
				//console.log(bin);
				uni.openLocation({
				  longitude: Number(single.lng),
				  latitude: Number(single.lat),
				  name: single.name,
				  address: single.address
				})
			},
		},
		onLoad() {
			let that = this;
			
			that.host = that.$app.globalData.host;
			//#ifdef MP-WEIXIN
				that.mapheight = that.$app.globalData.systemInfo.windowHeight+50;
			//#endif
			
			//#ifdef MP-ALIPAY
				that.mapheight = that.$app.globalData.systemInfo.windowHeight;
			//#endif
			console.log(that.mapheight)
			that.getLocation();
			// setTimeout(()=>{
			// 	that.mapheight = that.$app.globalData.systemInfo.windowHeight + 50;
			// 	that.getLocation();
			// },200)
			 
			var AmapFun = new amapFile.AMapWX({ key: that.$data.gdkey });
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

.dry {
  position: absolute;
  top: 10px;
  right: -9px;
  width: 96px;
  height: 36px;
  font-size: 18px;
  text-align: center;
  line-height: 42px;  
  font-weight: 600;
  background: #fff;
  border: 1px solid #666;
  border-radius: 10px;
}
.smart {
  position: absolute;
  top: 10px;
  left: -8px;
  width: 90px;
  height: 36px;
  font-size: 18px;
  text-align: center;
  line-height: 42px;  
  font-weight: 600;
  background: #fff;
  border: 1px solid #666;
  border-radius: 10px;
}
.check { color: #00a2ed; border: 1px solid #00a2ed; }
.show { bottom: 0px; }
.hidden { bottom: -1000px; }
.info { position: absolute; left: 0px; bottom: 0px; width: 100%; padding: 10px 20px; background-color: #fff;  box-sizing: border-box; }
.info .name { 
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  font-size: 22px; 
  padding: 10px 0px; 
  color: #000; 
}
.dot { height: 1px; background-color: #ccc; }
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

.showpanel { position: absolute; bottom: 0px; left: 0px; }
.img { width: 34px; height: 34px; }
.addimg { width: 20px; height: 20px; }
.navpanel { position: absolute; background: #000; width: 100px; height: 50px; top: 20px; right: 10px; }
.navimg { width: 50px; height: 26px; }
</style>
