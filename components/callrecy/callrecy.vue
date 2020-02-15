<template>
	<view>
		<view v-show="isShow">
			<view class='call-mask'></view>
			<view class='call-dialog'>
				<view class='call-dialog-title'><text>确认地址</text>
					<icon class="rout icon-close_icon f26 close" catchtap='_cancelEvent'></icon>
				</view>
				<view class='call-dialog-content' v-show="hidContent">
					<view>
						<icon class="rout icon-lianxiren f24 green" style=""></icon>
					</view>
					<view>{{ contact }} - {{ tel }}</view>
					<view>
						<icon class="rout icon-shouhuodizhi f24 green" style=""></icon>
					</view>
					<view>{{ address }}</view>
				</view>
				<view class="call-dialog-nothing" v-show="hidNothing">
					<view>
						<icon class="rout icon-shouhuodizhi f24" style=""></icon>
					</view>
					<text>点击添加地址</text>
				</view>
				<button class="btn" formType="submit" @click='_confirmEvent'>呼叫回收</button>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 弹窗显示控制
				isShow: false,
				hidContent: false,
				hidNothing: false
			};
		},
		props: {
			contact: { // 联系人
				type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
				value: ''
			},
			tel: { // 联系电话
				type: String,
				value: ''
			},
			address: { // 详细地址
				type: String,
				value: ''
			}
		},
		methods: {
			/*
			 * 公有方法
			 */
			//隐藏弹框
			hideDialog() {
				this.$data.isShow = false;
			},
			//展示弹框
			showDialog() {
				this.$data.isShow = true;
			},
			showContent() {
				this.$data.hidContent = true;
				this.$data.hidNothing = false;
			},
			hideContent() {
				this.$data.hidContent = false;
				this.$data.hidNothing = true;
			},
			/*
			 * 内部私有方法建议以下划线开头
			 * triggerEvent 用于触发事件
			 */
			_cancelEvent() {
				//触发取消回调
				this.$emit("cancelEvent");
			},
			_confirmEvent() {
				//触发成功回调
				this.$emit("confirmEvent");
			}
		}
	}
</script>

<style>
	.call-mask {
		position: fixed;
		z-index: 1000;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.7);
	}

	.call-dialog {
		position: fixed;
		z-index: 5000;
		width: 90%;
		max-width: 600rpx;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		background-color: #FFFFFF;
		text-align: center;
		border-radius: 20px;
		box-shadow: 0px 0px 10px #666;
	}

	.call-dialog-title {
		font-size: 18px;
		padding: 15px 15px 5px;
	}

	.call-dialog-content {
		padding: 15px;
		min-height: 40px;
		font-size: 16px;
		line-height: 1.8;
		word-wrap: break-word;
		word-break: break-all;
		color: #999999;
	}

	.call-dialog-nothing {
		padding: 15px;
		min-height: 30px;
		font-size: 16px;
		line-height: 1.4;
		color: #999999;
	}

	.call-dialog .btn {
		font-size: 20px;
		border-radius: 20px;
		margin-bottom: 10px;
		width: 68%;
		line-height: 40px;
		color: #fff;
		box-shadow: 0px 0px 10px #56ab2f;
		background: #56ab2f;
		background: -webkit-linear-gradient(to top, #56ab2f, #a8e063);
		background: linear-gradient(to top, #56ab2f, #a8e063);
	}

	.call-dialog .close {
		position: absolute;
		right: 0;
		margin-right: 20rpx;
	}
</style>
