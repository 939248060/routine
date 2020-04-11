<template>
	<view>
		<view class="head">
			<view class="column jcaround">
				<view class="f24 white mb5">恭喜您下单成功</view>
				<view class="f16 white">您的商品很快送至您手中</view>
			</view>
		</view>
		<view class="addr row">
			<view class="p5">
				<uni-icons type="location-filled" color="#00a2ed" size="30" />
			</view>
			<view>
				<view class="f18 bold mb5">{{exchange.contact}}<text class="f14 ml5">{{exchange.tel}}</text></view>
				<view>{{exchange.area}} {{exchange.address}} {{exchange.room}}</view>
			</view>
		</view>
		<view class="content">
			<view>量心回收商店</view>
			<view class="row list" v-for="(item,index) in exchange.exchwaresList" :key="index">
				<view>
					<image :src=" host + item.photoPath " mode="widthFix"></image>
				</view>
				<view class="column jcbetween">
					<view class="row jcbetween">
						<text class="f14 black bold">{{item.waresName}}</text>
						<text class="f14 orange mr5 ml10">{{item.score}}</text>
					</view>
					<view class="f14">x{{item.amount}}</view>
				</view>
			</view>
		</view>
		<view class="detail bg-white column p10 mt10">
			<view class="row jcbetween m10 f14">
				<view>订单总价</view>
				<view class="orange bold">{{totalScore}}</view>
			</view>
			<!-- <view class="row jcbetween m10 f12">
				<view>商品总价</view>
				<view class="black">￥1200</view>
			</view>
			<view class="row jcbetween m10 f12">
				<view>商品总价</view>
				<view class="black">￥1200</view>
			</view>
			<view class="row jcbetween m10 f14">
				<view>商品总价</view>
				<view class="black">￥1200</view>
			</view> -->
		</view>
		<view class="info bg-white column p10 mt10 mb10">
			<view class="row jcbetween m10 f14">
				<view>订单编号: <text class="black bold ml5">{{exchange.serialNum}}</text></view>
				<view><text class="orange" :data-serialNum="exchange.serialNum" @click="tapCopy">复制</text></view>
			</view>
			<view class="row jcbetween m10 f14">
				<view>下单时间:<text class="ml5">{{exchange.beginTime}}</text></view>
				<view class="black"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '../..//components/uni-icons/uni-icons.vue';
	
	export default {
		components:{
			uniIcons
		},
		data() {
			return {
				exchange : {},
				host: '',
				totalScore: 0
			}
		},
		methods: {
			//获取订单详情
			getDetail: function(exchangeId){
				let that = this;
				that.$showLoading();   //显示遮罩
				let data = {'exchangeId': exchangeId}
				that.$request.postToken('/users/exchange/findSingle.do',data).then((res)=>{
					if (res.data.status === 0) {
						let exchange = JSON.parse(res.data.results);
						exchange.exchwaresList.forEach(item=>{
							that.totalScore += item.totalScore;
						})
						that.exchange = exchange;
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err.errMsg, 'none', 5000);
				}).finally(() => {
					that.$hideLoading();    //隐藏遮罩
				})
			},
			// 点击复制订单号事件
			tapCopy: function(e) {
				let that = this;
				console.log(e)
				uni.setClipboardData({
					data: e.currentTarget.dataset.serialnum,
					success: function(res) {
						that.$util.showToast("复制成功", "none", 2000);
					}
				})
			},
		},
		onLoad(options) {
			let that = this;
			that.host = that.$app.globalData.host;
			let exchangeId = options.exchangeId;    //获取兑换ID
			that.getDetail(exchangeId);
		}
	}
</script>

<style>
	.head{
		height: 90px; width: 100%; 
		padding: 15px 0px; 
		background-image: url(~@/static/images/exchangeInfo.png); 
		background-repeat:no-repeat;
		background-size: 100% 100%;
	}
	.head>view{
		padding: 10px 20px;
	}
	.addr{
		margin-top: 5px;
		padding: 15px 10px;
		background-color: #fff;
	}
	.content{
		background-color: #FFFFFF;
		margin-top: 5px;
	}
	.content>view:nth-child(1){
		padding: 15px 20px;
		font-size: 16px;
		font-weight: 700;
		color: black;
	}
	.list{
		background-color: #eee;
		padding: 10px 0px;
	}
	.list>view:nth-child(1){
		width: 30%;
		padding: 10px 10px;
	}
	.list>view:nth-child(1)>image{
		width: 100%;
		vertical-align: middle;
		border-radius: 10px;
	}
	.list>view:nth-child(2){
		width: 70%;
		padding: 10px 10px;
	}
	
	.detail{
		width: 100%;
	}
	.info{
		width: 100%;
	}
</style>
