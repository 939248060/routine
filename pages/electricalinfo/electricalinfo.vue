<template>
	<view>
		<view v-if="single.state==1" class="bg-blue1 white p10 f18">等待回收员接单 > </view>
		<view v-else-if="single.state==2" class="bg-blue1 white p10 f18">等待回收员上门 > </view>
		<view v-else-if="single.state==3" class="bg-blue1 white p10  f18">订单已完成 > </view>
		<view v-else-if="single.state==4" class="bg-blue1 white p10 f18">订单已失效 > </view>

		<view class="mt10 ml10 mr10 bg-white radius8">
			<view v-if="single.state==1" class="pl15 pt10 black">等待回收员接单，量心回收为绿色地球努力</view>
			<view v-else-if="single.state==2" class="pl15 pt10 black">回收员已经接单，请耐心等候回收员上门回收</view>
			<view v-else class="pl15 pt10 black">感谢您对量心回收的信任，期待再次预约。</view>
			<view class="row jcleft aicenter p10">
				<view v-if="single.state<3" class="cancelBtn red" :data-id="single.recyorderId" @click="tapCancel">取消订单</view>
				<navigator v-else url="../electrical/electrical" open-type="redirect" class="pl10 pr10 item">再次预约</navigator>
			</view>
			<view class="row jcbetween aicenter topeee f14" style="background: #fbfbfb">
				<view class="call" @click="tapCallService"><text class="rout icon-phone mr5" />联系客服</view>
				<view v-if="single.staffMobile!=null" class="call" @click="tapCallMan"><text class="rout icon-dianhua1 mr5" />联系回收员</view>
			</view>
		</view>

		<!--回收物清单列表-->
		<view class="bg-white mt10 ml10 mr10 radius8">
			<view class="ml10 mr10 p10 txtcenter black f15">清运清单</view>
			<view v-for="(item,index) in single.recydetail" :key="index" class="row jcleft detail bg-white">
				<image :src="host+'/images/routine/'+item.image" :data-idx="index" @error="errImg" />
				<view class="ml10">
					<view class="row jcbetween aicenter mt10 f15 black">
						<view>{{item.scrapName}}</view>
						<view v-if="single.state==3" class="red oper">￥ {{item.totalPrice}} 元</view>
						<view v-else class="oper">预估：<text class="red">￥ {{item.totalPrice}} 元</text></view>
					</view>
					<view class="gray f13 mt5">{{item.scrapNames}}</view>
				</view>
			</view>
			<view class="txtright ml10 mr10 pt10 pb10 pr5 topeee black f15">
				合计：<text class="red">￥ {{single.totalPrice}} 元</text>
			</view>
		</view>

		<!--图片-->
		<view v-if="single.images!=null&&single.images!=''" class="m10 pl15 pr15 btmeee radius8 bg-white">
			<view class="pt10 pb10 black btmeee bold7 f16">家具信息</view>
			<view class="row jcleft aicenter pt10 pb10">
				<view v-for="(item,index) in images" :key="index" class="overhidden txtcenter" style="width: 25%; position: relative;">
					<image :src="item" mode="widthFix" :data-idx="index" @click="tapPreviewImage" style="width: 85%;" />
				</view>
			</view>
		</view>

		<!--订单信息、联系电话、详细地址-->
		<view class="m10 pl15 pr15 btmeee radius8 bg-white">
			<view class="pt10 pb10 black btmeee bold7 f16">订单信息</view>
			<!--用户订单号-->
			<view class="serialinfo">
				<view>订单编号</view>
				<view class="row jcend aicenter">{{single.serialNum}}
					<view class="copy" @click="tapCopy">复制</view>
				</view>
			</view>
			<!--用户下单时间-->
			<view class="serialinfo">
				<view>下单时间</view>
				<view>{{single.beginTime}}</view>
			</view>
			<!--回收员接单后显示-->
			<view v-if="single.staffName!=null" class="serialinfo">
				<view>回收人员</view>
				<view>{{single.staffName}}</view>
			</view>
			<!--订单状态为3显示完成时间-->
			<view v-if="single.state==3" class="serialinfo">
				<view>完成时间</view>
				<view>{{single.endTime}}</view>
			</view>
			<!--订单状态为4显示失效时间-->
			<view v-else-if="single.state==4" class="serialinfo">
				<view>失效时间</view>
				<view>{{single.endTime}}</view>
			</view>
			<!--用户联系人，联系电话和上门地址-->
			<view class="serialinfo">
				<view>收货地址</view>
				<view><text>{{single.contact}} {{single.tel}}\n{{single.address}}{{single.room}}</text></view>
			</view>
			<!--订单备注-->
			<view v-if="single.remarks!=null&&single.remarks!=''" class="serialinfo">
				<view>订单备注</view>
				<view>{{single.remarks}}</view>
			</view>
		</view>

		<!--过度遮罩-->
		<loading />

		<dialogs id='dialog' ref='dialog' title=' ' content='是否取消该订单' cancelText='取消' confirmText='确定' @cancelEvent="_cancelEvent"
		 @confirmEvent="_confirmEvent">
		</dialogs>

	</view>
