<template>
	<view>
		<!-- 顶部订单类型选择（智能回收、上门回收、干垃圾投放 -->
		<view class="tabTitle gray-3 f14 bold row jcaround aiend txtcenter">
			<view :class="[current==0?'tabActivit':'']" @click="current=0">智能回收<view v-show="current==0" class="borderblue" /></view>
			<view :class="[current==1?'tabActivit':'']" @click="current=1">上门回收<view v-show="current==1" class="borderblue" /></view>
			<view :class="[current==2?'tabActivit':'']" @click="current=2">干垃圾投放<view v-show="current==2" class="borderblue" /></view>
		</view>
		<view class="content">
			<!-- 智能回收订单 -->
			<view v-show="current === 0">
				<smartorderlist />
			</view>
			<!-- 上门回收订单 -->
			<view v-show="current === 1">
				<recyorderlist />
			</view>
			<!-- 干垃圾投放订单 -->
			<view v-show="current === 2">
				<dryorderlist />
			</view>
		</view>
	</view>
</template>

<script>
	import smartorderlist from "../../components/orderlist/smartorderlist.vue"	//智能回收
	import recyorderlist from "../../components/orderlist/recyorderlist.vue"	//上门回收
	import dryorderlist from "../../components/orderlist/dryorderlist.vue"	//干垃圾投放
	
	export default {
		components:{
			smartorderlist,
			recyorderlist,
			dryorderlist
		},
		data() {
			return {
				current: 0
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.tabTitle {
		position: fixed;
		top:0;
		width: 100%;
		line-height: 2em;
		height: 35px;
		background-color: #EEEEEE;
		z-index: 100;
	}
	.tabTitle > view {
		width: 33.33%;
		margin: 0 10px;
	}
	.tabActivit {
		color: #00a2ed;
		font-size: 16px;
	}
	.borderblue {
		margin: 0 auto;
		width: 30px;
		border-bottom: 3px solid #00a2ed;
	}
	.content {
		overflow: hidden;
	}
	
	.top-tab {
		position: fixed;
		width: 100%;
		top: 35px;
		left: 0;
		z-index: 100;
	}
	.top-tab > view {
		width: 33.33%;
		text-align: center;
		line-height: 2em;
		margin: 5px 0;
	}
	swiper {
		position: absolute;
		top: 80px;
		width: 100%;
	}
	.noData {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 100px;
	}
	.noData > text {
		color: #AAAAAA;
		font-size: 18px;
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
