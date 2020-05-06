<template>
	<view class="m10">
		<view class="p10 bg-white txtcenter radius8 gray-9">
			<view v-if="single.state=='1'">
				<view class="pb5 f24 gray">待投放</view>
				<view >系统未检测到物品投放</view>
			</view>
			<view v-if="single.state=='2'">
				<view class="pb5 f24 orange">待检验</view>
				<view >回收员会在投放后24小时内检验，请耐心等待</view>
			</view>
			<view v-if="single.state=='3'">
				<view class="pb5 f24 green">已完成</view>
				<view >订单已检验完毕</view>
			</view>
			<view v-if="single.state=='4'">
				<view class="pb5 f24 red">异常单</view>
				<view >订单异常</view>
			</view>
		</view>
		<!--投放清单-->
		<view class="mt10 bg-white radius8 black f15">
		  <view class="p10 txtcenter black btmeee">投放清单</view>
		  <view class="row jcbetween aicenter p10">
		    <view>
		      <view>{{single.expType?single.expType:'--'}}</view>
		      <view class="gray f13">{{single.expAmount?single.expAmount:'--'}}<text class="ml2 let1">KG</text></view>
		    </view>
		    <view class="txtright">
		      <view class="f16">￥{{single.expTotalPrice?single.expTotalPrice:'--'}}</view>
		      <view class="gray f13">{{single.expPrice?single.expPrice:'--'}}<text class="ml2 let1">元/KG</text></view>
		    </view>    
		  </view>
			<view class="mt10 pt10 pb10 txtcenter topeee f14" style="background: #fbfbfb; border-radius: 0 0 8px 8px;" @click="tapCallService">
				<text class="rout icon-phone mr5" />联系客服
			</view>
		</view>
		<!--检验清单-->
		<view v-if="single.state>2" class="mt10 bg-white radius8 black f15">
		  <view class="mb5 p10 txtcenter black btmeee">检验清单</view>
		  <view v-if="single.state==3" class="row jcbetween aicenter pt5 pl10 pr10">
		    <view>
		      <view>{{single.actType?single.actType:'--'}}</view>
		      <view class="gray f13">{{single.actAmount?single.actAmount:'--'}}<text class="ml2 let1">KG</text></view>
		    </view>
		    <view class="txtright">
		      <view class="red f16">￥{{single.actTotalPrice?single.actTotalPrice:'--'}}</view>
		      <view class="gray f13">{{single.actPrice?single.actPrice:'--'}}<text class="ml2 let1">元/KG</text></view>
		    </view>    
		  </view>
		  <!--异常标签-->
		  <view v-if="single.abnormal!=undefined" class="row wrap jcleft aicenter mb5 pt5 pl10 pr10 f12">
				<block :key="index" v-for="(item,index) in single.abnormal">
					<view class="red mr5 mb5">{{item}}</view>
				</block>
		  </view>
			<!--图片集合-->
			<view v-if="single.abnormalPic!=null" class="row wrap jcleft aicenter pt5 ml10">
				<block :key="index" v-for="(item,index) in single.abnormalPic">
					<image :src="item" mode="widthFix" @click="tapPreviewImage" :data-url="item" style="width: 25%; margin-right: 5px;" />
				</block>
			</view>
			<view class="mt10 pt10 pb10 txtcenter topeee f14" style="background: #fbfbfb; border-radius: 0 0 8px 8px;" @click="tapCallService">
				<text class="rout icon-phone mr5" />联系客服
			</view>
		</view>
		<!--投放信息-->
		<view class="mt10 bg-white radius8">
		  <view class="p10 txtcenter btmeee black f15">订单信息</view>
		  <!--订单编号-->
		  <view class="serialsingle">
		    <view>订单编号</view><view class="row jcend aicenter">{{single.serialNum}}<view class="copy" @click="tapCopy">复制</view></view>
		  </view>
		  <!--投放时间-->
		  <view class="serialsingle"><view>投放时间</view><view>{{single.beginTime}}</view></view>
		  <!--检验时间-->
		  <view v-if="single.state>2" class="serialsingle"><view>检验时间</view><view>{{single.checkTime}}</view></view>
		  <!--投放站点-->
		  <view class="serialsingle"><view>投放站点</view><view>{{single.binName}}</view></view>
		  <!--站点位置-->
		  <view class="serialsingle"><view>站点位置</view><view>{{single.address}}</view></view>
		</view>
		<!-- 遮罩 -->
		<loading />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				host: '', // 主机地址
				single: {}, // 订单详情
				sumPrice: 0, // 计件累计总额
				through: '' // 异常单投放物品栏显示删除线
			}
		},
		methods: {
			// 拨打客服电话
			tapCallService: function (e) {
				uni.makePhoneCall({
					phoneNumber: '15308933557',
					fail: function (err) {
						that.$util.showToast(err.errMsg, 'none', 3000);
					}
				})
			},
			// 错误图片替换
			errImg: function (e) {
				let that = this;
				let single = that.data.single;
				let idx = e.target.dataset.idx;               // 获取错误图片的集合下标
				that.single.abnormalPic[idx].image = that.data.host + "/images/routine/noimage.png"; // 替换错误的图片
			},
			// 预览图片
			tapPreviewImage: function (e) {
				let that = this;
				let url = e.target.dataset.url; // 预览图片地址
				console.log(e)
				let img = [];                   // 声明图片数组
				img = img.concat(url);          // 将图片加入数组中     
				uni.previewImage({ urls: img }); // 预览图片
			},
			// 点击复制订单号事件
			tapCopy: function (e) {
				let that = this;
				uni.setClipboardData({
					data: that.data.single.serialNum,
					success: function (res) {
						that.$util.showToast("复制成功", "none", 1000);
					}
				})
			},
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
						if (that.$stringUtil.isNotEmpty(that.single.abnormal)) {	//异常字符串重组
							let abnormal = [];
							let templist = that.single.abnormal.split(";");
							templist.forEach(abn => {
								abnormal = abnormal.concat(abn);
							})
							that.single.abnormal = abnormal;
						}
						if (that.$stringUtil.isNotEmpty(that.single.abnormalPic)) { //图片字符串重组
							let abnormalPic = [];
							let templist = that.single.abnormalPic.split(";");
							templist.forEach(pic => {
								abnormalPic = abnormalPic.concat(that.host + "/images/binorder/" + pic);
							})
							that.single.abnormalPic = abnormalPic;
						}
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
			that.host = that.$app.globalData.host;
			if (that.$stringUtil.isNotEmpty(options.id)) {
				that.getDetail(options.id);
			}
		},
		onReady() {
			let that = this;
			that.host = that.$app.globalData.host;
		}
	}
</script>

<style>
	/* 回收清单样式 */
	.detail { position: relative; padding: 8px 10px; margin: 0px 10px; border-top: 1px solid #eeeeee; }
	.detail > image { width: 60px; height: 60px; }
	.oper { position: absolute; right: 5px; }
	
	/* 异常图片样式 */
	.img { width: 80px; height: 80px; position: relative; }
	
	/* 订单信息样式 */
	.serialsingle { display: flex; flex-direction: row; justify-content: space-between; padding: 10px 10px 0px 10px; }
	.serialsingle > view:nth-child(1) { width: 30%; color: #ccc; }
	.serialsingle > view:nth-child(2) { width: 70%; color: #000; text-align: right; }
	.serialsingle:last-child { padding-bottom: 10px;}
	/* 复制订单号按钮样式 */
	.copy { color: #666; margin-left: 5px; padding: 0px 5px; border: 1px solid #666;  }
</style>
