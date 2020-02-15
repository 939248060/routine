<template>
	<view>
		<view v-for="(item,index) in list" :key="index" class="list bg-white p10 mb10">
			<!-- 联系人、联系电话、详细地址 -->
			<view class="pb10 btmccc" :data-idx="index" @click='tapAction'>
				<view class="pb5">{{item.contact}} - {{item.tel}}</view>
				<view>{{item.area}} {{item.address}}</view>
			</view>
			<view class="row jcbetween aicenter pt5">
				<!-- 设置默认地址 -->
				<view v-if="item.isDefault=='1'">
					<icon class="rout icon-dui mr5 blue1" />默认</view>
				<view v-else :data-id="item.addressId" @click="tapSetDefault">
					<icon class="rout icon-dui mr5" />设为默认</view>
				<!-- 地址编辑操作 -->
				<view class="row jcbetween aicenter">
					<navigator :url="'../addressform/addressform?id=' + item.addressId">
						<icon class="rout icon-bianji ico mr5" />编辑
					</navigator>
					<view @click="tapRemove" :data-delid="item.addressId">
						<icon class="rout icon-shanchu ico ml10 mr5" />删除
					</view>
				</view>
			</view>
		</view>
		<navigator url="../addressform/addressform" class="foot btn f18">新增地址</navigator>

		<!--加载动画-->
		<loading />

		<!-- 弹出框 -->
		<dialogs id='dialog' ref="dialog" title=' ' content='是否删除地址' cancelText='取消' confirmText='确定' @cancelEvent="_cancelEvent"
		 @confirmEvent="_confirmEvent">
		</dialogs>
	</view>
</template>

<script>
	import dialogs from "@../../components/dialog/dialog.vue";

	export default {
		components: {
			dialogs
		},
		data() {
			return {
				list: [], // 地址集合
				parent: '', // 传入地址
				delid: '', // 删除地址id
			}
		},
		onLoad(options) {
			let that = this;
			if (that.$stringUtil.isNotEmpty(options.parent)) {
				that.$data.parent = options.parent;
			}
		},
		onShow() {
			let that = this;
			that.getList();
		},
		onReady() {
			//#ifdef MP-ALIPAY
			let that = this;
			that.getList();
			//#endif
		},
		methods: {
			// 获取用户地址列表
			getList: function() {
				let that = this;
				that.$showLoading();    //显示遮罩
				that.$request.postToken("/users/address/findAll.do", {}).then((res) => {
					if (res.data.status === 0) {
						that.list = JSON.parse(res.data.results);
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err, 'none', 5000);
				}).finally(() => {
					that.$hideLoading()  // 关闭过度遮罩
				})
			},
			// 点击获取地址ID并返回相应页面
			tapAction: function(e) {
				let that = this;
				let action = that.parent; // 获取传入地址
				if (that.$stringUtil.isEmpty(action)) {
					return;
				}
				let idx = e.currentTarget.dataset.idx;
				let list = that.list; // 获取地址集合
				let pages = getCurrentPages(); // 获取当前页面的页帧
				uni.setStorageSync("address", list[idx]); // 将地址传入全局变量
				if (pages.length > 1) {
					let prePage = pages[pages.length - 2];
					prePage.onShow();
					uni.navigateBack({
						delta: 1
					})
				}
			},
			// 设置默认地址
			tapSetDefault: function(e) {
				let that = this;
				let id = e.currentTarget.dataset.id;
				that.$showLoading();                   // 遮罩
				that.$request.postToken("/users/address/setDefaultAddress.do", {id}).then((res) => {
					if (res.data.status === 0) {
						let list = that.list;
						list.forEach(item => {
							if (item.addressId == id) {
								uni.setStorageSync("address", item);
								item.isDefault = '1';
							} else {
								item.isDefault = '0';
							}
						})
						that.list = list;
						that.$util.showToast(res.data.results, 'succes', 4000);
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err, 'none', 5000);
				}).finally(() => {
					that.$hideLoading()      // 关闭遮罩
				});
			},
			// 点击删除弹出确认框
			tapRemove: function(e) {
				let that = this;
				that.delid = e.currentTarget.dataset.delid;
				that.$refs['dialog'].showDialog(); // 弹出提示框
			},
			// 点击隐藏弹出框
			_cancelEvent() {
				this.$refs['dialog'].hideDialog();
			},
			// 点击确认删除地址
			_confirmEvent() {
				let that = this;
				let id = that.delid;
				that.$refs['dialog'].hideDialog(); // 关闭弹出框
				that.$showLoading(); // 遮罩
				that.$request.postToken("/users/address/remove.do", {id}).then((res) => {
					if (res.data.status === 0) {
						let list = that.list;
						for (let i = 0, len = list.length; i < len; i++) {
							if (list[i].addressId == id) {
								list.splice(i, 1);
							}
						}
						that.list = list;
						that.$util.showToast(res.data.results, 'succes', 4000);
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err, 'none', 5000);
				}).finally(() => {
					that.$hideLoading()  // 关闭遮罩
				});
			},
		}
	}
</script>

<style>
	.list {}

	.list:last-of-type {
		margin-bottom: 55px;
	}

	.addlist {
		margin-top: 10px;
		background-color: #fff;
		padding: 10px;
	}

	.addlist>view:nth-child(1) {
		padding: 0px 2px 10px 2px;
	}

	.addlist>view:nth-child(1)>view {
		padding: 2px;
	}

	.addlist>view:nth-child(2) {
		justify-content: space-between;
		border-top: 1px solid #eee;
		padding: 5px 2px 0px 2px;
	}

	.addlist>view:nth-child(2)>view:nth-child(2) {
		justify-content: right;
	}

	.btn {
		text-align: center;
		border-radius: 0px;
		height: 44px;
		line-height: 44px;
		color: #fff;
		background: #00a2ed;
	}
</style>
