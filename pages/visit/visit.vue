<template>
	<view>
		<image src="../../static/images/visit_banner.png" mode="widthFix" style="width: 100%;"/>
		<view class="column m15 txtcenter">
			<view class="gray-9 mb15">————<text class="f16 bold mb10 gray-6 ml5 mr5 "> 选择回收类型 </text>————</view>
			<view class="list row" data-recy="1" @click="tapOpenPanel">
				<view class="m10"><image src="../../static/images/tu1.png" mode="widthFix" /></view>
				<view class="column txtleft" style="width: 80%;">
					<view class="row jcbetween">
						<text class="f16 bold gray-3 mb5 mt10">政府预约</text>
						<view class="appoint asstart">立即预约</view>
					</view>
					<text class="gray-9">省直机关垃圾分类协议回收单位</text>
				</view>
			</view>
			<navigator url="../electrical/electrical" class="list row">
				<view class="m10"><image src="../../static/images/tu2.png" mode="widthFix" /></view>
				<view class="column txtleft" style="width: 80%;">
					<view class="row jcbetween">
						<text class="f16 bold gray-3 mb5 mt10">家电回收</text>
						<view class="appoint asstart">立即预约</view>
					</view>
					<text class="gray-9">居民线上下单，废旧家电便捷回收</text>
				</view>
			</navigator>
			<navigator url="../furniture/furniture" class="list row">
				<view class="m10"><image src="../../static/images/tu3.png" mode="widthFix" /></view>
				<view class="column txtleft" style="width: 80%;">
					<view class="row jcbetween">
						<text class="f16 bold gray-3 mb5 mt10">家具清运</text>
						<view class="appoint asstart">立即预约</view>
					</view>
					<text class="gray-9">大件家具上门清运，省心省时省力</text>
				</view>
			</navigator>
			<view class="list row" data-recy="4" @click="tapOpenPanel">
				<view class="m10"><image src="../../static/images/tu4.png" mode="widthFix" /></view>
				<view class="column txtleft" style="width: 80%;">
					<view class="row jcbetween">
						<text class="f16 bold gray-3 mb5 mt10">商户回收</text>
						<view class="appoint asstart">立即预约</view>
					</view>
					<text class="gray-9">高效便捷，值得信赖的回收品牌</text>
				</view>
			</view>
		</view>
		
		<!--政府回收-->
		<view v-show="governmentHid" class="mask" />
		<view v-show="governmentHid" class="dialog txtcenter">
			<form @submit="sendGovernment" report-submit="true">
				<view class="bg-white radius6 pb5">
					<view class="row jcend ">
						<view class=" pt10 f18">政府回收</view>
						<view @click='tapClosePanel' class="rout icon-roundclose gray f26 m5" style="margin-left: 30%;" data-recy="1" />
					</view>
					<!-- <navigator url="../showhtml/showhtml?nav=government" class="txtcenter pt10 pb10 f14">戳这里了解详细情况</navigator> -->
					<!--收货地址-->
					<navigator class="row jcleft aicenter m10 address radius6 f14" url="../addresslist/addresslist?parent=government">
						<view class="rout icon-dizhi txtcenter f20" />
						<view class="elips">
							<text v-if="address.contact!=null">{{address.contact}} - {{address.tel}}\n{{address.area}}{{address.address}}</text>
							<text v-else class="">请选择收货地址</text>
						</view>
						<view class="rout icon-dayuhao overhidden txtcenter" />
					</navigator>
					<button class="f16 white bg-blue1 radiu6" formType="submit" style="width: 80%;">呼叫回收</button>
				</view>
			</form>
		</view>
		<!--商户回收-->
		<view v-show="merchantHid" class="mask" />
		<view v-show="merchantHid" class="dialog txtcenter">
			<form @submit="sendMerchant" report-submit="true">
				<view class="bg-white radius6 pb5">
					<view class="row jcend ">
						<view class=" pt10 f18">商户回收</view>
						<view @click='tapClosePanel' class="rout icon-roundclose gray f26 m5" style="margin-left: 30%;" data-recy="4" />
					</view>
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
					<button class="f16 white bg-blue1 radiu6" formType="submit" style="width: 80%;">呼叫回收</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				governmentHid: false, // 政府回收面板
				merchantHid: false, // 商户回收面板
				customer: {},
				address: {},
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
			}
		},
		onLoad() {
			let that = this;
			that.getDefaultAddr(); // 获取默认地址
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
	.list {
		background: #FFFFFF;
		margin-bottom: 15px;
		border-radius: 10px;
	}
	.list > view:nth-of-type(1) {
		height: 50px;
		width: 50px;
	}
	.list > view > image {
		width: 100%;
	}
	.appoint {
		color: #FFFFFF;
		background: #00A2ED;
		padding: 3px 8px;
		border-radius: 12px 0 12px 0;
		min-width: 52px;
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
</style>
