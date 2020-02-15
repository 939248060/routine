<template>
	<view>
		<form @submit="sendForm">
		  <view class="addform">
		    <view class="inputbox">
		      <text>姓名</text>
		      <input type="text" name="contact" maxlength="10" :value="single.contact" placeholder="请输入联系人" />
		    </view>
		    <view class="inputbox">
		      <text>手机号码</text>
		      <input type="number" name="tel" maxlength="11" :value="single.tel" placeholder="请输入手机号码" />
		    </view>
		    <view class="inputbox">
		      <text>所属地区</text>
		      <view @click='pikerScenesTap'>{{region[0]['areaName']}} {{region[1]['areaName']}} {{region[2]['areaName']}}</view>
		    </view>
		    <view class="inputbox">
		      <text>详细地址</text>
		      <textarea name="address" :value="single.address" placeholder="请输人详细地址"></textarea>
		      <icon class='rout icon-dizhi'></icon>
		    </view>
		    <view class="inputbox">
		      <text>门牌号</text>
		      <input type="text" name="room" :value="single.room" placeholder="请输入门牌号" />
		    </view>
		  </view>
		  <button class="addbtn" formType="submit">保存</button>
		</form>
		
		
		<view class="picker" v-if="pikerScenes">
		  <view class="picker-closed">
		    <text @click='pikerCancel'>取消</text>
		    <text class="fr green" @click='pikerConfirm'>确认</text>
		  </view>
		  <view class="picker-view">
		    <picker-view indicator-style="height: 40px;" :value="value" @change="bindChange">
		      <picker-view-column>
		        <view v-for="(vo,index) in province" :key="index" :data-province-id="vo.areaId">{{vo.areaName}}</view>
		      </picker-view-column>
		      <picker-view-column>
		        <view v-for="(vo,index) in city" :key="index" :data-city-id="vo.areaId">{{vo.areaName}}</view>
		      </picker-view-column>
		      <picker-view-column>
		        <view v-for="(vo,index) in area" :key="index" :data-area-id="vo.areaId">{{vo.areaName}}</view>
		      </picker-view-column>
		    </picker-view>
		  </view>
		</view>
		
		<!--加载动画-->
		<loading />
	</view>
</template>

