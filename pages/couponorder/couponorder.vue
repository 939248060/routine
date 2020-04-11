<template>
	<view>
		<!-- 加价券详情 -->
		<view class="couponInfo bg-white mb20 p10">
			<view class="bold f16 blue1">订单加价10%</view>
			<view class="gray-9">
				可选择订单的时间：2020.04.01 - 2020.04.07</text>
			</view>
		</view>
		<!-- 可使用的订单列表 -->
		<view class="orderList bg-white">
			<text class="f16">可选择的订单：</text>
			<scroll-view scroll-y="true" style="height: 300px;" class="mt10 mb5">
				<radio-group @change="radioChange" class="column f14">
					<label class="row aicenter pb5" v-for="(item, index) in list" :key="item.value">
						<radio :value="item.value" :checked="index === current" style="transform: scale(0.7)" />
						<text class="" style="width: 45%;">{{item.actType}}</text>
						<text class="gray-9" style="width: 20%;">￥{{item.actTotalPrice}}</text>
						<text class="red" style="width: 20%;">+￥{{ item.rewardPrice }}</text>
					</label>
				</radio-group>
			</scroll-view>
		</view>
		
		<button class="sendOrder" @click='sendOrder'>立即使用</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: '',		//选中的订单
				list: [{
					value: '订单编号1',
					checkTime: '2020-04-01',
					actType: '废纸皮',
					actTotalPrice: '0.4',
					rewardPrice: '0.04',	//使用加价券后的返利
				},{
					value: '订单编号2',
					checkTime: '2020-04-01',
					actType: '废书纸',
					actTotalPrice: '0.8',
					rewardPrice: '0.08',	//使用加价券后的返利
				},{
					value: '订单编号3',
					checkTime: '2020-04-02',
					actType: '中铝易拉罐',
					actTotalPrice: '0.4',
					rewardPrice: '0.04',	//使用加价券后的返利
				},{
					value: '订单编号4',
					checkTime: '2020-04-03',
					actType: '全新书籍',
					actTotalPrice: '2.4',
					rewardPrice: '0.24',	//使用加价券后的返利
				},{
					value: '订单编号5',
					checkTime: '2020-04-04',
					actType: '全新纸皮箱',
					actTotalPrice: '11.4',
					rewardPrice: '1.14',	//使用加价券后的返利
				},{
					value: '订单编号6',
					checkTime: '2020-04-05',
					actType: '优质杂塑料',
					actTotalPrice: '17',
					rewardPrice: '0.17',	//使用加价券后的返利
				},{
					value: '订单编号7',
					checkTime: '2020-04-06',
					actType: '残污衣物',
					actTotalPrice: '0.66',
					rewardPrice: '0.06',	//使用加价券后的返利
				},{
					value: '订单编号8',
					checkTime: '2020-04-07',
					actType: '费旧报纸',
					actTotalPrice: '0.31',
					rewardPrice: '0.03',	//使用加价券后的返利
				},{
					value: '订单编号9',
					checkTime: '2020-04-07',
					actType: '费旧报纸',
					actTotalPrice: '6.31',
					rewardPrice: '0.63',	//使用加价券后的返利
				},{
					value: '订单编号10',
					checkTime: '2020-04-07',
					actType: '费旧报纸',
					actTotalPrice: '5.31',
					rewardPrice: '0.53',	//使用加价券后的返利
				},{
					value: '订单编号11',
					checkTime: '2020-04-07',
					actType: '费旧报纸',
					actTotalPrice: '12.0',
					rewardPrice: '1.2',	//使用加价券后的返利
				},{
					value: '订单编号12',
					checkTime: '2020-04-07',
					actType: '费旧报纸',
					actTotalPrice: '0.31',
					rewardPrice: '0.03',	//使用加价券后的返利
				},{
					value: '订单编号13',
					checkTime: '2020-04-07',
					actType: '费旧报纸',
					actTotalPrice: '0.31',
					rewardPrice: '0.03',	//使用加价券后的返利
				}
				]
			}
		},
		methods: {
			//订单选择
			radioChange: function(e) {
				let that = this;
				for (let i = 0; i < that.list.length; i++) {
					if (that.list[i].value === e.target.value) {
						that.current = i; 
						break;
					}
				}
			},
			//获取加价券详情以及可使用的订单列表
			getList(id) {
				let that = this;
				let mcrId = id;
				that.$request.postToken("/users/marcourecord/findPage.do", mcrId).then((res) => {
					if (res.data.status === 0) {
						console.log(res)
						// res = JSON.parse(res.data.results);
					} else {
						that.$util.showToast(data, 'none', 5000);
					}
				}).catch((err) => {
				console.log(err);
				that.$util.showToast(err.errMsg, 'none', 5000);
				if (err.errMsg === '401') {
					uni.redirectTo({
						url: '../login/login'
					});
				}
				}).finally(() => {
					that.$hideLoading();
				})
			},
			//立即使用
			sendOrder() {
				let that = this;
				that.$util.showToast('加价成功，即将返回订单列表。', 'none', 2500);
				setTimeout(function() {
					uni.switchTab({
						url: '../orderlist/orderlist'
					})
				},2500);
			}
		},
		onLoad(options) {
			let that = this;
			if (that.$stringUtil.isNotEmpty(options.id)) {
				that.getList(options.id);//获取加价券详情以及可使用的订单列表
			}
		}
	}
</script>

<style>
	.couponInfo {
		/* box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); */
	}
	.orderList {
		padding: 10px 15px;
	}
	label {
		margin: 5px 0;
		border-bottom: 1px dashed #EEEEEE;
	}
	.sendOrder {
		width: 70%;
		margin-top: 20px;
		color: #FFFFFF;
		background: #00A2ED;
		border-radius: 10px;
		line-height: 2em;
	}
</style>