</template>

<script>
	import dialogs from "../../components/dialog/dialog.vue";

	export default {
		components: {
			dialogs
		},
		data() {
			return {
				host: '',
				single: '',
				images: []
			}
		},
		methods: {
			// 错误图片替换
			errImg: function(e) {
				let that = this;
				let single = that.single;
				let idx = e.target.dataset.idx; // 获取错误图片的集合下标
				single.recydetail[idx].image = "noimage.png"; // 替换错误的图片
				that.single = single;
			},
			// 拨打客服电话
			tapCallService: function(e) {
				uni.makePhoneCall({
					phoneNumber: '15308933557',
					fail: function(err) {
						that.$util.showToast(err.errMsg, 'none', 3000);
					}
				})
			},
			// 拨打回收员电话
			tapCallMan: function(e) {
				uni.makePhoneCall({
					phoneNumber: that.data.single.staffMobile,
					fail: function(err) {
						that.$util.showToast(err.errMsg, 'none', 3000);
					}
				})
			},
			// 取消订单
			tapCancel: function(e) {
				let that = this;
				that.cancelId = e.currentTarget.dataset.id;
				that.$refs['dialog'].showDialog();
			},
			// 确认取消订单
			_confirmEvent() {
				let that = this;
				that.$refs['dialog'].hideDialog(); // 关闭提示框
				that.$showLoading(); // 显示透明遮罩
				that.$request.postToken("/users/recyorder/cancel.do", {
					id: that.cancelId
				}).then((res) => {
					that.$util.showToast(res.data.results, 'succes', 3000);
					let pages = getCurrentPages(); // 获取当前页面的页帧
					if (pages.length > 1) {
						let prePage = pages[pages.length - 2];
						setTimeout(function() {
							that.$hideLoading(); //关闭遮罩
							prePage.onShow();
							uni.navigateBack({
								delta: 1
							});
						}, 2000)
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err, 'none', 4000);
					that.$hideLoading();
				})
			},
			// 关闭取消弹出框
			_cancelEvent() {
				let that = this;
				that.$refs['dialog'].hideDialog();
			},
			// 预览图片
			tapPreviewImage: function(e) {
				console.log(e);
				let that = this;
				let idx = e.target.dataset.idx; // 预览图片序号
				let images = that.images; // 上传图片集合
				uni.previewImage({ // 预览图片
					current: images[idx], // 当前预览图片  
					urls: images // 所有要预览的图片 
				})
			},
			// 点击复制订单号事件
			tapCopy: function(e) {
				let that = this;
				uni.setClipboardData({
					data: that.single.serialNum,
					success: function(res) {
						that.$util.showToast("复制成功", "none", 2000);
					}
				})
			},
			// 获取明细
			getDetailed: function(id) {
				let that = this;
				that.$request.postToken("/users/recyorder/findById.do", {
					id
				}).then((res) => {
					if (res.data.status === 0) {
						let single = JSON.parse(res.data.results);
						let images = []; // 声明空的订单图片集合
						if (single.images != null && single.images != '') {
							let imgs = single.images.split(";"); // 订单图片
							if (imgs != null || imgs != '') {
								imgs.forEach(item => {
									let url = that.host + "/images/recyorder/" + item;
									images = images.concat(url);
								})
							}
						}
						that.single = single;
						that.images = images;
						console.log(images)
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err, 'none', 5000);
				}).finally(() => {
					this.$hideLoading();
				})
			}
		},
		onLoad(options) {
			let that = this;
			that.host = that.$app.globalData.host;
			that.getDetailed(options.id);
		}
	}
</script>

<style>
	/* 取消订单按钮样式 */
	.cancelBtn {
		padding: 5px 10px;
		text-align: center;
		border-radius: 6px;
		border: 1px solid red;
	}

	/* 联系客服、回收员样式 */
	.call {
		width: 100%;
		padding: 10px 0px;
		text-align: center;
		border-left: 1px solid #eee;
	}

	.call:first-child {
		border-left: none;
	}

	/* 回收清单样式 */
	.detail {
		position: relative;
		padding: 8px 10px;
		margin: 0px 10px;
		border-top: 1px solid #eeeeee;
	}

	.detail>image {
		width: 60px;
		height: 60px;
	}

	.oper {
		position: absolute;
		right: 5px;
	}

	/* 订单信息样式 */
	.serialinfo {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-top: 10px;
	}

	.serialinfo>view:nth-child(1) {
		width: 30%;
		color: #ccc;
	}

	.serialinfo>view:nth-child(2) {
		width: 70%;
		color: #000;
		text-align: right;
	}

	.serialinfo:last-child {
		padding-bottom: 10px;
	}

	/* 复制订单号按钮样式 */
	.copy {
		color: #000;
		margin-left: 5px;
		padding: 0px 5px;
		border: 1px solid #000;
	}

	.item {
		padding: 5px 10px;
		color: #00a2ed;
		border: 1px solid #00a2ed;
		background: #ffffff;
		border-radius: 4px;
	}

	.item:first-child {
		margin-left: 0px;
	}
</style>
