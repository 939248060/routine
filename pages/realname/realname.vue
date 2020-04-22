<template>
	<view>
		<form @submit="formBindsubmit">
			<view class="realname">
				<view class="viewRow pt10 pb10">
					<text class="pl15">真实姓名</text>
					<input type="text" name="name" placeholder="请输入真实姓名" />
				</view>
				<view class="viewRow pt10 pb10">
					<text class="pl15">身份证号</text>
					<input type="idcard" name="idCard" maxlength="18" placeholder="请输入本人身份证号" />
				</view>
			</view>
			<button class="btn mt10" :disabled="btndisabled" formType="submit">开始认证</button>
		</form>

		<!--过度遮罩-->
		<loading />
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			formBindsubmit: function(e) {
				let that = this;
				let temp = {};
				temp.name = e.detail.value.name;
				temp.idCard = e.detail.value.idCard;
				if (that.$stringUtil.isChinese(temp.name) == false || that.$stringUtil.isLong(temp.name, "2,8") == false) {
					that.$util.showToast("真实姓名必须由2到8个字的中文组成", 'none', 2000);
					return false;
				}
				if (that.$util.validIdCard(temp.idCard) == false) {
					that.$util.showToast("请输入正确身份证号", 'none', 2000);
					return false;
				}
				that.$showLoading();   //显示遮罩
				that.$request.postToken("/users/customer/realName.do", {
					data: JSON.stringify(temp)
				}).then((res) => {
					//console.log(res);
					if (res.data.status == 0) {
						that.$util.showToast(res.data.results, 'none', 2500);
						let pages = getCurrentPages(); // 获取当前页面的页帧
						if (pages.length > 1) {
							let prePage = pages[pages.length - 2];
							prePage.onShow();
							uni.navigateBack({
								delta: 1
							});
						}
					} else {
						that.$util.showToast(res.data.results, 'none', 3000);
					}
				}).catch((err) => {
					console.log(err);
					that.$util.showToast(err.errMsg, 'none', 4000);
				}).finally(() => {
					that.$hideLoading();
				});
			},
		}
	}
</script>

<style>
	page {
		position: fixed;	 /* 固定页面内容不移动 */
	}
	.realname {
		background: #fff;
	}

	.realname>view {
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #eee;
	}

	.realname>view>text {
		width: 25%;
		box-sizing: border-box;
	}

	.realname>view>input {
		min-width: 75%;
		max-width: 100%;
	}

	.btn {
		width: 80%;
		background: #00a2ed;
		color: #fff;
	}
</style>
