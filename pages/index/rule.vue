<template>
	<view class="column bg-white p10" style="max-height: 300px; overflow-y: auto; border-radius: 0 0 8px 8px;">
		<text class="tit">一、零钱</text>
		<text class="con">
			1.用户通过投递可回收物获得的零钱可以按照规则申请提现到微信账户；按腾讯要求，首次申请提现需要绑定微信零钱，进行实名认证，未实名制用户不能申请提现；
		</text>
		<text class="con">
			2.申请提现的额度不低于20元，且须为10的整数倍；如需要提取额度小于10元的零钱，请到提现点注销账户后现场提取现金；海口提现点地址：海口市龙华区金盘路30号海南日报社综合大厦一楼；其它城市提现点正在设置中，请留意量心回收微信小程序公告；
		</text>
		<text class="con">
			3.单日提现次数不超过3 次，每次提现最高额度为300元，每个用户单日最高提现总额为900元；
		</text>
		<text class="con">
			4.提现钱款将在72小时之内到账，如在72小时内未到账，请及时致电客服人员。
		</text>
		<text class="tit">二、量心币</text>
		<text class="con">
			参与垃圾分类投放能按规则获得量心币，量心币能按规则兑换礼品，相应规则以线下推广提示或量心回收微信小程序提示为准。
		</text>
		<text class="tit">三、加价券</text>
		<text class="con">
			1.加价券由“量心回收”根据活动规则赠送给用户，由用户按照规则在量心回收微信小程序中领取；
		</text>
		<text class="con">
			2.不同加价券有不同的使用规则和使用期限，请在领取和使用时留意相应提示。
		</text>
		<text class="tit">四、其它</text>
		<text class="con">
			1.若您参与量心回收微信小程序中的各项业务和活动，视为同意量心回收公示的各种规则；
		</text>
		<text class="con">
			2.客服电话：4007705180；监督电话：66212580；短信投诉：15308933557；
		</text>
		<text class="con">
			3.本规则由量心回收解释，海南省量心环保科技有限公司拥有规则解释权。
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
