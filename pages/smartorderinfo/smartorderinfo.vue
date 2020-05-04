<template>
	<view>
		<view class="bg-white txtcenter p15">
			<view v-if="single.state=='2'">
				<view class="f26 orange">待检验</view>
				<view class="gray-9">请耐心等待检验</view>
			</view>
			<view v-if="single.state=='3'">
				<view class="f26 green">已完成</view>
				<view class="gray-9">本次投放合格率100%，感谢您的支持</view>
			</view>
			<view v-if="single.state=='4'">
				<view class="f26 red">异常单</view>
				<view class="gray-9">本次投放不合格</view>
			</view>
		</view>
		<!--计件订单显示投放清单-->
		<!--<view wx:if="{{info.OrderType=='1'}}" class="bg-white mt10 pb5 pl15 pr15 info">
		  <view class="viewRow pt10 pb10 mb10 f16 bordbtmeee"><view>投放清单</view><view>价格</view></view>
		  <block wx:key="{{index}}" wx:for="{{info.SingleList}}">
		    <view class="viewRow pt5 pb5">
		      <view style="width:80%;"><view>{{item.ScrapName}}<text class="gray f12 ml5">({{item.TypeName}})</text></view></view>
		      <view style="width:20%;" class="txtright"><text class="orange">{{item.Price}}</text> 元</view>    
		    </view>
		  </block>
		  <view class="viewRow pt10 pb10 mt10 bordtopeee">
		    <view>累计获得</view><view><b class="orange">{{sumPrice}}</b> 元</view>
		  </view>
		</view>-->
		<!--称重订单显示-->
		<view class="bg-white mt10 pb5 pl15 pr15 info">
			<view class="viewRow pt10 pb10 f16 bordbtmeee">
				<view>投放物品</view>
				<view>预估价格</view>
			</view>
			<view class="viewRow pt10 pb5" :class="through">
				<view style="width:80%;">
					<view>{{single.expType?single.expType:'--'}}</view>
					<view class="gray f12 pt5">{{single.expAmount?single.expAmount:'--'}} KG</view>
				</view>
				<view style="width:20%;" class="txtright">
					<view><text class="black">{{single.expTotalPrice?single.expTotalPrice:'--'}}</text> 元</view>
					<view class="gray f12 pt5">{{single.expPrice?single.expPrice:'--'}} 元/KG</view>
				</view>
			</view>
		</view>
		<view v-if="single.state>'2'" class="bg-white mt10 pb5 pl15 pr15 info">
			<view class="viewRow pt10 pb10 f16 bordbtmeee">
				<view>实际投放</view>
				<view>实际价格</view>
			</view>
			<view class="viewRow pt10 pb5">
				<view style="width:80%;">
					<view>{{single.actType?single.actType:'--'}}</view>
					<view class="gray f12 pt5">{{single.actAmount?single.actAmount:'--'}} 公斤</view>
				</view>
				<view style="width:20%;" class="txtright">
					<view><text class="orange">{{single.actTotalPrice?single.actTotalPrice:'--'}}</text> 元</view>
					<view class="gray f12 pt5">{{single.actPrice?single.actPrice:'--'}} 元/KG</view>
				</view>
			</view>
		</view>
		<view v-if="single.remarks!=null&&single.remarks!=''" class="viewRow pb10 pl10 pr10 bg-white abnlist">
			<block :key="index" v-for="(item,index) in abnlist">
				<view class="red mr5 mb5">{{item}}</view>
			</block>
		</view>

		<view class="mt10 mb10 pt10 pb10 pl15 pr15 bg-white order">
			<view class="pb10 black f16 bordbtmeee">投放信息</view>
			<view class="viewRow pt15 pb5">
				<view>订单编号</view>
				<view>{{single.serialNum}}</view>
			</view>
			<view class="viewRow pt5 pb5">
				<view>投放时间</view>
				<view>{{single.beginTime}}</view>
			</view>
			<view v-if="single.state>'2'" class="viewRow pt5 pb5">
				<view>检验时间</view>
				<view>{{single.checkTime}}</view>
			</view>
			<view class="viewRow pt5 pb5">
				<view>投放地点</view>
				<view>{{single.address}}</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				host: '', // 主机地址
				single: {}, // 订单详情
				sumPrice: 0, // 计件累计总额
				abnlist: '', // 异常列表
				through: '' // 异常单投放物品栏显示删除线
			}
		},
		methods: {
			// 获取订单详情
			getDetail: function(id) {
				let that = this;
				that.$showLoading();    //显示遮罩
				that.$request.postToken("/users/binorder/findById.do", {
					id: id
				}).then((res) => {
					//console.log(res);
					if (res.data.status === 0) {
						that.single = JSON.parse(res.data.results);
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err.errMsg, 'none', 5000);
				}).finally(() => {
					that.$hideLoading();
				})
			}
		},
		onLoad(options) {
			let that = this;
			if (that.$stringUtil.isNotEmpty(options.id)) {
				that.getDetail(options.id);
			}
		}
	}
</script>

<style>
	.info>view {
		justify-content: space-between;
		align-items: center;
	}

	.abnlist {
		justify-content: left;
		align-items: center;
	}

	.abnlist>view {
		padding: 2px 6px;
		border: 1px solid #f00;
		border-radius: 10px;
	}

	.order>view {
		justify-content: space-between;
		align-items: center;
	}

	.order>view>view:nth-child(1) {
		width: 20%;
		color: #000;
	}

	.order>view>view:nth-child(2) {
		width: 80%;
		text-align: right;
	}
</style>