<script>
	const area = require('../../utils/area.js');
	
	export default {
		data() {
			return {
				host: '',
			    addId: '',
			    address: {},
			    single: {},
			    region: [
			      { 'areaId': 1, 'areaName': '海南省' },
			      { 'areaId': 2, 'areaName': '海口市' },
			      { 'areaId': 3, 'areaName': '秀英区' }
			    ],
			    regionInfo: [],         // piker滚动选中值
			    value: [0, 0, 0],       // 默认选择数组 0:第一个数组 ，这里是三列
			    province: [],           // 默认省份数组
			    city: [],               // 默认城市数组
			    area: [],               // 默认地区数组
			    pikerScenes: false      // piker显示场景 true:显示  false:不显示
			}
		},
		methods: {
			  // 获取明细
			  getDetailed: function (id) {
			    let that = this;
				that.$showLoading();   //显示遮罩
			    that.$request.postToken("/users/address/findById.do", { id }).then((res) => {
			      if (res.data.status === 0) {
			        let single = JSON.parse(res.data.results);
					console.log(single)
			        let aid = single.areaIds.split(',');
			        let aname = single.area.split(' ');
			        let areas = [];
			        for (let i = 0; i < aname.length; i++) {
			          let area = {};
			          area.areaId = aid[i];
			          area.areaName = aname[i];
			          areas.push(area);
			        }
			        that.getAreaList(areas[0]['areaId'], areas[1]['areaId'], areas[2]['areaId']);
					that.$data.region = areas;
					that.$data.addId = id;
					that.$data.single = single;
			      } else {
			        that.$util.showToast(res.data.results, 'none', 5000);
			      }
			    }).catch((err) => {
			      console.log(err);
			      that.$util.showToast(err, 'none', 5000);
			    }).finally(() => {
			      that.$hideLoading();   //隐藏遮罩
			    })
			  },
			  bindChange: function (e) {
			    let that = this;
			    let obj;
			    let value = e.detail.value;
			    let info = that.$data.regionInfo;
			    let v;
			    console.log(value);
			    // 省列表数据
			    let provinceList = area.areaParent("0");
			    // 选中省信息
			    let provinceInfo = provinceList[value[0]];
			    // 市列表数据
			    let cityList = area.areaParent(provinceInfo['areaId']);
			    let cityListLength = cityList.length;
			    // 队列超长处理
			    if (cityListLength < value[1] + 1) {
			      value[1] = 0;
			    }
			    // 选中市信息
			    let cityInfo = cityList[value[1]];
			    // 区列表数据
			    let areaList = area.areaParent(cityInfo['areaId']);
			    let areaListLength = areaList.length;
			    if (areaListLength < value[2] + 1) {
			      value[2] = 0;
			    }
			    // 选中区信息
			    let areaInfo = areaList[value[2]];
			    obj = [provinceInfo, cityInfo, areaInfo];
				that.$data.province = provinceList,
				that.$data.city = cityList,
				that.$data.area = areaList,
				that.$data.value = value,
				that.$data.regionInfo = obj
			  },
			  getAreaList: function (proid, cityid, areaid) {
			    let that = this;
			    let value = [];
			    // 省列表数据
			    let provinceList = area.areaParent("0");
			    // 选中省信息    
			    for (let pi = 0; pi < provinceList.length; pi++) {
			      if (provinceList[pi]['areaId'] == proid) {
			        value[0] = pi;
			      }
			    }
			    console.log(provinceList);
			    let cityList = area.areaParent(proid);
			    for (let ci = 0; ci < cityList.length; ci++) {
			      if (cityList[ci]['areaId'] == cityid) {
			        value[1] = ci;
			      }
			    }
			    let city
			    let areaList = area.areaParent(cityid);
			    for (let ai = 0; ai < areaList.length; ai++) {
			      if (areaList[ai]['areaId'] == areaid) {
			        value[2] = ai;
			      }
			    }
				that.$data.province = provinceList;
				that.$data.city = cityList;
				that.$data.area = areaList;
				that.$data.value = value;
			  },
			  // 点击所属地区显示或隐藏piker
			  pikerScenesTap: function () {
			    let that = this;
			    let pikerScenes = that.$data.pikerScenes;
			    let p = pikerScenes == true ? false : true;
				that.$data.regionInfo = that.$data.region;
				that.$data.pikerScenes = p;
			  },
			  pikerConfirm: function () {
			    let that = this;
			    let info = that.$data.regionInfo;
			    if (info != null && info != "") {
				  that.$data.region = that.$data.regionInfo;
			    }
			    // 隐藏piker
			    that.pikerScenesTap();
			  },
			  pikerCancel: function () {
			    let that = this;
			    that.pikerScenesTap();
			  },
			  getLocation: function () {
			    let amap = new amapFile.AMapWX({ key: 'sa3fdbd001d903290e836c26420f011bfr' });
			    amap.getRego({
			      success: (res) => {
			        console.log(res, res[0].regeocodeData.formatted_address);
			      }
			    });
			  },
			  sendForm: function (e) {
			    let that = this;
			    let temp = {};
			    let url = '/address/user/add.do';    // 默认添加地址
			    if (that.$stringUtil.isNotEmpty(that.$data.single.addressId)) {
			      temp.addressId = that.$data.single.addressId;
			      url = '/address/user/update.do';
			    }
			    temp.contact = e.detail.value.contact;
			    temp.tel = e.detail.value.tel;
			    temp.address = e.detail.value.address;
			    temp.room = e.detail.value.room;
			    var areas = that.$data.region;
			    if (that.$stringUtil.isChinese(temp.contact) == false || that.$stringUtil.isLong(temp.contact, "2,8") == false) {
			      that.$util.showToast("联系人必须由2到8个字的中文组成", 'none', 2000);
			      return false;
			    }
			    if (that.$stringUtil.isMobile(temp.tel) == false) {
			      that.$util.showToast("请输入正确手机号", 'none', 2000);
			      return false;
			    }
			    if (temp.address.length == 0) {
			      that.$util.showToast("请输入详细地址", 'none', 2000);
			      return false;
			    }
			    if (that.$stringUtil.isLong(temp.address, "1,30") == false) {
			      that.$util.showToast("详细地址不能超过30个字符", 'none', 2000);
			      return false;
			    }
			    if (temp.room.length == 0) {
			      that.$util.showToast("请输入门牌号", 'none', 2000);
			      return false;
			    }
			    if (that.$stringUtil.isLong(temp.room, "1,20") == false) {
			      that.$util.showToast("门牌号不能超过20个字符", 'none', 2000);
			      return false;
			    }
				that.$showLoading();   //显示遮罩
			    temp.areaIds = areas[0]['areaId'] + "," + areas[1]['areaId'] + "," + areas[2]['areaId']
			    temp.areaId = areas[2]['areaId'];
			    temp.area = areas[0]['areaName'] + ' ' + areas[1]['areaName'] + ' ' + areas[2]['areaName'];
			    
			    that.$request.postToken(url, { data: JSON.stringify(temp) }).then((res) => {
			      if (res.data.status === 0) {
			        let pages = getCurrentPages();  // 获取当前页面的页帧
			        if (pages.length > 1) {
			          var prePage = pages[pages.length - 2];
			          prePage.onShow();
			          uni.navigateBack({ delta: 1 })
			        }
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
			  // 获取地址信息
			  getAddress: function (id) {
			    let that = this;
			    let token = uni.getStorageSync("custToken");
			    if (that.$stringUtil.isEmpty(token)) {
			      uni.redirectTo({ url: '../login/login' });
			    }
				that.$showLoading();   //显示遮罩
			    uni.request({
			      url: that.data.host + '/address/user/findById.do', method: 'post', data: { id: id },
			      header: { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'token': token },
			      success: function (dom) {
			        //console.log(dom);
			        if (dom.statusCode != 200) {
			          that.$util.showToast('发生未知错误：' + dom.statusCode, 'none', 3000);
			          return;
			        }
			        that.$util.isLogin(dom.header);
			        let res = dom.data;
			        console.log(res);
			        if (res.status == 0) {
			          var obj = JSON.parse(res.results);
			          let aid = obj.areaIds.split(',');
			          let aname = obj.area.split(' ');
			          let areas = [];
			          for (let i = 0; i < aname.length; i++) {
			            let area = {};
			            area.areaId = aid[i];
			            area.areaName = aname[i];
			            areas.push(area);
			          }
			          that.getAreaList(areas[0]['areaId'], areas[1]['areaId'], areas[2]['areaId']);
					  that.$data.region = areas;
					  that.$data.addId = id;
					  that.$data.address = obj;
			        } else {
			          that.$util.showToast(res.results, 'none', 3000);
			        }
			      },
			      fail: function (err) {
			        console.log(err);
			        that.$util.showToast(err.errMsg, 'none', 3000);
			      },
				  finally:function(){
					  that.$hideLoading();
				  }
			    })
			  },
		},
		onLoad(option) {
			let that = this;
			that.id = option.id;
		},
		onShow(){
			
		},
		onReady() {
			let that = this;
			let id = that.id;
			if (that.$stringUtil.isNotEmpty(id)) {
			  that.getDetailed(id);
			} else {
			  let provinceList = area.areaParent(0);
			  let cityList = area.areaParent(provinceList[0]['areaId']);
			  let areaList = area.areaParent(cityList[0]['areaId']);
			  that.province = provinceList;
			  that.city = cityList;
			  that.area = areaList;
			} 
		}
	}
</script>

<style>
.addform {
  background: #fff;
}
.addform .inputbox {
  display: flex; 
  flex-direction: row; 
  border-bottom: 1px solid #eee;
  padding: 20rpx 0rpx;
  align-items: center;
  box-sizing: border-box; 
}
.addform .inputbox > text { min-width: 24%; max-width: 30%; padding-left: 30rpx; }
.addform .inputbox > input { min-width: 72%; max-width: 90%; }
.addform .inputbox > textarea { min-width: 60%; max-width: 64%; height: 120rpx; }
.addform .inputbox > icon { min-width: 8%; text-align: center; }

.picker { width: 100%; height: 240px; position: fixed; bottom: 0px; background: #fff;}
.picker-closed { height: 20px; padding: 10px; border-top: 1px solid #eee; border-bottom: 1px solid #eee}
.picker-view { height: 190px; text-align: center; }
.picker-view picker-view{ width: 100%; height: 100%; }
.picker-view picker-view picker-view-column view{ font-size: 16px; height: 40px; line-height: 40px; }
</style>
