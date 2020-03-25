<template>
	<view>
		<scroll-view scroll-view scroll-y="true" :style="'height:'+scrollHeight+'px;'" data-state="0" @scrolltolower="loadMore"
		 upper-threshold="3" lower-threshold="5">
			<view class="list row wrap jcbetween mb15">
				<block :key="index" v-for=" (item,index) in list ">
					<view class="wares mb10 bg-white radius10" :data-waresid="item.waresId " @click="linkwares">
						<image :src=" host + item.photoPath " class="img" mode="widthFix" />
						<view>
							<view>{{ item.waresName}}</view>
							<view class="row">
								<view class="f20 mr5 orange bold">{{ item.score }}</view>
								<view class="lh30 gray-9">量心币</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
		<view v-if="btmp=='noData'" class="noData column aicenter jccenter">
			<icon class="rout icon-kongshuju"></icon>
			<view>您还没有相关的商品</view>
		</view>
		<view class="bottom pb20 txtcenter" v-if="btmp=='noMore'"><text>已经到底啦</text>
			<view></view>
		</view>
		<view class="bottom pb20 txtcenter" v-else-if="btmp=='loadMore'">加载更多...</view>
		<loading />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				host: '',
				currPage: 1,
				list: [],
				page: [],
				scrollHeight: 0,
				btmp: 'loadMore'
			}
		},
		methods: {
			linkwares: function(e) {
				//console.log(e);
				var waresid = e.currentTarget.dataset.waresid;
				uni.navigateTo({
					url: '../wares/wares?waresid=' + waresid,
				})
			},
			loadMore: function() {
				let that = this;
				if (that.isLoading == true) { // 避免多次触发获取更多function
					that.$util.showToast("正在获取数据", 'none', 2000);
					return;
				}
				that.getList(that.currPage + 1, tab, "loadMore");
			},
			getList: function(curr, rid) {
				let that = this;
				let data = {
					pageSize: 20,
					currPage: curr,
				};
				that.$showLoading(); //显示遮罩
				that.$request.postToken("/users/wares/findPage.do", data).then((res) => {
					if (res.data.status === 0) {
						if (rid == "new") {
							that.list = JSON.parse(res.data.results);
						} else {
							that.list = that.list[state].concat(JSON.parse(res.data.results));
						}
						that.page = res.data.page;
						if (res.data.page.currentPage >= res.data.page.allPageAmount)
							that.btmp = 'noMore';
						if (that.list.length <= 0)
							that.btmp = 'noData';
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err.errMsg, 'none', 5000);
				}).finally(() => {
					that.isLoading == false;
					that.$hideLoading();
				})
			}
		},
		onLoad() {
			let that = this;
			// // 隐藏系统tabBar
			// wx.hideTabBar();
			// // 绘制新的tabbar
			// app.editTabbar(); 
			that.scrollHeight = that.$app.globalData.systemInfo.windowHeight;
			that.host = that.$app.globalData.host1;
			that.getList(1, 'new');
		}
	}
</script>

<style>
	.list {
		padding: 10px 15px;
	}

	.wares {
		width: 48%;
		box-sizing: border-box;
	}

	.wares .img {
		width: 120px;
		height: 120px;
		margin: 10px;
	}

	.wares>view {
		padding: 0px 10px 10px 10px;
		vertical-align: middle;
	}

	.wares>view>view {
		padding-top: 5px;
	}

	.noData {
		height: 100%;
		color: #aaa;
	}

	.noData>icon {
		font-size: 130px;
	}

	.noData>view {
		font-size: 18px;
	}

	.bottom {
		width: 100%;
	}

	.bottom>view {
		height: 1px;
		border-top: 1px solid #ddd;
		margin: 0px 20px;
	}

	.bottom>text {
		padding: 0px 10px;
		background: #eee;
		position: relative;
		top: 10px;
	}
</style>
