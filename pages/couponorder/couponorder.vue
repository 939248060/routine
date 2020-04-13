<template>
	<view>
		<!-- 加价券详情 -->
		<view class="couponInfo bg-white mb20 p10">
			<view class="bold f16 blue1">{{ list.marCouRecord.markupCoupon.title }}</view>
			<view class="gray-9 row jcbetween"  @click="showRole()">
				<text>可选择订单的时间：{{ list.startTime }} - {{ list.endTime }}</text>
				<view class="rout icon-bottom ml5 asend roleIcon" :class="{'roleIcon--active': isOpen}" />
			</view>
			<!-- 加价券使用规则 -->
			<view v-show="isOpen" class="mt5 pt5 topeee gray-9">
				<text>{{ list.marCouRecord.markupCoupon.contents }}</text>
			</view>
		</view>
		<!-- 可使用的订单列表 -->
		<view class="orderList bg-white">
			<view class="row jcbetween btmeee pl10 pr10 pt5 pb5">
				<text class="" style="width: 65%;">可选择的订单</text>
				<text class="" style="width: 20%;">奖励金</text>
			</view>
			<view v-if="list.binorders.length == 0" class="txtcenter gray-9 pt5">
				暂无符合的订单
			</view>
			<scroll-view v-else scroll-y="true" style="max-height: 300px;" class="mt10 mb5">
				<radio-group @change="radioChange" class="column f14">
					<label class="row aicenter pb5" v-for="(item, index) in list.binorders" :key="item.serialNum">
						<radio :value="item.serialNum" :checked="index === current" style="transform: scale(0.7)" />
						<text class="" style="width: 45%;">{{item.actType}}</text>
						<text class="" style="width: 20%;">￥{{item.actTotalPrice}}</text>
						<text class="red" style="width: 25%;">+￥{{ item.rewardPrice }}</text>
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
				isOpen: false,	//使用规则
				current: '',		//选中的订单
				mcrId: '',			//加价券id
				serialNum: '',	//选中的订单编号
				list: [],
			}
		},
		methods: {
			// 点击打开使用规则
			showRole() {
				let that = this;
				that.isOpen = !that.isOpen;
				this.$forceUpdate();//强制重新渲染
			},
			//订单选择
			radioChange: function(e) {
				let that = this;
				for (let i = 0; i < that.list.binorders.length; i++) {
					if (that.list.binorders[i].serialNum === e.target.value) {
						that.current = i; 
						that.serialNum = e.target.value;
						break;
					}
				}
			},
			//获取加价券详情以及可使用的订单列表
			getList(id) {
				let that = this;
				that.mcrId = id;
				let data = {mcrId: that.mcrId};
				that.$request.postToken("/users/marcourecord/findSingle.do", data).then((res) => {
					if (res.data.status === 0) {
						res = JSON.parse(res.data.results);
						if (res.marCouRecord.markupCoupon.usedType == 1) {
							res.binorders.forEach(item => {
								item.rewardPrice = res.marCouRecord.markupCoupon.usedAmount;	//金额加价
							})
						}else {
							res.binorders.forEach(item => {
								item.rewardPrice = Math.round(item.actTotalPrice * 100 * res.marCouRecord.markupCoupon.usedDiscount)/100;	//百分比加价
							})
						}
						res.startTime = res.startTime.slice(0,10).replace(/-/g,".");
						res.endTime = res.endTime.slice(0,10).replace(/-/g,".");
						that.list = res;
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
				if ( that.current  == null ) {
					that.$util.showToast('请先选择需要加价的订单。', 'none', 1000);
					return
				}
				let data = {
					mcrId: that.mcrId,
					serialNum: that.serialNum
				};
				that.$request.postToken("/users/marcourecord/exchange.do", data).then((res) => {
					if (res.data.status === 0) {
						that.$util.showToast( res.data.results, 'none', 2000);
						setTimeout(function() {
							uni.navigateBack({
								delta: 1	//返回上一页，加价券列表页
							})
						},2000);
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
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
		padding: 5px 15px;
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
	.roleIcon {
		transform: rotate(0deg);
		transform-origin: center center;
	}
	.roleIcon--active {
		transform: rotate(180deg);
	}
	.roleInfo {
		overflow: hidden;
	}
	.roleInfo--animation {
		transition-property: transform;  /* style里面有transform的动画效果 */
		transition-duration: 3s;
		transition-timing-function: ease;
	}
	.roleInfo--hide {
		height: 0px;
		line-height: 0px;
	}
</style>
