<template>
	<view>
		<scroll-view scroll-view scroll-y="true" :style="'height:'+scrollHeight+'px;'" data-state="0" @scrolltolower="loadMore"
		 upper-threshold="3" lower-threshold="5">
			<view class="list">
				<block :key="index" v-for=" (item,index) in list ">
					<view class="wares" :data-waresid="item.waresId " @click="linkwares">
						<image :src=" host + item.photoPath " class="img" mode="widthFix" />
						<view>
							<view>{{ item.waresName}}</view>
							<view class="orange"><b class="f16 mr5">{{ item.score }}</b>量心币</view>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
		<view v-if="btmp=='noData'" class="noData">
			<icon class="rout icon-kongshuju"></icon>
			<view>您还没有相关的商品</view>
		</view>
		<view class="bottom" v-if="btmp=='noMore'"><text>已经到底啦</text>
			<view></view>
		</view>
		<view class="bottom" v-else-if="btmp=='loadMore'">加载更多...</view>
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
			that.host = that.$app.globalData.host;
			that.getList(1, 'new');
		}
	}
</script>

<style>
	.list {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-between;
		padding: 10px 15px;
		margin-bottom: 30rpx;
	}

	.wares {
		width: 48%;
		box-sizing: border-box;
		margin-bottom: 10px;
		background: #fff;
		box-shadow: 0px 2px 6px rgba(0, 0, 0, .2);
		-moz-box-shadow: 0px 2px 6px rgba(0, 0, 0, .2);
	}

	.wares .img {
		width: 100%;
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
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #aaa;
	}

	.noData>icon {
		font-size: 130px;
	}

	.noData>view {
		font-size: 18px;
	}

	.bottom {
		padding-bottom: 20px;
		width: 100%;
		text-align: center;
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
