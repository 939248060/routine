<template>
	<view>
		<form @submit="sendForm">
		  <view>
		    <view class="bg-blue1 white">
		      <view class="txtcenter pt20 pb20">
		        <view>零钱余额</view>
		        <view class="f40 pt10">{{customer.cash}}</view>
		      </view>
		      <view class="row jcbetween aicenter pl5 pr5">
		        <view class="row jcleft aicenter f24 pt5">
		          ￥<input type="number" name="cash" placeholder-class="white" style="width: 200px;"
		           :value="(cash>0)?cash:''" @input='cashInput' placeholder="请输入金额" />
		        </view>
		        <view class="f16"  @click='exchAll'>最大额度</view>
		      </view>      
		    </view>
		    <view class="bg-white pl10 pr10 f16 mt10">
		      <view class="red">{{showTxt}}</view>
		      <view class="mt10 mb10 f16 bold">请选择到账方式</view>
		      <radio-group name="type">
		        <view v-if="customer.routOpenId!=null&&customer.routOpenId!=''" class="row jcbetween aicenter pb10">
		          <view>
		            <view class="row jcleft aicenter mb5">
		              <icon class="rout icon-weixin mr10 green f26" />微信零钱
		            </view>
		            <view class="row jcleft aicenter">
		              <image class="photo mr10" :src="customer.avatarUrl" />{{customer.nickName}}
		            </view>
		          </view>
		          <view class="txtright"><radio color="#00a2ed" checked='true' value="wechat"></radio></view>
		        </view>
		        <view v-else class="row jcbetween aicenter pb10">
		          <view class="row jcleft aicenter"><view class="rout icon-weixin green f26 mr10" />微信零钱</view>
		          <navigator class="blue" url='../getuserinfo/getuserinfo'>绑定</navigator>
		        </view>
		        <!--
		        <view v-if="{{cust.CardNumber!=null&&cust.CardNumber!=''}}" class="row withdraw jcleft aicenter pt10 pb15">
		          <view><icon class="rout icon-yinhangka purple f26"></icon></view>
		          <view>储蓄卡 - {{cust.BankName}}{{cust.CardNumber}}</view>
		          <view class="txtright"><radio color="#00a2ed" value="bankcard"></radio></view>
		        </view>
		        <view v-else class="row withdraw jcleft aicenter pt10 pb15 bordbtmeee" style=''>
		          <view><icon class="rout icon-yinhangka purple f26"></icon></view>
		          <view>储蓄卡</view>
		          <navigator class="txtright blue" url='../bankCard/bankCard'>添加</navigator>
		        </view>
		        -->
		      </radio-group>
		    </view>
		    <view class="viewCol aicenter jccenter txtcenter pt15">
		      <button class="btn white bg-blue1 f18 mb10" v-show='!btnHid' :disabled="btnDisd" formType="submit">{{btnTxt}}</button>
		      <navigator class="btn blue1 bg-white f18 pt10 pb10" url='../cashlist/cashlist'>零钱明细</navigator>
		    </view>
		    <view>
		    </view>
		  </view>
		</form>
		
		<!--遮罩-->
		<loading/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				host: '',
				cash: 0,              // 提取金额
				btnHid: false,        // 提现按钮是否隐藏
				btnDisd: false,       // 提现按钮是否可点击
				showTxt: "",
				btnTxt: "确认提现",
				customer: {}
			}
		},
		methods: {
			// 最大额度
			exchAll: function(e) {
				let that = this;
				let cash1 = that.customer.cash * 100 / 1000;
				// 将余额转为整型
				that.cash = parseInt(parseInt(that.customer.cash) / 10) * 10;
				that.showTxt = "提现金额必须是10元的倍数";
			},
			// 兑换现金输入 
			cashInput: function(e) {
				let that = this;
				let cash1= e.detail.value;
				let maxCash = parseInt(parseInt(that.customer.cash) / 10) * 10
				let cash2 = 0;
				if (cash1 >= maxCash || cash1.indexOf(".") > 0) {
					cash2 = maxCash;
				} else if (cash1.indexOf("0") == 0) {
					cash2 = 0;
				} else {
					cash2 = cash1;
				}
				that.cash = cash2;
			},
			// 申请提现
			sendForm: function (e) {
				let that = this;
				let isCheck = that.customer.isCheck;
				if (that.$stringUtil.isEmpty(isCheck) || isCheck != "1") {  // 如果用户未实名制，则跳转至实名制界面
					uni.navigateTo({ url: '../realname/realname' });
					return;
				}
				let cash = e.detail.value.cash;       // 提现金额
				let payType = e.detail.value.type;    // 提现方式
				//let random = StringUtil.randomNum(6); // 生成6位随机数避免拦截
				if (payType == "wechat") {            // 微信,单次提现不能少于20元     
					if (Number(cash) < 20) {
						that.showTxt = "微信零钱单次提现金额不能少于20元";
						//that.$util.showToast("微信零钱单次提现金额不能少于20元", 'none', 3000);
						return;
					}
				} else if (payType == "bank") {// 银行卡
					if (Number(cash) < 100) {
						that.$util.showToast("储蓄卡单次提现金额不能少于100元", 'none', 3000);
						return;
					}
				} else {
					that.$util.showToast("请选择到账方式", 'none', 3000);
					return;
				}
				if (Number(cash) > 300) {      // 单次提现不能超过200元
					that.showTxt = "用户单次提现不能超过300元，每天可提现3次";
					return;
				}
				if (cash.substring(cash.length - 1) != 0) {
					that.showTxt = "提现金额必须是10元的倍数";
					return;
				}
				if (Number(cash) > Number(that.customer.cash)) {      // 提现金额不能超过账户余额
					that.showTxt = "提现金额不能超过账户余额，请重新输入";
					return;
				}
				that.$showLoading();  //显示遮罩
				that.$request.postToken("/users/customer/drawMoney.do", { cash, payType } ).then((res) => {
					if (res.data.status === 0) {
						that.$util.showToast(res.results, 'none', 3000);
						that.getDetailed();
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err, 'none', 5000);
				}).finally(() => {
					that.$hideLoading();
				});
			},
			// 获取用户相关信息
			getDetailed: function () {
				let that = this;
				that.$showLoading();  //显示遮罩
				that.$request.postToken("/users/customer/findInfo.do", null).then((res) => {
					if (res.data.status === 0) {
						that.customer = JSON.parse(res.data.results);
						if (that.$stringUtil.isNotEmpty(that.customer.isCheck) && that.customer.isCheck != "1") {
							that.btnTxt = "实名认证";
						}
					} else {
						that.$util.showToast(res.data.results, 'none', 5000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err, 'none', 5000);
				}).finally(() => {
					that.$hideLoading();
				});
			}
		},
		onLoad: function (options) {
			let that = this;
			that.host = that.$app.globalData.host; // 从全局中获取主机地址
		},
		onReady: function () {
			let that = this;
		},
		onShow: function () {
			let that = this;
			that.host = that.$app.globalData.host; // 从全局中获取主机地址
			that.getDetailed();
		},
	}
</script>

<style>
page { background: #fff; }
.btn { width: 75%;  border: 1px solid #00a2ed; border-radius: 50px; }
.photo { width: 26px; height: 26px; border-radius: 10px; }
</style>
