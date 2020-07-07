<template>
	<view class="column bg-white p10" style="max-height: 300px; overflow-y: auto; border-radius: 0 0 8px 8px;">
		<text class="tit">一、可回收物上门回收</text>
		<text class="con">
			1、定义：可回收物上门回收主要是针对已签约的政府机关单位、商户超市以及小区保洁人员开展的服务。
		</text>
		<text class="con">
			2、服务区域：“永万路以东，龙昆路以西，椰海大道以北至海边所围成的区域”和已签约的政府机关单位。
		</text>
		<text class="con">
			3、服务标准： 政府机关单位可回收物上门回收原则上48小时之内上门；商户和保洁人员可回收物预约上门回收量起步为100公斤。
		</text>
		<text class="tit">二、家电上门回收</text>
		<text class="con">
			1、定义：针对所有量心回收用户开展的大件家电回收。
		</text>
		<text class="con">
			2、服务区域：“永万路以东，龙昆路以西，椰海大道以北至海边所围成的区域”。
		</text>
		<text class="con">
			3、回收价格：用户按规则选择物品特征后量心回收小程序自动生成预估价，回收人员上门核实物品特征，如特征一致，则按预估价结算；如不一致，则按实际特征自动生成回收价格。回收款自动转入用户量心回收小程序零钱账户。
		</text>
		<text class="tit">三、家具清运上门回收</text>
		<text class="con">
			1、定义：针对所有量心回收用户开展的废旧家具回收。
		</text>
		<text class="con">
			2、服务区域：“永万路以东，龙昆路以西，椰海大道以北至海边所围成的区域”。
		</text>
		<text class="con">
			3、收费标准：用户按规则选择物品特征后量心回收小程序自动生成预估价，回收人员上门核实物品特征，如特征一致，则按预估价结算；如不一致，则按实际特征自动生成回收价格。用户通过扫描价格码支付服务费。
		</text>
	</view>
</template>

<script>
	export default {
		name: "index-rule",
		data() {
			return{
				
			}
		}
	}
</script>

<style>
	.tit { font-size: 16px; font-weight: bold; color: #000000; margin-top: 10px; }
	.con { text-indent: 1em; margin-bottom: 5px; }
</style>
