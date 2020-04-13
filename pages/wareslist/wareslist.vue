<template>
	<view>
		<view class="head"> 
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0" show-scrollbar="false">
				<view class="gray-3 bold lh28" :class="currtab == 0? 'click': ''" data-cateId = "0" @click="tabClick">推荐商品</view>
				<block v-for="(item,index) in categorys" :key="item.categoryId">
					<view class="gray-3 bold lh28 " :class="currtab == item.categoryId? 'click': ''" :data-cateId = "item.categoryId" @click="tabClick">{{item.categoryName}}</view>
				</block >
			</scroll-view>
		</view>
		<scroll-view scroll-view scroll-y="true" :scroll-top="topNum" :style="'height:'+scrollHeight+'px;'" data-state="0" @scrolltolower="loadMore"
		 upper-threshold="3" lower-threshold="5">
			<view class="list row wrap jcbetween mb15">
				<block :key="item.waresId" v-for=" (item,index) in list ">
					<view class="wares mb10 bg-white radius10" :data-waresid="item.waresId " @click="linkwares">
						<view><image :src=" host + item.photoPath " class="img" mode="heightFix" /></view>
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
			<view v-if="btmp=='noData'" class="noData column aicenter jccenter">
				<icon class="rout icon-kongshuju"></icon>
				<view>您还没有相关的商品</view>
			</view>
			<view class="bottom pb20 txtcenter" v-if="btmp=='noMore'"><text>已经到底啦</text>
				<view></view>
			</view>
			<view class="bottom pb20 txtcenter" v-else-if="btmp=='loadMore'">加载更多...</view>
		</scroll-view>
		<loading />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				host: '',			//主机
				currPage: 1,		//当前页码
				list: [],		    //商品列表
				page: [],
				scrollHeight: 0,    //滚动区高度
				btmp: 'loadMore',   //底部状态显示
				categorys: [], 		//全部商品分类数组
				currtab: 0,    		//分类选项唯一标识（categoryId)
				topNum: 0     		//设置竖向滚动条位置
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
				if(that.btmp == 'noData' || that.btmp == 'noMore')    //没有数据和没有更多数据不在请求接口
					return
				if (that.isLoading == true) { // 避免多次触发获取更多function
					that.$util.showToast("正在获取数据", 'none', 2000);
					return;
				}
				that.getList(that.currPage + 1, "loadMore",that.currtab);
			},
			//获取商品列表
			getList: function(curr, rid, categoryId) {
				let that = this;
				let data = {
					pageSize: 20,
					currPage: curr,
					categoryId : categoryId
				};
				that.$showLoading(); //显示遮罩
				that.$request.post("/wares/findPage.do", data).then((res) => {
					if (res.data.status === 0) {
						if (rid == "new") {
							that.list = JSON.parse(res.data.results);
						} else {
							that.list = that.list.concat(JSON.parse(res.data.results));
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
			},
			//获取全部的商品信息
			getCategory: function(){
				let that = this;
				that.$showLoading(); //显示遮罩
				that.$request.post("/category/findAll.do", null).then((res) => {
					if (res.data.status === 0) {
						that.categorys = JSON.parse(res.data.results);
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err.errMsg, 'none', 5000);
				}).finally(() => {
					that.$hideLoading();  //隐藏遮罩
				})
			},
			tabClick: function(e){
				let that = this;
				let categoryId = e.currentTarget.dataset.cateid;
				if(that.currtab == categoryId)      //重复点击，则不请求接口
					return;
				that.topNum --;  //返回顶部
				that.currtab = categoryId;
				that.getList(1, 'new', categoryId);
			}
		},
		onLoad() {
			let that = this;
			that.scrollHeight = that.$app.globalData.systemInfo.windowHeight - 60;
			that.host = that.$app.globalData.host1;
			that.getCategory();
			that.getList(1, 'new', 0);
		}
	}
</script>

<style>
	.head{
		width: 100%;
		background-color: #eee;
		z-index: 101;
	}
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		height: 40px;
	}
	.head view{
		display: inline-block;
		letter-spacing: 4px;    //字间距
		margin: 5px 10px;
	}
	.click{
		color: #00a2ed!important;
		font-weight: bold;
		font-size: 16px;
	}
	.list {
		padding: 0px 15px;
	}
	.wares {
		width: 48%;
		box-sizing: border-box;
	}

	.wares .img {
		width: 120px;
		height: 120px;
		margin: 10px 0px; 
	}
    
	.wares>view {
		padding: 0px 10px;
		vertical-align: middle;
	}
  .wares>view:nth-child(1){
		text-align: center;
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
