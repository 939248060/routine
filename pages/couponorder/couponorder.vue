<template>
	<view>
		<!-- 加价券详情 -->
		<view class="couponInfo bg-white radius4 m10 p10 mb20">
			<view class="bold f16 blue1">订单加价10%</view>
			<view class="gray-9">
				可选择订单的时间：2020.04.01 - 2020.04.07</text>
			</view>
		</view>
		<!-- 可使用的订单列表 -->
		<view class="orderList bg-white">
			<text class="f16">可选择的订单：</text>
			<scroll-view scroll-y="true" style="height: 300px;" class="mt10">
				<radio-group @change="radioChange" class="column f14">
					<label class="row aicenter pb5" v-for="(item, index) in list" :key="item.value">
						<radio :value="item.value" :checked="index === current" style="transform: scale(0.7)" />
						<text class="" style="width: 25%;">{{item.checkTime}}</text>
						<text class="" style="width: 25%;">{{item.actType}}</text>
						<text class="" style="width: 20%;">{{item.actAmount}}公斤</text>
						<text class="red" style="width: 20%;">￥{{item.actTotalPrice}}</text>
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
				current: 0,
				list: [{
					value: '订单编号',
					checkTime: '2020-04-01',
					actType: '废纸皮',
					actAmount: '0.2',
					actTotalPrice: '0.4'
				},{
					value: '订单编号',
					checkTime: '2020-04-01',
					actType: '废书纸',
					actAmount: '0.4',
					actTotalPrice: '0.8'
				},{
					value: '订单编号',
					checkTime: '2020-04-02',
					actType: '中铝易拉罐',
					actAmount: '0.2',
					actTotalPrice: '0.4'
				},{
					value: '订单编号',
					checkTime: '2020-04-03',
					actType: '全新书籍',
					actAmount: '0.2',
					actTotalPrice: '0.4'
				},{
					value: '订单编号',
					checkTime: '2020-04-04',
					actType: '全新纸皮箱',
					actAmount: '0.2',
					actTotalPrice: '0.4'
				},{
					value: '订单编号',
					checkTime: '2020-04-05',
					actType: '优质杂塑料',
					actAmount: '0.2',
					actTotalPrice: '0.4'
				},{
					value: '订单编号',
					checkTime: '2020-04-06',
					actType: '残污衣物',
					actAmount: '0.44',
					actTotalPrice: '0.66'
				},{
					value: '订单编号',
					checkTime: '2020-04-07',
					actType: '费旧报纸',
					actAmount: '0.12',
					actTotalPrice: '0.31'
				},{
					value: '订单编号',
					checkTime: '2020-04-07',
					actType: '费旧报纸',
					actAmount: '0.12',
					actTotalPrice: '0.31'
				},{
					value: '订单编号',
					checkTime: '2020-04-07',
					actType: '费旧报纸',
					actAmount: '0.12',
					actTotalPrice: '0.31'
				},{
					value: '订单编号',
					checkTime: '2020-04-07',
					actType: '费旧报纸',
					actAmount: '0.12',
					actTotalPrice: '0.31'
				},{
					value: '订单编号',
					checkTime: '2020-04-07',
					actType: '费旧报纸',
					actAmount: '0.12',
					actTotalPrice: '0.31'
				},{
					value: '订单编号',
					checkTime: '2020-04-07',
					actType: '费旧报纸',
					actAmount: '0.12',
					actTotalPrice: '0.31'
				}
				]
			}
		},
		methods: {
			//根据加价券获取可使用的订单列表
			getOrder(id) {
				let that = this;
				console.log(id)
			},
			//订单选择
			radioChange: function(e) {
				let that = this;
				for (let i = 0; i < that.list.length; i++) {
					if (that.list[i].value === e.target.value) {
						this.current = i;
						break;
					}
				}
				console.log(e)
			}
		},
		onLoad(options) {
			let that = this;
			if (that.$stringUtil.isNotEmpty(options.id)) {
				that.getOrder(options.id);
			}
		}
	}
</script>

<style>
	.couponInfo {
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
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
