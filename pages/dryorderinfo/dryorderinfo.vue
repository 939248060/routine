<template>
	<view>
		<view class="bg-white txtcenter p15">
			<view v-if="info.state=='2'">
				<view class="f26 orange">待检验</view>
				<view class="gray-9">请耐心等待检验</view>
			</view>
			<view v-if="info.state=='3'">
				<view class="f26 green">已完成</view>
				<view class="gray-9">本次投放合格率100%，感谢您的支持</view>
			</view>
			<view v-if="info.state=='4'">
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
				<view>预估量心币</view>
			</view>
			<view class="viewRow pt10 pb5" :class="through">
				<view style="width:70%;">
					<view>{{info.expType}}</view>
					<view class="gray f12 pt5">{{info.expAmount}} KG</view>
				</view>
				<view style="width:30%;" class="txtright">
					<view><text class="black">{{info.expTotalScore}}</text> 量心币</view>
					<view class="gray f12 pt5">{{info.expScore}} 量心币/KG</view>
				</view>
			</view>
		</view>
		<view v-if="info.state>'2'" class="bg-white mt10 pb5 pl15 pr15 info">
			<view class="viewRow pt10 pb10 f16 bordbtmeee">
				<view>实际投放</view>
				<view>实际量心币</view>
			</view>
			<view class="viewRow pt10 pb5">
				<view style="width:70%;">
					<view>{{info.actType}}</view>
					<view class="gray f12 pt5">{{info.actAmount}} 公斤</view>
				</view>
				<view style="width:30%;" class="txtright">
					<view><text class="orange">{{info.actTotalScore}}</text> 量心币</view>
					<view class="gray f12 pt5">{{info.actScore}} 量心币/KG</view>
				</view>
			</view>
		</view>
		<view v-if="info.remarks!=null&&info.remarks!=''" class="viewRow pb10 pl10 pr10 bg-white abnlist">
			<block :key="index" v-for="(item,index) in abnlist">
				<view class="red mr5 mb5">{{item}}</view>
			</block>
		</view>

		<view class="mt10 mb10 pt10 pb10 pl15 pr15 bg-white order">
			<view class="pb10 black f16 bordbtmeee">投放信息</view>
			<view class="viewRow pt15 pb5">
				<view>订单编号</view>
				<view>{{info.serialNum}}</view>
			</view>
			<view class="viewRow pt5 pb5">
				<view>投放时间</view>
				<view>{{info.beginTime}}</view>
			</view>
			<view v-if="info.state > '2'" class="viewRow pt5 pb5">
				<view>检验时间</view>
				<view>{{info.checkTime}}</view>
			</view>
			<view class="viewRow pt5 pb5">
				<view>投放地点</view>
				<view>{{info.address}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				host: '', // 主机地址
				info: [], // 订单详情
				sumPrice: 0, // 计件累计总额
				abnlist: '', // 异常列表
				through: '' // 异常单投放物品栏显示删除线
			}
		},
		methods: {
			// 获取订单详情
			getDetail: function(id) {
				let that = this;
				that.$showLoading(); //显示遮罩
				let data = {
					id: id
				};
				that.$request.postToken("/users/boxorder/findById.do", data).then((res) => {
					if (res.data.status === 0) {
						let simple = JSON.parse(res.data.results);
						that.info = simple;
						if (simple.state === '4') {
							that.through = 'through';
							if (simple.remarks != null && simple.remarks != "") {
								let remarks = simple.remarks.split(",");
								that.abnlist = remarks;
							}
						}
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err, 'none', 5000);
				}).finally(() => {
					that.$hideLoading() // 关闭过度遮罩
				})

				// wx.getStorage({
				// 	key: 'custToken',
				// 	success: function(res) {
				// 		var token = res.data;
				// 		wx.request({
				// 			url: that.data.host + '/servlet/dryorder/findDryorderInfoUSER',
				// 			method: 'post',
				// 			data: {
				// 				dryid: id
				// 			},
				// 			header: {
				// 				'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
				// 				'token': token
				// 			},
				// 			success: function(dom) {
				// 				util.isLogin(dom.header);
				// 				//console.log(dom);
				// 				var res = dom.data;
				// 				if (res != null && res != "") {
				// 					that.setData({
				// 						info: res[0]
				// 					});
				// 					// 异常单
				// 					if (res[0].State == '4') {
				// 						that.setData({
				// 							through: 'through'
				// 						});
				// 						if (res[0].Remarks != null && res[0].Remarks != "") {
				// 							let remarks = res[0].Remarks.split(",");
				// 							that.setData({
				// 								abnlist: remarks
				// 							});
				// 						}
				// 					}
				// 				}
				// 			},
				// 			fail: function(err) {
				// 				console.log(err);
				// 				util.showToast(err.errMsg, 'none', 3000);
				// 			},
				// 		});
				// 	},
				// 	fail: function(err) {
				// 		console.log(err);
				// 		//util.showToast(err.errMsg, 'none', 3000);
				// 		wx.redirectTo({
				// 			url: '../login/login'
				// 		});
				// 	}
				// })
			}
		},
		onLoad(options) {
			let that = this;
			that.host = that.$app.globalData.host;    // 从全局中获取主机地址
			let orderid = options.id;
			
			if (orderid != null && orderid != "") {
				that.getDetail(orderid);
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
