<template>
	<view>
		<image src="../../static/images/visit_banner.png" mode="widthFix" style="width: 100%;"/>
		<view class="gray-9 mt15 mb15 txtcenter">————<text class="f16 bold mb10 gray-6 ml5 mr5 "> 选择回收类型 </text>————</view>
		<view class="column m15 txtcenter">
			<view class="row mb10 f16 bold">
				<view class="line" />
				<text>量心币</text>
			</view> 
			<view class="row mb25 ml5">
				<view class="colum mr25" @click="tapOpenPanel('政府回收')">
					<image class="img" src="../../static/images/tu1.png" mode="widthFix" />
					<view class="gray-9">政府回收</view>
				</view>
			</view>
			<view class="row mb10 f16 bold">
				<view class="line" />
				<text>零钱</text>
			</view> 
			<view class="row mb25 ml5">
				<view class="colum mr25" @click="tapOpenPanel('商户回收')">
					<image class="img" src="../../static/images/tu4.png" mode="widthFix" />
					<view class="gray-9">商户回收</view>
				</view>
				<view class="colum mr25" @click="tapOpenPanel('保洁回收')">
					<image class="img" src="../../static/images/tu6.png" mode="widthFix" />
					<view class="gray-9">保洁回收</view>
				</view>
			</view>
			
			<!-- 呼叫回收面板 -->
			<view v-show="formPanel" class="mask" />
			<view v-show="formPanel" class="dialog txtcenter">
				<form @submit="sendForm(title)" report-submit="true">
					<view class="bg-white radius6 pb5">
						<view class="row jcend ">
							<view class=" pt10 f18">{{ title }}</view>
							<view @click='tapClosePanel' class="rout icon-roundclose gray f26 m5" style="margin-left: 30%;" />
						</view>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formPanel: false, // 呼叫回收面板
				customer: {},
				address: {},
				title: "",	//呼叫回收面板标题
			}
		},
		methods: {
			// 弹出预约回收面板
			tapOpenPanel: function(title) {
				let that = this;
				that.title = title;	//面板标题，选中的回收类型
				that.formPanel = true;
			},
			// 关闭预约回收面板
			tapClosePanel: function() {
				let that = this;
				that.formPanel = false;
			},
			// 呼叫回收
			sendForm: function(title) {
				let that = this;
				let address = that.address;
				if (that.$stringUtil.isEmpty(address.contact)) {
					that.$util.showToast("请选择收货地址", "none", 4000)
					return false;
				}
				that.$showLoading(); // 显示遮罩
				let temp = address; // 添加地址
				if (title == "政府回收") {
					temp.recyType = '1'; //回收类型，量心币回收
				}else if (title == "商户回收" || title == "保洁回收") {
					temp.recyType = '4'; //回收类型，零钱回收
				}
				that.$request.postToken("/users/recyorder/government.do", {
					data: JSON.stringify(temp)
				}).then((res) => {
					//console.log(res);
					that.$util.showToast(res.data.results, 'none', 3000);
					that.formPanel = false;
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
						that.customer = JSON.parse(res.data.results);
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
				that.address = address;
			}
			this.getCustomerInfo();	//	获取用户基本信息
		}
	}
</script>

<style>
	page {
		position: fixed;	 /* 固定页面内容不移动 */
	}
	.img {
		width: 48px;
	}
	
	.line {
		width: 5px;
		background: #00A2ED;
		margin-right: 5px;
	}
	/* 呼叫回收面板样式 */
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
