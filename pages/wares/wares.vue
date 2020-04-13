<template>
	<view>
		<view class="imgpanel">
			<image :src=" host + wares.photoPath " class="img" mode="widthFix" />
		</view>
		<view class="cont">
			<view class="wares row jcaround">
				<view>
					<view class="f14"><text class="orange f22">{{ wares.score }}</text>量心币</view>
					<view class="f16">{{ wares.waresName }}</view>
				</view>
				<view>
					<view>
						<view class="rout icon-round_minus_fill gray f26" @click.stop='reduce'/>
						<text style="width: 30px; text-align: center;" class="f20 black">{{ num }}</text>
						<view class="rout icon-roundaddfill gray f26"  @click.stop='plus'/>
					</view>
					<!-- <view>已经兑换<text class="red">{{ wares.count }}</text>件</view> -->
				</view>
			</view>
			<view class="describe">
				<view class="f16 gray bold"> ———— <text>商品详情</text> ———— </view>
				<view class="page pb15 pl10 pr10">
					<!-- <view class="page__bd page__bd_spacing">
						<view class="dk-show">
							<u-parse :content="wares.describe" />
						</view>
					</view> -->
					<u-parse :content="wares.describe" />
				</view>
			</view>
		</view>
		<view class="foot">
			<view class="row">
				<view class="rout icon-cart f24 blue1" />
				<view class="blue1 ascenter f16">总计：<text class="orange">{{ wares.score * num }}</text></view>
			</view>
			<view>
				<button :data-waresid="wares.waresId" :disabled="disabled" @click.stop='exchange'>立即兑换</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components: {
			uParse
		},
		data() {
			return {
				exchangeUrl: "",
				host: '',
				num: 1, // 兑换商品数量
				dkheight: '', // 详情模板高度
				wares: [], // 商品数据
				disabled: false // 兑换按钮开关
			}
		},
		methods: {
			// 减少商品数量
			reduce: function() {
				let that = this;
				let num = that.num;
				if (num > 1) {
					that.num = num - 1;
				}
			},
			// 增加商品数量
			plus: function() {
				let that = this;
				let num = that.num;
				if (num < 99) {
					that.num = num + 1;
				}
			},
			// 点击开始兑换商品
			exchange: function(e) {
				//console.log(e);
				let that = this;
				let countScore = that.wares.score * that.num;
				that.$showLoading(); //显示遮罩
				that.$request.postToken("/users/customer/checkScore.do", {
					score: countScore
				}).then((res) => {
					//console.log(res);
					if (res.data.status === 0) {
						let waresid = that.wares.waresId;
						uni.navigateTo({
							url: '../exchange/exchange?waresId=' + waresid + '&num=' + that.num
						});
					} else {
						that.$util.showToast(res.data.results, 'none', 3000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err.errMsg, 'none', 4000);
				}).finally(() => {
					that.$hideLoading();
				})
			},
			// 获取商品数据
			getWares: function(waresid) {
				let that = this;
				if (waresid != null && waresid != "") {
					that.$showLoading(); //显示遮罩
					that.$request.post("/wares/findOne.do", {
						waresId: waresid
					}).then((res) => {
						if (res.data.status === 0) {
							that.wares = JSON.parse(res.data.results);
							console.log(that.wares);
						} else {
							that.$util.showToast(res.data.results, 'none', 5000);
						}
					}).catch((err) => {
						console.log(err);
						that.$util.showToast(err.errMsg, 'none', 5000);
					}).finally(() => {
						that.$hideLoading();
					})
					// wx.request({
					// 	url: that.data.host + '/user/wares/findWaresByIdUSER',
					// 	method: 'post',
					// 	data: {
					// 		id: waresid
					// 	},
					// 	header: {
					// 		'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
					// 	},
					// 	success: function(dom) {
					// 		var res = dom.data;
					// 		if (res != null && res != "") {
					// 			that.setData({
					// 				wares: res[0]
					// 			});
					// 			console.log(that.data.wares);
					// 			wxparse.wxParse('content', 'html', that.data.wares.Describe, that, 5);
					// 			that.setData({
					// 				dkheight: app.globalData.systemInfo.windowHeight - 180
					// 			})
					// 		} else {
					// 			util.showToast('未能找到商品', 'none', 2000);
					// 			wx.navigateBack({
					// 				delta: 1
					// 			})
					// 		}
					// 	},
					// 	fail: function(err) {
					// 		console.log(err);
					// 		util.showToast(err.errMsg, 'none', 3000);
					// 	}
					// });
				}
			}
		},
		onLoad(options) {
			let that = this;
			let content = '';
			that.host = that.$app.globalData.host
			that.getWares(options.waresid);
		}
	}
</script>

<style>
	@import url("../../components/gaoyia-parse/parse.css");

	.imgpanel {
		width: 100%;
		background: #fff;
		overflow: hidden;
	}
	.img {
		width: 100%;
		height: 240px !important;
	}
	.rout {
		margin: 2px;
	}
	.cont{
		margin-top: 10px;
	}
	.wares {
		width: 100%;
		padding: 10px 0px;
		background-color: #fff;
		box-sizing: border-box;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
	}
	.wares>view:nth-child(1) {
		display: flex;
		width: 60%;
		flex-direction: column;
		justify-content: space-between;
		/* align-items: center; */
		font-size: 18px;
        padding-left: 20px;
	}
	.wares>view:nth-child(1)>view:nth-child(2) {
		width: 65%;
		color: #000;
	}
	.wares>view:nth-child(2) {
		display: flex;
		width: 30%;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		padding-right: 20px;
	}
	.wares>view:nth-child(2)>view:nth-child(1) {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		font-size: 16px;
	}

	/* .count {
		text-align: center;
		border-radius: 50%;
		margin: 0px 5px;
		overflow: hidden;
	}

	.jia {
		width: 22px;
		height: 22px;
		color: #fff;
		background-color: #00a2ed;
	}

	.jia>view {
		font-size: 60px;
		margin-top: -7px;
	}

	.jian {
		width: 20px;
		height: 20px;
		color: #666;
		border: 1px solid #666;
	}

	.jian>icon {
		font-size: 12px;
		font-weight: 900;
		margin-top: -8px;
	} */
	.describe {
		font-size: 20px;
		background: #fff;
		margin-bottom: 50px;
		width: 100%;
	}
	.describe>view:nth-child(1) {
		text-align: center;
	}
	.describe>view:nth-child(1)>text {
		letter-spacing: 2px;
		margin: 0px 5px;
	}
	.foot {
		position: fixed;
		left: 0px;
		bottom: 0px;
		width: 100%;
		font-size: 18px;
		z-index: 100;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
	}
	.foot>view:nth-child(2) {
		padding-right: 5%;
	}
	.foot>view:nth-child(2)>button::before {
		border: none;
	}
	.foot>view:nth-child(2)>button {
		color: #fff;
		background: #00a2ed;
		border-radius: 10px;
		padding: 2px 8px;
		line-height: 1.5em;
		font-size: 16px;
	}
</style>
