<template>
	<view class="content">
		<scroll-view scroll-y="true" :style="'height:'+scrollHeight+'px;'" data-state="0" @scrolltolower="loadMore"
		 lower-threshold="5">
			<!-- 回收站列表 -->
			<view class="binList">
				<block v-for="(item,index) in list" :key="index" >
					<navigator class="column binItem" :url="'../recySmart/recySmart?lng='+item.lng+'&lat='+item.lat+'&code='+item.code">
						<view class="row jcbetween mb5">
							<view class="row aicenter">
								<view class="rout icon-locationfill blue1 mr5" />
								<text class="f16 bold">{{ item.name }}站</text>
							</view>
							<text class="blue1 f14">{{ item.distance }}m</text>
						</view>
						<view class="row jcbetween">
							<view class="column">
								<text class="gray-9 f12 mb5">{{ item.address }}</text>
								<view class="row">
									<text class="lab labblue1 mr5 radius4">智能回收箱</text>
									<text class="box boxblue1 mr5 radius4">正常投递</text>
								</view>
							</view>
							<view class="ascenter rout icon-right blue1 f18 bold mr10" style="border: 2px solid;border-radius: 50%;padding: 2px;" />
						</view>
					</navigator>
				</block>
			</view>
			<!--scorll底部-->
			<view class="bottom" v-if="btmp=='noMore'"><text>已经到底啦</text><view /></view>
			<view class="bottom" v-else-if="btmp=='loadMore'">加载更多...</view>
		</scroll-view>
		<!--加载动画-->
		<loading />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],	//站点列表
				scrollHeight: 0,
				page: [], // 分页数据
				lng: 0,		//经度
				lat: 0,		//纬度
				btmp: 'loadMore', // scroll底部panel
			}
		},
		methods: {
			// 下拉获取最新数据
			refresh: function () {
			  let that = this;
			  clearTimeout(that.timer);
			  if (that.isLoading == false) {
					that.isLoading = true;
			    setTimeout(function () {
			      uni.startPullDownRefresh({
			        success(res) {
			          console.log("refresh开始下拉");
			        }
			      })
			    }, 350);
			  }
			},
			// 底部下拉加载更多
			loadMore: function(e) {
				let that = this;
				if (that.isLoading == true) { // 避免多次触发获取更多function
					that.$util.showToast("正在获取数据", 'none', 2000);
					return;
				}
				let p = that.page; // 获取state对应分页数据
				if (p.currentPage < p.allPageAmount) { // 当前页小于总页数,底部panel显示加载中,执行获取订单function
					that.btmp = "loadMore";
					that.getList(that.lng, that.lat, p.currentPage + 1, "loadMore");
				}
			},
			//获取附近站点列表
			getList (lng, lat, curr, rid) {
				let that =  this;
				that.lng = lng;	//经度
				that.lat = lat;	//纬度
				let data = {
					lng:	lng,
					lat:	lat,
					currPage: curr,
					pageSize: 10
				}
				that.$request.postToken("/users/smartBin/findNearbyPage.do", data).then((res) => {
					if (res.data.status === 0) {
						that.btmp = (res.data.page.currentPage >= res.data.page.allPageAmount) ? 'noMore' : 'loadMore';
						if (rid == "new") { // 判断当前读取是刷新读取还是加载读取
							that.list = JSON.parse(res.data.results);
						} else {
							that.list = that.list.concat(JSON.parse(res.data.results));
						}
						console.log(that.list)
						that.page = res.data.page;
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err, 'none', 5000);
				}).finally(() => {
					
				})
			},
		},
		onReady() {
			let that = this;
			uni.getLocation({	//获取附近站点列表
				type: 'wgs84',
				success: function (res) {
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
					that.getList(res.longitude, res.latitude, 1, "new");
				}
			});
			that.scrollHeight = that.$app.globalData.systemInfo.windowHeight + 8; // 从全局中获取屏幕高度
		}
	}
</script>

<style>
	.content {
		padding: 15px 10px;
	}
	.binList {
		
	}
	.binItem {
		background: #FFFFFF;
		padding: 10px;
		border-radius: 4px;
		margin-bottom: 15px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
	}
	.bottom {
		padding-bottom: 20px;
		width: 100%;
		text-align: center;
	}
	.bottom > view {
		height: 1px;
		border-top: 1px solid #ddd;
		margin: 0px 20px;
	}
	.bottom > text {
		padding: 0px 10px;
		background: #eee;
		position: relative;
		top: 10px;
	}
</style>
