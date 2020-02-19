<template>
	<view>
		<!--收货地址-->
		<navigator class="row jcleft aicenter m10 address radius8 f14" url="../addresslist/addresslist?parent=electric">
			<view class="rout icon-dizhi txtcenter f20" />
			<view class="elips">
				<text v-if="address!=''">{{address.contact}} - {{address.tel}}\n{{address.area}}{{address.address}}</text>
				<text wx:else class="">请选择收货地址</text>
			</view>
			<view class="rout icon-dayuhao" />
		</navigator>
		<!--无回收物显示面板-->
		<view v-if="recydetail.length<1" class="bg-white txtcenter f15 pt20 pb20 ml10 mr10 black radius8">
			<view @click="tapOpenSelectPanel">请添加需清运的家具</view>
			<image src="../../static/images/furniture.png" mode="widthFix" class="mt5 mb5" style="width: 60px; height: 60px;"
			 @click="tapOpenSelectPanel" />
			<view @click="tapOpenSelectPanel">立即添加</view>
		</view>
		<!--回收物清单列表-->
		<view v-else class="bg-white ml10 mr10 radius8">
			<view class="ml10 mr10 pl5 h35 lh35 btmeee f12">回收员上门后结算</view>
			<view v-for="(item,index) in recydetail" :key="index" class="row jcbetween aicenter bg-white detail">
				<view class="row jcleft aicenter">
					<image :src="item.img" style="width: 60px; height: 60px;" />
					<view class="ml10">
						<view class="red f15"><text class="black">预估费用：</text>￥<text class="f18">{{item.totalPrice}}</text>元</view>
						<view class="gray mt5 elips">{{item.scrapNames}}</view>
					</view>
				</view>
				<!--点击删除回收物-->
				<view class="rout icon-guanbi1 txtcenter f24 red" :data-idx="index" @click="tapRemoveDetail" />
			</view>
			<view class="txtcenter pt10 pb10 f15" @click="tapOpenSelectPanel">继续添加</view>
		</view>
		<form @submit="sendForm">
			<view class="mt10 ml10 mr10 pl10 pr10 bg-white radius8" style="margin-bottom: 100px;">
				<!--留言备注-->
				<view class="row jcleft aicenter pt15 pb15 black remark">
					<text>留言备注</text>
					<input type="text" name="remarks" placeholder="可描述物品状态、特殊要求等" />
				</view>
				<!--图片上传-->
				<view class="row jcleft aicenter pt15 pb15 black remark">
					<text>上传图片</text>
					<view class="row jcend aicenter gray-7">请将清运家具分别拍照上传<text class="rout icon-shangchuan ml5" @click="tapChooseImage" /></view>
				</view>
				<!--图片集合-->
				<view class="row jcleft aicenter pt10 pb10 ">
					<view v-for="(item,index) in tempImages" :key="index" class="overhidden txtcenter" style="width: 25%; position: relative;">
						<view class="rout icon-guanbi1 f20 red bg-white delimage" :data-idx="inde" @click="tapRemoveImage" />
						<image :src="item" mode="widthFix" :data-idx="index" @click="tapPreviewImage" style="width: 70%;" />
					</view>
				</view>
			</view>
			<!--开始预约-->
			<view class="row jcbetween aicenter foot topeee pt10 pb10 f15" style="z-index: 100;">
				<view class="ml10">
					<view class="black">
						预估清运费
						<text class="ml5 mr5 f20 red bold">{{(countDetail>=0&&recydetail.length>0)?countDetail:'--'}}</text>
						<text class="red bold">元</text>
					</view>
					<view class="gray f12">实际清运费以现场评估为准</view>
				</view>
				<button class="viewbtn mr10 pl15 pr15 f16" :class="(countDetail>=0&&recydetail.length>0)?'':'off'" formType="submit">开始预约</button>
			</view>
		</form>

		<!--遮罩-->
		<view v-show="selectHid" class="mask"></view>
		<!--添加回收物面板-->
		<view v-show="selectHid" class="selectpanel overhide">
			<!--关闭面板-->
			<view class="rout icon-guanbi f20 black close" @click="tapCloseSelectPanel" />
			<view class="btmeee f15 txtcenter mt10 pb5">添加废旧家具</view>
			<!--回收物横向滚动条-->
			<view class="x-scroll mb10 pl10 pr10 btmeee">
				<scroll-view scroll-x class="f14" style="width: 100%;">
					<view v-for="(item,index) in list" :key="index" v-if="item.parentId==0" :data-idx="index" class="scrapItem" :class="item.css"
					 @click="tapToggle">
						<image :data-idx="index" @error="errImg" :src="item.img" />
						<view>{{item.name}}</view>
					</view>
				</scroll-view>
				<view class="txtcenter pb5 gray">左右滑动选择回收物</view>
			</view>
			<!--已选项目-->
			<view v-if="selectItem.length>1" class="pl10 pr10">
				<view class="f14 black mb10">已选</view>
				<view class="row wrap jcbetween aicenter">
					<view v-for="(item,index) in selectItem" :key="index" v-if="index>0" :data-idx="index" @click="tapSelectItem"
					 class="item elips" style="width: 39%">{{item.name}}
					</view>
				</view>
			</view>
			<!--子项目-->
			<view v-if="subItem.length>0" class="pl10 pr10" style="margin-bottom: 50px;">
				<view class="f14 black mb10">{{subItem[0].kind}}</view>
				<view class="row wrap jcleft aicenter">
					<view v-for="(item,index) in subItem" :key="index" :data-obj="item" class="ml10 mb10 item" @click="tapSubItem">{{item.name}}</view>
				</view>
			</view>
			<!--加入回收清单-->
			<view class="row jcbetween aicenter foot pt10 pb10 f15 selectend">
				<view class="ml10">预估清运费<text class="ml5 mr5 f20 red bold">{{(count>=0)?count:'--'}}</text><text class="red bold">元</text></view>
				<view class="mr10 viewbtn pt5 pb5 pl15 pr15" :class="(count>=0)?'':'off'" @click="tapAddScrap">加入清运清单</view>
			</view>
		</view>

		<!--订单完成显示面板-->
		<view v-show="finishHid" class="column jccenter aicenter txtcenter finish">
			<view class="rout icon-chenggong blue1" style="font-size: 80px" />
			<view class="mt20 mb20 f24">订单已提交</view>
			<navigator url="../recyorderlist/recyorderlist" open-type="redirect" class="nav mt15 mb15 p10">查看订单</navigator>
			<navigator url="../index/index" open-type="switchTab" class="nav mt15 mb15 p10">返回首页</navigator>
		</view>

		<!--加载动画-->
		<loading />
	</view>
