<template>
	<view>
		<view class="title">
			<image src="../../static/images/guide.png" mode="widthFix"></image>
		</view>
		<view class="order">
			<navigator url='../showhtml/showhtml?nav=gongzhonghao'>
				<view class="viewRow jcleft aicenter pt5 pb5 btmeee ml10 mr10">
					<view>
						<view class="rout icon-shijian bg-green white f18"/>
					</view>
					<view>
						<view class="black mt5">量心公众使用指南</view>
						<view class="f12 gary mt5 mb5">详细了解如何使用公众号</view>
					</view>
				</view>
			</navigator>
			<!--<navigator url='../../showhtml/showhtml?nav=gongzhonghao'> 
		    <view>  
		      <icon class="rout icon-shebei_zhinengfenxi"></icon>
		      <view class="a">
		        <view>智能回收使用指南</view>
		        <text>详细了解您身边的智能回收站使用方式</text>
		      </view>
		    </view>
		  </navigator>-->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
		position: fixed;	 /* 固定页面内容不移动 */
	}

	.title {
		width: 100%;
		font-size: 0px;
	}

	.title>image {
		width: 100%;
	}


	.order>navigator>view>view:nth-child(1) {
		width: 13%;
		margin-right: 10px;
		text-align: center;
	}

	.order>navigator>view>view:nth-child(2) {
		width: 80%;
	}

	.order>navigator>view>view:nth-child(1)>.rout {
		border-radius: 50%;
		padding: 4px 9px 9px 10px;
	}
</style>
