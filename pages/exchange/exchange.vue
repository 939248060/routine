<template>
	<view>
		<view v-if="finish==false">
			<navigator class="viewRow address" url="../addresslist/addresslist?parent=exchange">
				<view>
					<icon class="rout icon-dizhi f20"></icon>
				</view>
				<view v-if="address!=''">
					<view>{{address.contact}} - {{address.tel}}</view>
					<view>{{address.area}}{{address.address}}</view>
				</view>
				<view class="noadd" v-if="address==''">请选择收货地址</view>
				<view>
					<icon class="rout icon-dayuhao"></icon>
				</view>
			</navigator>

			<view class="viewRow wares">
				<view>
					<image :src=' host + wares.photoPath ' class="img" mode="widthFix" />
				</view>
				<view class="viewRow">
					<view class="f16 black">兑换 {{ wares.waresName}}</view>
					<view class="viewRow">
						<view>量心币：<text class="orange">{{ wares.score }}</text>币</view>
						<view>x{{ num }}</view>
					</view>
				</view>
				<view class="viewRow">
					<view>合计：</view>
					<view><text class="orange">{{ wares.score * num }}</text> 币</view>
				</view>
			</view>

			<view>
				<button class="btn" @click='exchange'>提交订单</button>
			</view>
		</view>

		<view v-if=" finish == true " class="finish">
			<view>
				<icon class="rout icon-chenggong blue1"></icon>
			</view>
			<view class="mt20 mb20 f24">订单已提交</view>
			<navigator url="../personal/personal" open-type="switchTab" class="nav mt15 mb15 p10">前往个人中心</navigator>
			<navigator url="../index/index" open-type="switchTab" class="nav mt15 mb15 p10">返回首页</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				host: '', // 服务器地址
				address: [], // 默认地址
				wares: [], // 兑换商品信息
				finish: false, // 是否成功兑换
				num: 0 // 兑换商品数量
			}
		},
		methods: {
			// 获取收货地址
			getAddress: function(id) {
				let that = this;
				that.$showLoading();    //显示遮罩
				that.$request.postToken("/users/address/findDefaultAddress.do", {
					id: id
				}).then((res) => {
					if (res.data.status === 0) {
						that.address = JSON.parse(res.data.results);
					} else {
						that.$util.showToast(res.data.results, 'none', 4000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err.errMsg, 'none', 4000);
				}).finally(() => {
					that.$hideLoading();
				})
			},
			// 获取商品列表
			getWares: function(waresId) {
				let that = this;
				if (that.$stringUtil.isEmpty(waresId)) {
					that.$util.showToast("商品不存在", "none", 4000);
					return;
				}
				that.$showLoading();    //显示遮罩
				that.$request.postToken("/users/wares/findOne.do", {
					waresId: waresId
				}).then((res) => {
					if (res.data.status === 0) {
						that.wares = JSON.parse(res.data.results);
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
						wx.navigateBack({
							delta: 1
						});
					}
				}).catch((err) => {
					that.$util.showToast(err.errMsg, 'none', 4000);
				}).finally(() => {
					that.$hideLoading();   //关闭遮罩
				})
			},
			// 兑换商品
			exchange: function(e) {
				let that = this;
				if (that.$stringUtil.isEmpty(that.address.addressId)) {
					that.$util.showToast("请选择收货地址", "none", 4000);
					return;
				}
				let data = {
					waresId: that.wares.waresId,
					addressId: that.address.addressId,
					num: that.num
				}
				that.$showLoading();    //显示遮罩
				that.$request.postToken("/users/exchange/updExchange.do", data).then((res) => {
					if (res.data.status === 0) {
						that.finish = true;
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					that.$util.showToast(err.errMsg, 'none', 4000);
				}).finally(() => {
					that.$hideLoading();   //关闭遮罩
				})
			}
		},
		onLoad(options) {
			let that = this;
			let num = 1;
			that.host = that.$app.globalData.host;
			if (that.$stringUtil.isNotEmpty(options.num)) {
				num = options.num;
			}
			that.num = num;
			// 获取兑换商品信息
			that.getWares(options.waresId);
		},
		onShow() {
			let that = this;
			let address = uni.getStorageSync("address");
			that.address = address;
		}
	}
</script>

<style>
	page {
		background: #f6f6f6;
	}

	.address {
		justify-content: left;
		align-items: center;
		background: #fff;
	}

	.address>view:nth-child(1) {
		width: 10%;
		text-align: center;
	}

	.address>view:nth-child(2) {
		width: 85%;
		padding: 10px 0px;
	}

	.address>view:nth-child(3) {
		width: 5%;
		text-align: center;
	}

	.noadd {
		padding: 15px 0px !important;
	}

	.wares {
		justify-content: left;
		padding: 10px;
		margin-top: 10px;
		background-color: #fff;
	}

	.wares>view:nth-child(1) {
		width: 20%;
	}

	.wares>view:nth-child(2) {
		width: 80%;
		padding-left: 10px;
		align-content: space-between;
	}

	.wares>view:nth-child(2)>view:nth-child(2) {
		width: 100%;
		justify-content: space-between;
		align-items: flex-end;
	}

	.wares>view:nth-child(3) {
		width: 100%;
		font-size: 16px;
		padding: 10px 5px 0px 5px;
		margin-top: 10px;
		color: #000;
		border-top: 1px solid #eee;
		justify-content: space-between;
	}

	.img {
		width: 100%;
		vertical-align: middle;
	}

	.btn {
		margin-top: 10px;
		width: 90%;
		color: #fff;
		background: #00a2ed;
		margin:10px auto;
		border-radius: 5px;
	}

	.finish {
		position: fixed;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		text-align: center;
		justify-content: center;
		align-items: center;
		background: #fff;
	}

	.finish>view:nth-child(1)>icon {
		font-size: 80px;
	}

	.nav {
		width: 70%;
		font-size: 18px;
		background: #00a2ed;
		color: #fff;
		border-radius: 20px;
	}
</style>