</template>

<script>
	const app = getApp();
	const util = require('../../utils/util.js');
	const StringUtil = require('../../utils/stringUtil.js');
	const Pinyin = require('../../utils/pinyin.js');
	const request = require('../../utils/request.js');

	export default {
		data() {
			return {
				host: '', // 主机地址
				list: [], // 所有回收物项目
				address: '', // 收货地址
				selectHid: false, // 回收物选择面板状态
				finishHid: false, // 投放完成显示面板状态
				selectItem: [], // 已选项目集合
				subItem: [], // 待选子项目集合
				tempImages: [], // 临时图片
				images: [], // 已上传图片
				recydetail: [], // 回收物清单集合
				count: -1, // 回收物估价
				countDetail: -1 // 回收物清单估价
			}
		},
		methods: {
			// 获取所有回收品种
			getAllScrap: function(state) {
				let that = this;
				that.$showLoading(); //显示遮罩
				that.$request.postToken("/users/scrap/findAll.do", {
					state
				}).then((res) => {
					if (res.data.status === 0) {
						let list = JSON.parse(res.data.results);
						console.log(res)
						list.forEach(item => { // 遍历回收品种集合
							if (item.parentId == 0) { // 中文转拼音获取品种图片
								item.img = that.host + "/images/routine/" + Pinyin.toPinyin(item.name) + ".png";
								item.image = Pinyin.toPinyin(item.name) + ".png";
								item.css = "";
							}
						})
						that.list = list;
					} else {
						that.$util.showToast(res.data.results, 'none', 4000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err, 'none', 4000);
				}).finally(() => {
					that.$hideLoading() // 关闭过度遮罩
				})
			},
			// 错误图片替换
			errImg: function(e) {
				let that = this;
				let list = that.list;
				let idx = e.target.dataset.idx; // 获取错误图片的集合序号
				list[idx].img = that.host + "/images/routine/noimage.png"; // 替换错误的图片
				that.list = list;
			},
			// 打开回收物选择面板
			tapOpenSelectPanel: function(e) {
				let that = this;
				that.selectHid = true;
			},
			// 关闭回收物选择面板
			tapCloseSelectPanel: function(e) {
				let that = this;
				let list = that.list;
				list.forEach(item => { // 遍历所有项目
					if (item.parentId == 0) {
						item.css = ""; // 清除已选样式
					}
				})

				that.list = list;
				that.selectHid = false;
				that.selectItem = [];
				that.subItem = [];
				that.count = -1;
			},
			// 添加图片事件
			tapChooseImage: function() {
				let that = this;
				let tempImages = that.tempImages; // 获取临时图片
				let images = that.images; // 获取已上传图片
				if (tempImages.length >= 4) { // 最多只能上传4张图片
					return;
				}
				wx.chooseImage({
					success: function(res) {
						let path = res.tempFilePaths; // 获取选择图片
						that.$showLoading(); //显示遮罩
						that.$request.uploadToken("/users/recyorder/uploadImage.do", path[0]).then((res) => {
							let result = JSON.parse(res.data);
							if (result.status === 0) { // 上传成功
								tempImages = tempImages.concat(path); // 添加临时图片
								images = images.concat(JSON.parse(result.results)); // 添加上传图片
								that.tempImages = tempImages;
								that.images = images;
							} else {
								console.log(result.results);
								that.$util.showToast(result.results, 'none', 5000);
							}
						}).catch((err) => {
							console.log(err);
							that.$util.showToast(err, 'none', 5000);
						}).finally(() => {
							that.$hideLoading() // 关闭过度遮罩
						})
					}
				})
			},
			// 预览图片
			tapPreviewImage: function(e) {
				let that = this;
				let idx = e.target.dataset.idx; // 预览图片序号
				let tempImages = that.tempImages; // 上传图片集合
				uni.previewImage({ // 预览图片
					current: tempImages[idx], // 当前预览图片  
					urls: tempImages // 所有要预览的图片 
				})
			},
			// 删除图片
			tapRemoveImage: function(e) {
				let that = this;
				let idx = e.target.dataset.idx; // 获取图片序号
				let tempImages = that.tempImages; // 获取临时图片集合
				let images = that.images; // 获取上传图片集合
				tempImages.splice(idx, 1); // 删除图片
				images.splice(idx, 1);
				that.tempImages = tempImages;
				that.images = images;
			},
			// 顶级项目点击事件
			tapToggle: function(e) {
				let that = this;
				let idx = e.currentTarget.dataset.idx; // 获取被选顶级项目下标
				let list = that.list; // 获取所有项目
				let selectItem = that.selectItem; // 获取已选项目集合
				let scrap = list[idx]; // 获取被选项目对象
				selectItem.splice(0, selectItem.length, scrap); // 清空所有已选，添加新的项目
				let subItem = that.ergodicScrap(list, scrap.scrapId); // 获取被选种类的子项目
				let count = (subItem.length == 0) ? that.countPrice(selectItem) : -1; // 无子项目开始合计回收价
				list.forEach(item => { // 清除所有顶级项目的已选样式
					if (item.parentId == 0) {
						item.css = (item.scrapId == scrap.scrapId) ? "selected" : ""; // 被选项添加已选样式
					}
				})
				that.list = list;
				that.selectItem = selectItem;
				that.subItem = subItem;
				that.count = count;
			},
			// 已选项目点击事件
			tapSelectItem: function(e) {
				let that = this;
				let list = that.list; // 获取所有项目
				let idx = e.currentTarget.dataset.idx; // 获取被点击项目的位置 
				let selectItem = that.selectItem; // 获取已选项目集合
				let subItem = that.ergodicScrap(list, selectItem[idx].parentId); // 更新子项目集合
				if (subItem.length == 0) {
					return;
				}
				selectItem.splice(idx, selectItem.length - idx); // 删除已选项目子项目
				that.selectItem = selectItem;
				that.subItem = subItem;
				that.count = -1;
			},
			// 子项目点击事件
			tapSubItem: function(e) {
				let that = this;
				let list = that.list; // 获取所有项目
				let obj = e.currentTarget.dataset.obj; // 获取被点击对象
				let selectItem = that.selectItem.concat(obj); // 拼接已选项目
				let subItem = that.ergodicScrap(list, obj.scrapId); // 获取被选种类的子项目
				let count = (subItem.length == 0) ? that.countPrice(selectItem) : -1; // 无子项目开始合计回收价
				that.selectItem = selectItem;
				that.subItem = subItem;
				that.count = count;
			},
			// 加入回收清单事件
			tapAddScrap: function(e) {
				let that = this;
				if (that.count < 0) {
					return;
				}
				let selectItem = that.selectItem;
				let temp = {
					scrapIds: '',
					scrapNames: '',
					score: '',
					price: '',
					totalScore: 0,
					totalPrice: 0
				}
				for (let i = 0, len = selectItem.length; i < len; i++) {
					let item = selectItem[i];
					if (i > 0) { // 添加分割符
						temp.scrapIds += ";";
						temp.scrapNames += ";";
						temp.score += ";";
						temp.price += ";";
					} else {
						temp.scrapId = item.scrapId; // 添加电器id
						temp.scrapName = item.name; // 添加电器名称
						temp.img = item.img // 添加临时图片
						temp.image = item.image; // 添加图片
					}
					temp.scrapIds += item.scrapId;
					temp.scrapNames += item.name;
					temp.score += item.score;
					temp.price += item.price;
					temp.totalScore += item.score;
					temp.totalPrice += item.price;
				}
				let recydetail = that.recydetail.concat(temp); // 添加清单
				let countDetail = that.countPrice(recydetail, 'detail'); // 合计清单回收价
				that.recydetail = recydetail;
				that.countDetail = countDetail;
				that.$util.showToast('添加成功', 'none', 2000)
			},
			// 移除回收物事件
			tapRemoveDetail: function(e) {
				let that = this;
				let idx = e.currentTarget.dataset.idx; // 获取下标
				let recydetail = that.recydetail; // 获取回收物清单
				recydetail.splice(idx, 1); // 移除回收物
				let countDetail = that.countPrice(recydetail, 'detail'); // 合计清单回收价
				that.recydetail = recydetail;
				that.countDetail = countDetail;
			},
			// 提交表单开始预约
			sendForm: function(e) {
				let that = this;
				let address = that.address; // 获取地址
				let images = that.images; // 获取订单图片
				let countDetail = that.countDetail; // 获取回收清单合计估价
				let recydetail = that.recydetail; // 获取回收清单
				if (countDetail < 0 || recydetail.length < 1) {
					return false;
				}
				if (that.$stringUtil.isEmpty(address.contact)) {
					that.$util.showToast("请选择收货地址", "none", 4000)
					return false;
				}
				that.$showLoading();  // 显示遮罩
				let temp = address; // 添加地址
				temp.remarks = e.detail.value.remarks; // 添加备注
				temp.totalPrice = countDetail; // 添加回收清单估价
				temp.recyType = 3; // 添加上门类型，1：政府回收，2：家电，3：家具，4：商户回收
				for (let i = 0, len = images.length; i < len; i++) {
					if (i > 0) {
						temp.images += ";";
					} else {
						temp.images = ""; // 添加订单图片属性
					}
					temp.images += images[i]; // 添加订单图片
				}
				let data = {
					data: JSON.stringify(temp),
					recydetail: JSON.stringify(recydetail)
				}
				that.$request.postToken("/users/recyorder/furniture.do", data).then((res) => {
					if (res.data.status === 0) {
						that.$util.showToast(res.data.results, 'none', 3000);
						that.finishHid = true;
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err, 'none', 5000);
				}).finally(() => {
					that.$hideLoading();
				})
			},
			/** 根据传入变量获取子项目
			 * @state    状态
			 * @pid      父类id
			 */
			ergodicScrap: function(list, pid) {
				let subItem = [];
				list.forEach(item => {
					if (item.parentId == pid) {
						subItem.push(item);
					}
				})
				return subItem;
			},
			/** 合计项目单价
			 * @selectItem   已选项目数组
			 */
			countPrice: function(selectItem, type) {
				let that = this;
				let count = 0;
				selectItem.forEach(item => { // 合计价格
					if (type == 'detail') { // 回收物清单合计
						count += (that.$stringUtil.isNotEmpty(item.totalPrice)) ? item.totalPrice : 0;
					} else {
						count += (that.$stringUtil.isNotEmpty(item.price)) ? item.price : 0;
					}
				})
				return count;
			},
			/** 遍历回收品所有子类
			 * @data    回收物数据
			 * @pid     父id
			 */
			addItem: function(data, pid) {
				let that = this;
				let list = [];
				data.forEach(item => {
					if (pid == item.parentId) {
						item.children = that.addItem(data, item.scrapId);
						list.push(item);
					}
				})
				return list;
			},
		},
		onLoad() {
			let that = this;
			that.host = that.$app.globalData.host;
		},
		onReady() {
			let that = this;
			that.getAllScrap(3);
		},
		onShow() {
			let that = this;
			let address = uni.getStorageSync("address"); // 读取缓存中地址信息
			if (address != null) {
				that.address = address;
			}
		},
	}
</script>

<style>
	.address {
		height: 60px;
		background: #ffffff;
		vertical-align: middle;
		text-align: left;
	}

	.address>view:nth-child(1) {
		width: 14%;
	}

	.address>view:nth-child(2) {
		width: 76%;
	}

	.address>view:nth-child(3) {
		width: 10%;
	}

	/* 回收物清单样式 */
	.detail {
		padding: 10px 0px;
		margin: 0px 10px;
		border-bottom: 1px solid #eeeeee;
	}

	.detail>view:nth-child(1) {
		width: 90%
	}

	.detail>view:nth-child(2) {
		width: 10%
	}

	.detail:last-child {
		border-bottom: none;
	}

	/* 留言备注样式 */
	.remark {
		border-bottom: 1px solid #eee;
	}

	.remark>text {
		width: 30%;
	}

	.remark>input {
		width: 70%;
		text-align: right;
	}

	.remark>view {
		width: 70%;
		text-align: right;
	}

	.remark:last-child {
		border-bottom: none;
	}

	/* 删除订单图片样式 */
	.delimage {
		position: absolute;
		top: 0px;
		right: 0px;
		border-radius: 50%;
	}

	/* 子项选择框样式 */
	.selectpanel {
		position: fixed;
		z-index: 101;
		top: 30%;
		right: 0;
		left: 0;
		bottom: 0;
		background: #ffffff;
	}

	.close {
		position: absolute;
		top: 3px;
		right: 10px;
	}

	.selectend {
		position: absolute;
		z-index: 101;
		bottom: 0px;
		box-shadow: 0px 1px 5px 3px #eee;
	}

	/* 横向滚动样式 */
	.x-scroll {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
	}

	/* 价格列表横向滚动样式 */
	.scrapItem {
		display: inline-block;
		width: 70px;
		margin-top: 5px;
		text-align: center;
	}

	.scrapItem>view {
		padding: 3px 0px;
	}

	.scrapItem>image {
		margin-top: 3px;
		width: 56px;
		height: 56px;
	}

	.scrapItem:last-child {
		margin-right: 20px; 
	}

	/* 顶级项目已选样式 */
	.selected {
		color: #00a2ed;
		border: 1px solid #00a2ed;
		box-sizing: border-box;
		border-radius: 6px;
	}

	/* 加入回收清单和开始预约样式 */
	.viewbtn {
		border-radius: 30px;
		color: #ffffff;
		background: #00a2ed;
	}

	/* 加入回收清单和开始预约透明样式 */
	.off {
		opacity: 0.3
	}

	.item {
		padding: 3px 10px;
		margin: 0px 10px 10px 0px;
		color: #00a2ed;
		border: 1px solid #00a2ed;
		background: #ffffff;
		border-radius: 6px;
	}

	.finish {
		position: fixed;
		z-index: 500;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff;
	}

	.nav {
		width: 70%;
		font-size: 18px;
		background: #00a2ed;
		color: #fff;
		border-radius: 30px;
	}
</style>
